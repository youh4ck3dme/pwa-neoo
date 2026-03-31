import { NextResponse } from "next/server";
import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "No URL provided" }, { status: 400 });
    }

    // Fetch the URL content
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.statusText}`);
    }

    const html = await response.text();
    
    // Extract head and initial body content (max 50k chars for AI context)
    const headMatch = html.match(/<head[\s\S]*?<\/head>/i);
    const bodyMatch = html.match(/<body[\s\S]*?<\/body>/i);
    const pageContent = (headMatch?.[0] || "") + (bodyMatch?.[0] || "").slice(0, 45000);

    const systemPrompt = `You MUST return valid JSON only. You are a web metadata extraction assistant. Analyze the HTML content of the page and produce a detailed, structured JSON project report.

Required JSON keys:
- title: string, 3-6 words, project name (extract from <title> or <h1>).
- shortDescription: string, 1 sentence, max 140 characters.
- technologies: array of strings, main frameworks, languages, infra mentioned or inferred.
- imagePrompt: string, 20-30 words. MUST follow the Neon Bloom blueprint: "An abstract 3D [SYMBOL] floating in a dark void. Style: Cyberpunk neon, signature #00f2ff cyan and #ff00ae pink glow. Render: 8K Octane, raytraced glass, cinematic lighting, sharp details, centered composition. No text." Choose [SYMBOL] based on project purpose.

Instructions:
1. Extract metadata accurately from meta tags (og:title, og:description) and visible content.
2. If it's a GitHub repo, extract the repo name and description.
3. Return JSON only.`;

    let content = "";

    // 1. Try Anthropic
    if (process.env.ANTHROPIC_API_KEY) {
      try {
        const msg = await anthropic.messages.create({
          model: "claude-3-5-sonnet-latest",
          max_tokens: 2000,
          system: systemPrompt,
          messages: [{ role: "user", content: `HTML Content from ${url}:\n\n${pageContent}\n\nReturn JSON only.` }],
        });
        content = (msg.content[0] as any).text;
      } catch (err) {
        console.warn("[API Extract]: Anthropic failed, trying OpenAI...");
      }
    }

    // 2. Try OpenAI Fallback
    if (!content && process.env.OPENAI_API_KEY) {
      const gptResponse = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `HTML Content from ${url}:\n\n${pageContent}\n\nReturn JSON only.` },
        ],
        response_format: { type: "json_object" },
      });
      content = gptResponse.choices[0].message.content || "";
    }

    if (!content) throw new Error("AI providers failed to respond.");

    const jsonReport = JSON.parse(content);
    return NextResponse.json(jsonReport);

  } catch (error: any) {
    console.error("[API Extract Error]:", error);
    return NextResponse.json({ error: error.message || "Failed to extract metadata" }, { status: 500 });
  }
}
