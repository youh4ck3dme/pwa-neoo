import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type ContentType = "linkedin-post" | "email-pitch" | "case-study" | "tech-summary";

const contentInstructions: Record<ContentType, string> = {
  "linkedin-post": "Write an engaging LinkedIn post (150-250 words). Include a hook, value proposition, and call-to-action. End with 5-8 relevant hashtags. Professional but personable tone.",
  "email-pitch": "Write a concise cold email pitch (under 200 words). Subject line, opening hook, problem/solution, social proof, and clear CTA. Business professional tone.",
  "case-study": "Write a detailed case study (400-600 words) with sections: Challenge, Solution, Results, Technologies Used. Use specific metrics where possible.",
  "tech-summary": "Write a technical summary (200-300 words) suitable for a portfolio or proposal. Cover architecture, key technical decisions, performance metrics, and security considerations.",
};

export async function POST(req: Request) {
  try {
    const { contentType, projectTitle, projectDescription, targetAudience } = await req.json();

    if (!contentType || !projectTitle) {
      return NextResponse.json(
        { error: "Missing contentType or projectTitle" },
        { status: 400 }
      );
    }

    const instruction = contentInstructions[contentType as ContentType];
    if (!instruction) {
      return NextResponse.json({ error: "Invalid contentType" }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a marketing copywriter for MA.GI.CA s.r.o., a Slovak enterprise PWA and cybersecurity company. ${instruction} Return valid JSON only with keys: title (string), content (string), wordCount (number), hashtags (array of strings, for linkedin-post only, empty array otherwise).`,
        },
        {
          role: "user",
          content: `Generate ${contentType} for:
Project: ${projectTitle}
Description: ${projectDescription || ""}
Target audience: ${targetAudience || "enterprise clients, CTOs, security officers"}

Return JSON only.`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.6,
    });

    const content = response.choices[0].message.content;
    const result = JSON.parse(content || "{}");
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("[API Generate Content Error]:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate content" },
      { status: 500 }
    );
  }
}
