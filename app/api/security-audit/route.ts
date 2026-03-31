import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { files } = await req.json();

    if (!files || !Array.isArray(files)) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    // Build file content string (limit to avoid token overflow)
    let fileContent = "";
    let totalChars = 0;
    const MAX_CHARS = 40000;

    for (const f of files) {
      if (totalChars >= MAX_CHARS) break;
      const snippet = f.contentSnippet || "";
      const block = `\n--- ${f.path} ---\n${snippet}\n`;
      if (totalChars + block.length > MAX_CHARS) {
        fileContent += `\n--- ${f.path} ---\n${snippet.slice(0, MAX_CHARS - totalChars)}...\n`;
        break;
      }
      fileContent += block;
      totalChars += block.length;
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a cybersecurity expert specializing in web application security audits. Analyze the provided source files and return a security audit report as valid JSON only. Use these exact keys:
- score: number 0-100 (overall security score, higher is better)
- grade: string ("A", "B", "C", "D", or "F")
- summary: string (2-3 sentence executive summary)
- issues: array of objects with { severity: "critical"|"warning"|"info", file: string, title: string, description: string, fix: string }
- strengths: array of strings (what the project does well security-wise)
- total_issues: number
Focus on: hardcoded secrets, SQL injection, XSS, CSRF, insecure dependencies, missing auth, CORS misconfig, missing CSP, unvalidated inputs, exposed env vars.`,
        },
        {
          role: "user",
          content: `Audit these project files:\n${fileContent}\n\nReturn JSON only.`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
    });

    const content = response.choices[0].message.content;
    const result = JSON.parse(content || "{}");
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("[API Security Audit Error]:", error);
    return NextResponse.json(
      { error: error.message || "Failed to run security audit" },
      { status: 500 }
    );
  }
}
