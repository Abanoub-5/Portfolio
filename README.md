# AI Portfolio & Personal Agent

A modern personal portfolio website built to showcase my journey as a **Computer Engineering student, AI Engineer, and Software Engineer**.

The project combines a personal portfolio with a real AI-powered agent that can answer questions about my skills, projects, experience, and AI work.

## Features

- Responsive personal portfolio
- Personal introduction and about section
- Technical skills showcase
- Project portfolio
- AI and learning section
- Contact information
- Real AI-powered personal agent
- Portfolio-aware AI responses
- AI tool calling
- Structured and validated tool inputs
- Streaming AI responses
- Responsive mobile and desktop UI

## Personal AI Agent

The website includes a dedicated `/agent` page where visitors can interact with an AI assistant about my professional background.

The agent can answer questions such as:

- "What technologies does he know?"
- "What projects has he built?"
- "Tell me about his AI experience."

The agent uses portfolio data rather than relying on the model to guess personal information.

### Agent Tools

The agent includes four tools:

- **searchPortfolio** — Searches portfolio information for relevant content.
- **getProject** — Retrieves detailed information about a specific project.
- **getSkills** — Returns my technical skills grouped by category.
- **getExperience** — Returns relevant education, experience, and program information.

Tool inputs are validated using **Zod**.

## AI Architecture

```text
Visitor
   ↓
Agent UI
   ↓
Next.js API
   ↓
Google Gemini
   ↓
AI Agent + Tools
   ↓
Portfolio Data
   ↓
AI Response
   ↓
Visitor
```

The agent is designed to:

- Provide concise and professional answers
- Use portfolio data when answering questions about me
- Avoid inventing personal information
- Use tools when additional portfolio information is required
- Handle unavailable information gracefully
- Keep API credentials server-side

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- AI SDK
- Google Gemini
- Zod
- Node.js
- Git & GitHub
- Vercel

## Project Structure

```text
pb/
├── app/
├── components/
├── data/
├── lib/
├── public/
├── tests/
├── .env.example
├── .gitignore
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

## Getting Started

Clone the repository and install the dependencies:

```bash
npm install
```

Create an environment file:

```text
.env.local
```

Add your Google Gemini API key:

```env
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
```

Never commit the actual API key to GitHub.

Start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

## Environment Variables

The AI agent requires:

```env
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
```

The API key is used server-side and should never be exposed in client-side code.

Make sure `.env` and `.env.local` are ignored by Git.

## Testing

Run the test suite with:

```bash
npm test
```

The tests verify important application and AI functionality.

## Production Build

Create a production build with:

```bash
npm run build
```

The project should successfully build before deployment.

## Deployment

The application is designed to be deployed on **Vercel**.

When deploying, add the following environment variable to the Vercel project:

```text
GOOGLE_GENERATIVE_AI_API_KEY
```

Do not commit API keys to the repository.

## AI Engineering Concepts

This project demonstrates practical AI engineering concepts including:

- LLM API integration
- AI system prompts
- AI tool calling
- Zod schema validation
- Structured portfolio data
- Streaming responses
- Error handling
- Environment variable management
- API security
- Automated testing
- Production builds
- Cloud deployment

## Learning Goals

The project is also a learning platform for developing practical skills across the modern AI stack.

The main goals are to understand how to:

1. Integrate LLM APIs into real applications
2. Build AI-powered user interfaces
3. Create and use AI tools
4. Validate AI tool inputs
5. Connect agents to application data
6. Handle streaming AI responses
7. Secure API credentials
8. Test AI-related functionality
9. Deploy AI applications to production

## Future Improvements

Potential future improvements include:

- Advanced portfolio search and retrieval
- RAG implementation
- Conversation memory
- Agent evaluation
- AI observability and analytics
- Additional agent tools
- Improved personalization
- More advanced AI workflows

## About

This project represents my development as a **Computer Engineering student focused on AI Engineering and Software Engineering**.

It combines software development, modern web technologies, and practical AI engineering into one real-world portfolio project.

## License

This project is available under the license included in the repository.
