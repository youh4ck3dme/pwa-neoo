import OpenAI from 'openai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

async function testGateway() {
  console.log("--- Vercel AI Gateway Test ---");
  console.log("URL:", process.env.AI_GATEWAY_URL || "NOT SET (Using default OpenAI)");
  console.log("Key:", process.env.AI_GATEWAY_KEY ? "CONFIGURED (vck_...)" : "NOT SET");

  const openai = new OpenAI({
    apiKey: process.env.AI_GATEWAY_KEY || process.env.OPENAI_API_KEY,
    baseURL: process.env.AI_GATEWAY_URL || undefined,
  });

  try {
    console.log("\nSending test request (gpt-4o-mini)...");
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: "Say 'Gateway Connection Successful' if you can read this." }],
      max_tokens: 20
    });

    console.log("\n✅ Response Received:");
    console.log(response.choices[0].message.content);
    
    if (process.env.AI_GATEWAY_URL) {
      console.log("\n🚀 Caching & Analytics should now be visible in your Vercel Dashboard.");
    }
  } catch (error) {
    console.error("\n❌ Gateway Test Failed:");
    if (error.response) {
      console.error("Status:", error.status);
      console.error("Data:", error.message);
    } else {
      console.error(error.message);
    }
    process.exit(1);
  }
}

testGateway();
