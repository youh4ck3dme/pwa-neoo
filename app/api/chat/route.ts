import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages)) {
      return Response.json({ error: "Invalid messages" }, { status: 400 });
    }

    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Si MA.GI.CA AI asistent — expert na enterprise PWA vývoj a kybernetickú bezpečnosť. Odpovedaj stručne a profesionálne v slovenčine (alebo v jazyku otázky). Pomáhaš potenciálnym klientom MA.GI.CA s.r.o. pochopiť služby, ceny a technológie. MA.GI.CA sa špecializuje na: Next.js PWA, WAF, DNSSEC, biometrickú autentifikáciu, audit logy, enterprise-grade riešenia pre bankový a vládny sektor. Kontakt: magicasro@hotmail.com, +421 917 488 903.`,
        },
        ...messages,
      ],
      stream: true,
      temperature: 0.7,
      max_tokens: 800,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content || "";
            if (text) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text })}\n\n`)
              );
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error: any) {
    console.error("[API Chat Error]:", error);
    return Response.json(
      { error: error.message || "Chat failed" },
      { status: 500 }
    );
  }
}
