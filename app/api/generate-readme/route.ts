import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { title, shortDescription, technologies, specialFeatures } = await req.json();

    if (!title) {
      return NextResponse.json({ error: "Missing title" }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a technical writer. Generate a professional GitHub README.md in Markdown format. Return valid JSON only with keys: readme (string with full markdown content) and filename (string, always "README.md"). The README should include: project title, badges, description, features, tech stack, installation, usage, and license sections. Keep it professional and concise.`,
        },
        {
          role: "user",
          content: `Generate README for:
Title: ${title}
Description: ${shortDescription || ""}
Technologies: ${(technologies || []).join(", ")}
Special Features: ${(specialFeatures || []).join(", ")}

Return JSON only.`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.4,
    });

    const content = response.choices[0].message.content;
    const result = JSON.parse(content || "{}");
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("[API Generate README Error]:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate README" },
      { status: 500 }
    );
  }
}
