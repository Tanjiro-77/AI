import { google } from "@ai-sdk/google";
import { frontendTools } from "@assistant-ui/react-ai-sdk";
import { convertToModelMessages, streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, system, tools } = await req.json();

  const result = streamText({
    model: google("gemini-3-flash-preview"),
    system,
    messages: await convertToModelMessages(messages),
    tools: frontendTools(tools),

    // ⚡ ADD THESE OPTIONS FOR SMOOTHER TYPING

    // 1. Explicit streaming (already default, but good to be explicit)
    experimental_telemetry: {
      isEnabled: true,
      recordInputs: false,
      recordOutputs: false,
    },

    // 2. Control token generation (makes typing smoother)
    temperature: 0.7, // Lower = more predictable, smoother streaming
    maxTokens: 4096,

    // 3. Add callback to monitor streaming (optional — for debugging)
    onChunk({ chunk }) {
      // console.log("Chunk:", chunk);
    },

    // 4. Custom stream processing for typing delay (optional)
    experimental_streamParts: true, // Enable fine-grained control
  });

  return result.toUIMessageStreamResponse();
}