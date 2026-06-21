import { type Agent } from './AgentComposer'

export function AgentCard({ agent }: { agent: Agent }) {
  return (
    <div className="flex w-[180px] shrink-0 items-center gap-3 rounded-full bg-secondary/60 p-3 transition-colors hover:bg-accent">
      <img
        src={agent.image}
        alt=""
        className="h-8 w-8 rounded-full bg-muted object-contain"
      />
      <div className="min-w-0">
        <div className="truncate text-sm font-semibold text-foreground">{agent.name}</div>
      </div>
    </div>
  )
}

export function AgentCarousel({ agents }: { agents: Agent[] }) {
  if (!agents.length) return null

  // Duplicate agents to ensure smooth infinite scroll
  const displayAgents = [...agents, ...agents, ...agents]

  return (
    <section className="relative w-full overflow-hidden py-20">
      <div className="relative z-10 container mx-auto px-6 mb-12 text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-subtle-foreground">Registry</p>
        <h2 className="text-3xl md:text-4xl text-foreground">Available Official Agents</h2>
      </div>

      <div className="relative z-10 flex overflow-hidden">
        <div className="flex animate-[marqueeLeft_120s_linear_infinite] gap-4 px-4 hover:[animation-play-state:paused]">
          {displayAgents.map((agent, i) => (
            <AgentCard key={`${agent.id}-${i}`} agent={agent} />
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 mt-16">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-3xl mx-auto py-6 border-t border-border gap-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Build your own agents</h3>
            <p className="text-xs text-muted-foreground">Publish custom agents to the registry, or run them privately.</p>
          </div>
          <a
            href="https://docs.getopenbot.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            Read the documentation <span className="text-lg" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
