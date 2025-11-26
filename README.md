# Listicle Content Manager

A beautiful kanban board application for managing content creation workflows with integrated AI-powered research capabilities.

## Features

- ✨ **Beautiful Kanban Board** - Smooth drag-and-drop interface with Framer Motion animations
- 🤖 **AI-Powered Research** - Automatically research topics and generate content prompts
- 📝 **Markdown Support** - Rich text editing with live preview
- 💾 **Local Storage** - All data persists in your browser
- 🎨 **Modern Design** - Clean, professional UI with Tailwind CSS
- ⚡ **Fast & Responsive** - Built with Next.js 14 and optimized for performance

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone or download this repository

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
```bash
cp .env.local.example .env.local
```

4. Edit `.env.local` and add your API keys:
   - **Brave Search API** (Required for research feature):
     - Get your free API key at [https://brave.com/search/api/](https://brave.com/search/api/)
     - Free tier: 2,000 queries/month
   - **OpenAI API** (Optional, for enhanced AI insights):
     - Get your API key at [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
     - Note: This will incur costs for GPT-3.5-turbo usage
     - If not provided, the app will use a fallback research summary

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Managing Columns

- Click **"Add Column"** in the header to create a new column
- Click the three-dot menu on any column to edit or delete it
- Drag columns to reorder (coming soon)

### Managing Tasks

- Click **"Add task"** at the bottom of any column to create a new task
- Click on any task card to edit it
- Drag tasks between columns to change their status
- Delete tasks from the edit dialog

### AI Research

1. Create a task with a topic title (e.g., "debt relief offers")
2. Hover over the task card and click the lightning bolt icon
3. Wait for the AI to research the topic
4. View the generated prompt and backstory insights in the task edit dialog
5. Copy the final prompt to use in your content creation tool

### Markdown Support

- Use markdown syntax in task descriptions
- Toggle between edit and preview modes
- Supports headers, lists, links, bold, italic, and more

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS v3
- **Animations**: Framer Motion
- **Drag & Drop**: @dnd-kit
- **State Management**: Zustand with localStorage persistence
- **UI Components**: Radix UI primitives
- **Markdown**: react-markdown with remark-gfm
- **AI Research**: Brave Search API + OpenAI GPT-3.5-turbo

## Project Structure

```
src/
├── app/
│   ├── api/research/       # AI research API endpoint
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main page
├── components/
│   ├── kanban/             # Kanban board components
│   └── ui/                 # Reusable UI components
├── lib/
│   ├── types.ts            # TypeScript types
│   ├── utils.ts            # Utility functions
│   └── constants.ts        # Constants
└── store/
    └── kanban-store.ts     # Zustand state management
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel project settings
4. Deploy!

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
