"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, isTextUIPart, isToolUIPart } from "ai";
import type { UIMessage } from "ai";

const suggestedQuestions = [
  "What projects has he built?",
  "What technologies does he know?",
  "Tell me about his AI experience.",
  "What is he currently learning?",
];

function messageText(message: UIMessage): string {
  return message.parts
    .filter(isTextUIPart)
    .map((part) => part.text)
    .join("");
}

export function AgentChat() {
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, error, stop } = useChat({
    transport: new DefaultChatTransport({ api: "/api/agent" }),
  });

  const isLoading = status === "submitted" || status === "streaming";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    setInput("");
    sendMessage({
      text: trimmed,
    });
  }

  function ask(question: string) {
    if (isLoading) return;
    setInput("");
    sendMessage({ text: question });
  }

  return (
    <div className="flex h-[70vh] min-h-[480px] flex-col overflow-hidden rounded-xl border border-zinc-200 bg-background dark:border-zinc-800">
      <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
            <p className="max-w-md text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Hi! I&apos;m Abanoub&apos;s AI agent. Ask me anything about his
              projects, skills, experience, or AI learning — I answer using his
              structured portfolio data.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-center">
              {suggestedQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => ask(question)}
                  className="rounded-lg border border-zinc-200 px-3 py-2 text-xs font-medium text-zinc-600 transition-colors hover:border-accent hover:text-accent-strong dark:border-zinc-700 dark:text-zinc-300 dark:hover:text-white"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => {
          const isUser = message.role === "user";
          return (
            <div
              key={message.id}
              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                  isUser
                    ? "bg-accent text-white"
                    : "bg-zinc-100 text-foreground dark:bg-zinc-800"
                }`}
              >
                {isUser
                  ? messageText(message)
                  : message.parts.map((part, i) => {
                      if (isTextUIPart(part)) {
                        return <span key={i}>{part.text}</span>;
                      }
                      if (isToolUIPart(part)) {
                        return (
                          <span key={i} className="text-zinc-400">
                            {" "}
                            (checking portfolio data…)
                          </span>
                        );
                      }
                      return null;
                    })}
              </div>
            </div>
          );
        })}

        {error && (
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-xl bg-red-50 px-4 py-2.5 text-sm leading-relaxed text-red-700 dark:bg-red-950/40 dark:text-red-300">
              {error.message}
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-zinc-200 p-3 dark:border-zinc-800"
      >
        <label htmlFor="agent-input" className="sr-only">
          Message the AI agent
        </label>
        <input
          id="agent-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about his projects, skills, or AI journey…"
          className="flex-1 rounded-lg border border-zinc-200 bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-accent dark:border-zinc-700 dark:bg-zinc-900"
          disabled={isLoading}
        />
        {isLoading ? (
          <button
            type="button"
            onClick={stop}
            className="rounded-lg bg-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-600"
          >
            Stop
          </button>
        ) : (
          <button
            type="submit"
            className="rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-strong"
          >
            Send
          </button>
        )}
      </form>
    </div>
  );
}