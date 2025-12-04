# Listicle Content Management

A comprehensive content management system combining AI-powered listicle generation with Claude Code resources.

## Projects in This Repository

### 1. Listicle Content Manager (Kanban Board Application)

A beautiful kanban board application for managing content creation workflows with integrated AI-powered research capabilities.

#### Features

- ✨ **Beautiful Kanban Board** - Smooth drag-and-drop interface with Framer Motion animations
- 🤖 **AI-Powered Research** - Automatically research topics and generate content prompts
- 📝 **Markdown Support** - Rich text editing with live preview
- 💾 **Local Storage** - All data persists in your browser
- 🎨 **Modern Design** - Clean, professional UI with Tailwind CSS
- ⚡ **Fast & Responsive** - Built with Next.js 14 and optimized for performance

#### Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS v3
- **Animations**: Framer Motion
- **Drag & Drop**: @dnd-kit
- **State Management**: Zustand with localStorage persistence
- **UI Components**: Radix UI primitives
- **Markdown**: react-markdown with remark-gfm
- **AI Research**: Brave Search API + OpenAI GPT-3.5-turbo

### 2. TÂCHES Claude Code Resources

A growing collection of custom Claude Code resources built for real workflows.

#### Philosophy

When you use a tool like Claude Code, it's your responsibility to assume everything is possible.

I built these tools using that mindset.

Dream big. Happy building.

— TÂCHES

#### What's Inside

**Commands** (27 total) - Slash commands that expand into structured workflows
- **Meta-Prompting**: Separate planning from execution with staged prompts
- **Todo Management**: Capture context mid-work, resume later with full state
- **Thinking Models**: Mental frameworks (first principles, inversion, 80/20, etc.)
- **Deep Analysis**: Systematic debugging methodology with evidence and hypothesis testing

**Skills** (7 total) - Autonomous workflows that research, generate, and self-heal
- **Create Plans**: Hierarchical project planning for solo developer + Claude workflows
- **Create Agent Skills**: Build new skills by describing what you want
- **Create Meta-Prompts**: Generate staged workflow prompts with dependency detection
- **Create Slash Commands**: Build custom commands with proper structure
- **Create Subagents**: Build specialized Claude instances for isolated contexts
- **Create Hooks**: Build event-driven automation
- **Debug Like Expert**: Systematic debugging with evidence gathering and hypothesis testing

**Agents** (3 total) - Specialized subagents for validation and quality
- **skill-auditor**: Reviews skills for best practices compliance
- **slash-command-auditor**: Reviews commands for proper structure
- **subagent-auditor**: Reviews agent configurations for effectiveness

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

## Claude Code Resources

For detailed documentation on the Claude Code commands, skills, and agents included in this repository, see the `taches/` folder:

- [Commands Documentation](./taches/commands/)
- [Skills Documentation](./taches/skills/)
- [Agents Documentation](./taches/agents/)
- [Skills Demo](./taches/skills-demo/)

## Project Structure

```
src/                             # Next.js application
├── app/
│   ├── api/
│   │   ├── brave-search/       # Brave Search API integration
│   │   ├── research/            # AI research API endpoint
│   │   ├── warp-skill/          # Warp skill integration
│   │   └── write-listicle-copy/ # Listicle copy generation
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Main page
├── components/
│   ├── kanban/                  # Kanban board components
│   └── ui/                      # Reusable UI components
├── lib/
│   ├── types.ts                 # TypeScript types
│   ├── utils.ts                 # Utility functions
│   └── constants.ts             # Constants
└── store/
    └── kanban-store.ts          # Zustand state management

taches/                          # TÂCHES Claude Code Resources
├── .claude-plugin/              # Plugin configuration
├── commands/                    # Claude Code slash commands
├── skills/                      # Claude Code skills
├── skills-demo/                 # Skill demonstrations
├── agents/                      # Claude Code subagents
└── docs/                        # Documentation
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

---

**Community Ports:** [OpenCode](https://github.com/stephenschoettler/taches-oc-prompts)

—TÂCHES
