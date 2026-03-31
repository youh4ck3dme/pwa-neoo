import { NextResponse } from "next/server";
import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

// For backward compatibility only, usually skipped if 403 occurs
const gatewayOpenai = new OpenAI({
  apiKey: process.env.AI_GATEWAY_KEY || process.env.OPENAI_API_KEY,
  baseURL: process.env.AI_GATEWAY_URL || undefined,
});

export async function POST(req: Request) {
  try {
    const { files } = await req.json();

    if (!files || !Array.isArray(files)) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    // Build the payload representation of the files
    let chunkedFiles = "";
    let totalChars = 0;
    const MAX_CHARS = 55000; // fit well within limits

    for (const f of files) {
      if (totalChars >= MAX_CHARS) break;
      const snippet = f.contentSnippet || "";
      const block = `\n--- FILE: ${f.path} ---\n${snippet}\n`;
      if (totalChars + block.length > MAX_CHARS) {
        chunkedFiles += `\n--- FILE: ${f.path} ---\n${snippet.slice(0, MAX_CHARS - totalChars)}...TRUNCATED...\n`;
        break;
      }
      chunkedFiles += block;
      totalChars += block.length;
    }

    const systemPrompt = `You MUST return valid JSON only. You are a code forensics assistant. Analyze the project files provided and produce a detailed, structured JSON report. Use only the keys specified below.

Required JSON keys and constraints:
- title: string, 3-6 words, project name.
- shortDescription: string, 1 sentence, max 140 characters.
- longDescription: string, 3-6 sentences, explain what the project does, target users, and main flows.
- technologies: array of strings, main frameworks, languages, infra.
- purpose: string, 1-2 sentences describing the primary goal.
- specialFeatures: array of strings, 3-8 concise feature bullets.
- findings: array of objects { file: string, note: string } listing important code findings.
- risks: array of strings, 3-6 security/maintenance/perf risks, concise.
- recommendations: array of strings, 4-8 actionable steps ordered by priority (Immediate, Short term, Long term).
- imagePrompt: string, 20-30 words. MUST follow the Neon Bloom blueprint: "An abstract 3D [SYMBOL] floating in a dark void. Style: Cyberpunk neon, signature #00f2ff cyan and #ff00ae pink glow. Render: 8K Octane, raytraced glass, cinematic lighting, sharp details, centered composition. No text." Choose [SYMBOL] based on project purpose (e.g. "holographic lock" for security, "network nodes" for API, "glass shards" for UI, "neural core" for AI).
- imageSize: string, exact pixel size to request from image API (use "640x360" for 16:9 banner).
- confidence: number between 0 and 1 indicating how confident the model is in the analysis.

Instructions for analysis:
1. Prioritize manifest files (package.json, pyproject.toml, Cargo.toml, go.mod), README, service-worker files, auth-related files, and top-level src files.
2. Detect project type (PWA, API, library, CLI) and offline capabilities.
3. Identify security issues, performance issues, and architecture concerns.
4. Recommendations must be actionable and prioritized.
5. Keep language concise and technical. Return JSON only.`;

    let content = "";

    // 1. Try Primary: Anthropic Claude 3.5 Sonnet
    if (process.env.ANTHROPIC_API_KEY) {
      try {
        console.log("[AI]: Using Anthropic Claude 3.5 Sonnet...");
        const msg = await anthropic.messages.create({
          model: "claude-3-5-sonnet-latest",
          max_tokens: 4000,
          system: systemPrompt,
          messages: [{ role: "user", content: `Project files:\n${chunkedFiles}\n\nReturn JSON only.` }],
        });
        content = (msg.content[0] as any).text;
      } catch (err: any) {
        console.warn("[AI Fallback]: Anthropic failed, trying OpenAI...", err.message);
      }
    }

    // 2. Fallback: Direct OpenAI (Bypass Gateway)
    if (!content && process.env.OPENAI_API_KEY) {
      console.log("[AI]: Using Direct OpenAI Fallback...");
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Project files:\n${chunkedFiles}\n\nReturn JSON only.` },
        ],
        response_format: { type: "json_object" },
        temperature: 0.2,
      });
      content = response.choices[0].message.content || "";
    }

    // 3. Last Resort: Gateway (likely to fail if 403 persists)
    if (!content && process.env.AI_GATEWAY_KEY) {
       console.log("[AI]: Using Vercel AI Gateway (Last Resort)...");
       const response = await gatewayOpenai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Project files:\n${chunkedFiles}\n\nReturn JSON only.` },
        ],
        response_format: { type: "json_object" },
        temperature: 0.2,
      });
      content = response.choices[0].message.content || "";
    }

    if (!content) throw new Error("No AI provider responded successfully. Please check your API keys.");

    const jsonReport = JSON.parse(content || "{}");
    return NextResponse.json(jsonReport);
  } catch (error: any) {
    console.error("[API Analyze Error]:", error);
    return NextResponse.json({ error: error.message || "Failed to analyze" }, { status: 500 });
  }
}
