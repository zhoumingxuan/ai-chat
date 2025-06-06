import { qwen, createQwen } from "qwen-ai-provider"; // ⬅️ change 1
import { jsonSchema, streamText } from "ai";

export const runtime = "edge";
export const maxDuration = 30;

export async function POST(req: Request) {

  const qwenClient = createQwen({
    apiKey: "sk-995e23563bd84bbd8b6f8b953e856728",
    baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1"
  });

  try {
    const { messages, system, tools } = await req.json();

    // Choose custom or default provider
    const provider = qwenClient ?? qwen;

    // Prepare tool schemas (identical to your DeepSeek code)
    const toolSpecs = Object.fromEntries(
      Object.entries<{ parameters: unknown; description?: string }>(tools).map(
        ([name, tool]) => [
          name,
          {
            parameters: jsonSchema(tool.parameters!),
            ...(tool.description ? { description: tool.description } : {}),
          },
        ],
      ),
    );

    // ⬅️ change 3: model id
    const result = streamText({
      model: provider("qwen-plus-latest"), // or qwen3-32b, qwen3-30b-a3b, etc.
      messages,
      system,
      tools: toolSpecs,
      topP:0.8,
      providerOptions:{
        qwen: {
          enable_thinking: true,
          enable_search: true,
          search_options: { forced_search: true }
        }
      }
    });

    // SSE out
    return new Response(result.toDataStream(), {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        "Connection": "keep-alive",
      },
    });
  } catch (err) {
    console.error("Qwen-3 stream error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to stream from Qwen-3." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}