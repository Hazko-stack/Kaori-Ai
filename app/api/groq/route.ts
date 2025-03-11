import { reqGroqAI } from "@/app/lib/utils/groq";

export async function POST(req: Request) {
  const data = await req.json();
  
  if (req.method !== "POST") {
    return Response.json({ message: "Only POST requests are allowed" }, { status: 405 });
  }
  
  try {
    const { content, model } = data;
    const chatCompletion = await reqGroqAI(content, model);
    return Response.json({
      content: chatCompletion.choices[0]?.message?.content || "No response",
    });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
