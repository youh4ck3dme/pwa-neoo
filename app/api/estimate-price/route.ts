import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { projectType, features, complexity, timeline } = await req.json();

    if (!projectType) {
      return NextResponse.json({ error: "Missing projectType" }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a senior web development pricing consultant for MA.GI.CA s.r.o., a Slovak enterprise PWA and cybersecurity company. Provide realistic price estimates in EUR for projects in the Slovak/Central European market. Return valid JSON only with these exact keys:
- min: number (minimum price in EUR)
- expected: number (most likely price in EUR)
- max: number (maximum price in EUR)
- breakdown: object with keys matching the features, each having a { hours: number, rate: number, cost: number } object
- timeline_weeks: number (estimated weeks to complete)
- notes: array of strings (3-5 important considerations)
- hourly_rate: number (base hourly rate used)
Rates: Junior 25-35€/h, Mid 45-65€/h, Senior 75-120€/h. MA.GI.CA uses senior rates.`,
        },
        {
          role: "user",
          content: `Estimate price for:
Project type: ${projectType}
Features: ${(features || []).join(", ")}
Complexity (1-5): ${complexity || 3}
Timeline preference: ${timeline || "standard"}

Return JSON only.`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    const content = response.choices[0].message.content;
    const result = JSON.parse(content || "{}");
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("[API Estimate Price Error]:", error);
    return NextResponse.json(
      { error: error.message || "Failed to estimate price" },
      { status: 500 }
    );
  }
}
