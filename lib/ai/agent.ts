import {
  streamText,
  convertToModelMessages,
  toUIMessageStream,
  createUIMessageStreamResponse,
  safeValidateUIMessages,
  isStepCount,
} from "ai";
import type { UIMessage } from "ai";
import { getModel } from "@/lib/ai/provider";
import { systemPrompt } from "@/lib/ai/system-prompt";
import { portfolioTools } from "@/lib/ai/tools";

export const maxAgentSteps = 5;

export interface AgentOptions {
  messages: Array<Omit<UIMessage, "id">>;
  model?: ReturnType<typeof getModel>;
  onError?: (error: unknown) => string;
}

export async function buildAgentResponse(options: AgentOptions) {
  const { messages, onError } = options;

  const validated = await safeValidateUIMessages({ messages });
  if (!validated.success) {
    throw new Error("Invalid chat message format.");
  }

  const modelMessages = await convertToModelMessages(validated.data, {
    tools: portfolioTools,
  });

  const model = options.model ?? getModel();

  const result = streamText({
    model,
    instructions: systemPrompt,
    messages: modelMessages,
    tools: portfolioTools,
    stopWhen: isStepCount(maxAgentSteps),
  });

  const stream = toUIMessageStream({
    stream: result.stream,
    tools: portfolioTools,
    onError,
  });

  return createUIMessageStreamResponse({ stream });
}