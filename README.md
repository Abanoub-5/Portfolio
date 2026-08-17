# Abanoub Malak — Personal AI Portfolio

A production-quality personal website that showcases my projects, skills, and AI learning journey — and ships a **real AI agent** that answers visitor questions about me using structured portfolio data and validated tools.

**Positioning:** Computer Engineering student → AI Engineer / Software Engineer

---

## Features

- **Home** — hero, positioning statement, featured projects, skills overview
- **About** — education, experience, interests, full skills breakdown
- **Projects** — detailed project pages (problem, solution, technologies, key decisions)
- **AI / Learning** — AI concepts, AI stack, courses, write-ups
- **Contact** — GitHub, LinkedIn, email
- **AI Agent** (`/agent`) — a real, tool-using LLM agent that:
  - Searches portfolio data (`searchPortfolio`)
  - Returns project details (`getProject`)
  - Returns skills grouped by category (`getSkills`)
  - Returns education/experience (`getExperience`)
  - Never invents information — it answers only from structured tool results
- **Streaming** responses, **dark/light** themes, fully responsive (mobile / tablet / desktop)

---

## Tech stack

| Layer      | Technology                                              |
| ---------- | ------------------------------------------------------- |
| Framework  | Next.js 16 (App Router) + TypeScript                    |
| UI         | React, Tailwind CSS v4                                  |
| AI         | Vercel AI SDK v7 (`ai`, `@ai-sdk/openai`, `@ai-sdk/google`) |
| Validation | Zod v4 (tool input schemas)                             |
| Testing    | Vitest, React Testing Library, jsdom                    |
| Deploy     | Vercel                                                  |

---

## Architecture

```
app/
  page.tsx               Home
  about/                 About
  projects/              Projects list
  projects/[id]/         Project detail (SSG)
  learning/              AI / Learning
  contact/               Contact
  agent/                 AI agent chat page
  api/agent/route.ts     Server-side agent API route (streams)
components/              Reusable UI (Navbar, Footer, cards, AgentChat)
lib/
  ai/
    agent.ts             Agent runner: streamText + tools + loop
    tools.ts             Tool definitions (searchPortfolio, getProject, ...)
    schemas.ts           Zod schemas for tool inputs
    provider.ts          Model selection (OpenAI / Gemini via env)
    system-prompt.ts     Agent behavior rules
  portfolio/
    search.ts            Pure search over structured portfolio data
data/                    Single source of truth (projects, skills, ...)
tests/                   Unit + integration tests
```

**Key idea:** The agent is *grounded* — it only speaks from tool results. The tools read typed data files under `data/`, so updating your portfolio (adding a project, a skill) automatically keeps the agent accurate.

---

## The AI agent

The agent runs entirely server-side in `app/api/agent/route.ts`:

1. The visitor types a message in the chat UI.
2. The client sends the message history to `/api/agent`.
3. `streamText` (AI SDK) runs the LLM with a strong **system prompt** and a set of **tools**.
4. The model *decides* when to call a tool. Tool inputs are validated with **Zod** before execution.
5. Results are streamed back token-by-token (`toUIMessageStream` + SSE).

### Tools

| Tool             | What it does                              | Input schema (Zod)                        |
| ---------------- | ----------------------------------------- | ----------------------------------------- |
| `searchPortfolio`| Searches all portfolio content            | `{ query, limit? }`                       |
| `getProject`     | Full detail for one project by id         | `{ id }`                                  |
| `getSkills`      | Skills grouped by category                | `{ category? }`                           |
| `getExperience`  | Education / internship / program info     | `{ type? }`                               |
| `getProfile`     | Basic profile info                        | `{}`                                      |

Every tool's `inputSchema` is a Zod schema, so malformed tool calls are rejected before they reach your data.

### Agent rules (system prompt)

- Be concise and professional
- **Never invent information** — only facts from tool results
- Use tools first, then answer from their structured output
- Say clearly when information is unavailable
- Handle unknown questions gracefully
- Never reveal API keys or implementation details

---

## Local setup

Prerequisites: **Node.js 18.18+** and npm.

```bash
# 1. Install dependencies
npm install

# 2. Configure the AI provider
cp .env.example .env
#    then add your OPENAI_API_KEY (or GOOGLE_GENERATIVE_AI_API_KEY)

# 3. Run the dev server
npm run dev
```

Open http://localhost:3000 — the site works fully without an API key; only the `/agent` chat needs the key to answer.

---

## Environment variables

See `.env.example`. Required:

| Variable          | Description                        |
| ----------------- | ---------------------------------- |
| `AI_PROVIDER`     | `openai` (default) or `google`     |
| `OPENAI_API_KEY`  | OpenAI key (if provider is openai) |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Google key (if provider is google) |

Optional:

| Variable         | Description                                |
| ---------------- | ------------------------------------------ |
| `OPENAI_MODEL`   | Default `gpt-4o-mini`                      |
| `GEMINI_MODEL`   | Default `gemini-3.6-flash`             |
| `SITE_URL`       | Deployed URL for metadata/OG tags          |

> Secrets are never hardcoded. `.env*` is git-ignored; only `.env.example` is committed.

---

## Testing

```bash
npm test            # run all tests once
npm run test:watch  # watch mode
```

Covered:

- **Portfolio search** — relevance, limits, empty queries, ordering
- **Project lookup** — by id, unknown id, data integrity
- **Skills / experience** — data validity
- **Tool input validation** — Zod accepts/rejects correct/invalid inputs
- **Tool execution** — structured results, not-found handling
- **Agent API error handling** — bad requests (400), config-missing (500), never leaks raw errors
- **UI** — project card rendering + links

---

## Deployment (Vercel)

1. Push this repo to GitHub.
2. Import it at https://vercel.com/new.
3. In project settings → Environment Variables, add `AI_PROVIDER` + your key (see above).
4. Deploy. Vercel auto-detects Next.js; no config files needed.

The API route is server-side, so your API key stays private on Vercel. Set `SITE_URL` to your deployed domain for correct metadata.

---

## Project structure

```
app/            Routes and pages (App Router)
components/     UI components
data/           Portfolio content — edit this to update the site AND the agent
lib/ai/         Agent, tools, schemas, provider, system prompt
lib/portfolio/  Pure search + data access used by tools and pages
public/         Static assets (favicon, avatar)
tests/          Vitest tests
.env.example    Documented environment variables
```

---

## What I learned

Building this project covered the full AI stack hands-on:

1. LLM API calls (OpenAI + Gemini via AI SDK)
2. Prompt engineering (system prompt that grounds the agent)
3. Structured outputs
4. Zod schemas for tool inputs
5. Tool calling
6. Agent loops (`stopWhen` multi-step runs)
7. Retrieval/search over structured data
8. Streaming responses (SSE via `toUIMessageStream`)
9. Error handling
10. Environment variables
11. API security (server-side keys, no leaking raw errors)
12. Observability/logging hooks
13. Deployment (Vercel, `next build`)
14. Evaluation/testing (Vitest, mocked provider)

---

## Future improvements

- Add a database (Postgres via Vercel Postgres) for dynamic content
- Persistent chat history per visitor
- RAG over long-form write-ups (embeddings)
- More tools (e.g., `getCertifications`, `getWriteups`)
- E2E tests with Playwright
- Accessibility audit pass at 375px / 768px / 1280px

---

## License

Personal project. Contact me for questions or collaboration.
#   P o r t f o l i o  
 