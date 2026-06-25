import { useState, useEffect, useMemo, useCallback, useRef, useLayoutEffect, type ReactElement } from 'react'
import { ArrowUp, Check, ChevronDown, Folder, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import openbotLogo from '@/assets/openbotlogo.svg'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import {
  DecoratorNode,
  $applyNodeReplacement,
  $createTextNode,
  COMMAND_PRIORITY_EDITOR,
  COMMAND_PRIORITY_HIGH,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
  KEY_ENTER_COMMAND,
  $getRoot,
  $createParagraphNode,
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  $isTextNode,
} from 'lexical'
import type {
  NodeKey,
  LexicalNode,
  LexicalEditor,
  SerializedLexicalNode,
  Spread,
} from 'lexical'
import {
  LexicalTypeaheadMenuPlugin,
  MenuOption,
  useBasicTypeaheadTriggerMatch,
} from '@lexical/react/LexicalTypeaheadMenuPlugin'
import { createPortal } from 'react-dom'

export interface Agent {
  id: string
  name: string
  image: string
  description: string
  instructions: string
}

interface StarterPrompt {
  label: string
  prompt: string
}

interface Channel {
  id: string
  name: string
  description: string
  spec: string
  participants: string[]
  starterPrompts: StarterPrompt[]
}

export interface Registry {
  version: number
  agents: Agent[]
  channels: Channel[]
}

export const REGISTRY_URL = 'https://raw.githubusercontent.com/meetopenbot/openbot-registry/main/registry.json'

/** Matches openbot.one — coordinator is not listed as a specialist. */
const SYSTEM_AGENT_ID = 'system'

function sortSpecialistAgents(agents: Agent[]): Agent[] {
  return [...agents].sort((a, b) => {
    const byName = a.name.localeCompare(b.name)
    if (byName !== 0) return byName
    return a.id.localeCompare(b.id)
  })
}

function AgentChipBadge({ name, image }: { name: string; image: string }) {
  return (
    <span
      contentEditable={false}
      className="agent-chip"
      data-agent-chip
    >
      <img src={image} alt="" />
      <span>{name}</span>
    </span>
  )
}

type SerializedAgentChipNode = Spread<
  { agentId: string; agentName: string; agentImage: string; type: 'agent-chip'; version: 1 },
  SerializedLexicalNode
>

class AgentChipNode extends DecoratorNode<ReactElement> {
  __agentId: string
  __agentName: string
  __agentImage: string

  static getType(): string {
    return 'agent-chip'
  }

  static clone(node: AgentChipNode): AgentChipNode {
    return new AgentChipNode(node.__agentId, node.__agentName, node.__agentImage, node.__key)
  }

  constructor(agentId: string, agentName: string, agentImage: string, key?: NodeKey) {
    super(key)
    this.__agentId = agentId
    this.__agentName = agentName
    this.__agentImage = agentImage
  }

  createDOM(): HTMLElement {
    const span = document.createElement('span')
    span.className = 'agent-chip-host'
    return span
  }

  updateDOM(): false {
    return false
  }

  decorate(): ReactElement {
    return <AgentChipBadge name={this.__agentName} image={this.__agentImage} />
  }

  getTextContent(): string {
    return `@${this.__agentName}`
  }

  isInline(): true {
    return true
  }

  isKeyboardSelectable(): false {
    return false
  }

  isIsolated(): true {
    return true
  }

  static importJSON(serializedNode: SerializedAgentChipNode): AgentChipNode {
    return $createAgentChipNode(
      serializedNode.agentId,
      serializedNode.agentName,
      serializedNode.agentImage,
    )
  }

  exportJSON(): SerializedAgentChipNode {
    return {
      ...super.exportJSON(),
      agentId: this.__agentId,
      agentName: this.__agentName,
      agentImage: this.__agentImage,
      type: 'agent-chip',
      version: 1,
    }
  }
}

function $createAgentChipNode(agentId: string, agentName: string, agentImage: string): AgentChipNode {
  return $applyNodeReplacement(
    new AgentChipNode(agentId, agentName, agentImage),
  ) as AgentChipNode
}

function $isAgentChipNode(node: LexicalNode | null | undefined): node is AgentChipNode {
  return node instanceof AgentChipNode
}

function $getAgentChipBeforeSelection(): AgentChipNode | null {
  const selection = $getSelection()
  if (!$isRangeSelection(selection) || !selection.isCollapsed()) {
    return null
  }

  const anchorNode = selection.anchor.getNode()
  const anchorOffset = selection.anchor.offset

  if (anchorOffset === 0) {
    const previousSibling = anchorNode.getPreviousSibling()
    if ($isAgentChipNode(previousSibling)) {
      return previousSibling
    }
  }

  if ($isElementNode(anchorNode) && anchorOffset > 0) {
    const childBefore = anchorNode.getChildAtIndex(anchorOffset - 1)
    if ($isAgentChipNode(childBefore)) {
      return childBefore
    }
  }

  return null
}

function $getAgentChipAfterSelection(): AgentChipNode | null {
  const selection = $getSelection()
  if (!$isRangeSelection(selection) || !selection.isCollapsed()) {
    return null
  }

  const anchorNode = selection.anchor.getNode()
  const anchorOffset = selection.anchor.offset

  if ($isTextNode(anchorNode) && anchorOffset === anchorNode.getTextContentSize()) {
    const nextSibling = anchorNode.getNextSibling()
    if ($isAgentChipNode(nextSibling)) {
      return nextSibling
    }
  }

  if ($isElementNode(anchorNode)) {
    const childAfter = anchorNode.getChildAtIndex(anchorOffset)
    if ($isAgentChipNode(childAfter)) {
      return childAfter
    }
  }

  return null
}

function AgentChipDeletionPlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    const removeBackspace = editor.registerCommand(
      KEY_BACKSPACE_COMMAND,
      (event: KeyboardEvent) => {
        const chip = $getAgentChipBeforeSelection()
        if (!chip) return false
        event.preventDefault()
        chip.remove()
        return true
      },
      COMMAND_PRIORITY_HIGH,
    )

    const removeDelete = editor.registerCommand(
      KEY_DELETE_COMMAND,
      (event: KeyboardEvent) => {
        const chip = $getAgentChipAfterSelection()
        if (!chip) return false
        event.preventDefault()
        chip.remove()
        return true
      },
      COMMAND_PRIORITY_HIGH,
    )

    return () => {
      removeBackspace()
      removeDelete()
    }
  }, [editor])

  return null
}

function resolveAgent(mention: string, agents: Agent[]): Agent | undefined {
  const key = mention.toLowerCase()
  return agents.find(
    (a) =>
      a.id.toLowerCase() === key ||
      a.name.toLowerCase() === key ||
      a.name.toLowerCase().replace(/\s+/g, '-') === key,
  )
}

function buildMentionRegex(agents: Agent[]): RegExp {
  const tokens = new Set<string>()
  for (const agent of agents) {
    tokens.add(agent.id)
    tokens.add(agent.name)
  }
  const sorted = [...tokens].sort((a, b) => b.length - a.length)
  const pattern = sorted.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')
  return new RegExp(`@(${pattern})`, 'gi')
}

type TextSegment = { kind: 'text'; value: string } | { kind: 'agent'; agent: Agent }

function parsePromptSegments(text: string, agents: Agent[]): TextSegment[] {
  if (!agents.length) return [{ kind: 'text', value: text }]

  const regex = buildMentionRegex(agents)
  const segments: TextSegment[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ kind: 'text', value: text.slice(lastIndex, match.index) })
    }
    const agent = resolveAgent(match[1], agents)
    if (agent) {
      segments.push({ kind: 'agent', agent })
    } else {
      segments.push({ kind: 'text', value: match[0] })
    }
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    segments.push({ kind: 'text', value: text.slice(lastIndex) })
  }

  return segments.length ? segments : [{ kind: 'text', value: text }]
}

function appendSegmentsToParagraph(paragraph: ReturnType<typeof $createParagraphNode>, segments: TextSegment[]) {
  for (const segment of segments) {
    if (segment.kind === 'agent') {
      paragraph.append(
        $createAgentChipNode(segment.agent.id, segment.agent.name, segment.agent.image),
      )
    } else if (segment.value) {
      paragraph.append($createTextNode(segment.value))
    }
  }
}

class AgentOption extends MenuOption {
  id: string
  name: string
  image: string

  constructor(id: string, name: string, image: string) {
    super(name)
    this.id = id
    this.name = name
    this.image = image
  }
}

function AgentMentionMenu({
  options,
  selectedIndex,
  onSelect,
  onHighlight,
}: {
  options: AgentOption[]
  selectedIndex: number | null
  onSelect: (option: AgentOption) => void
  onHighlight: (index: number) => void
}) {
  if (!options.length) {
    return (
      <div className="agent-mention-menu">
        <div className="agent-mention-empty">No agents found</div>
      </div>
    )
  }

  return (
    <div className="agent-mention-menu" role="listbox">
      {options.map((option, i) => (
        <button
          key={option.id}
          type="button"
          role="option"
          aria-selected={selectedIndex === i}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onSelect(option)}
          onMouseEnter={() => onHighlight(i)}
          className={`agent-mention-item${selectedIndex === i ? ' is-selected' : ''}`}
        >
          <img src={option.image} alt="" />
          <span className="agent-mention-item-name">{option.name}</span>
        </button>
      ))}
    </div>
  )
}

function AgentMentionPlugin({ agents }: { agents: Agent[] }) {
  const [editor] = useLexicalComposerContext()
  const [query, setQuery] = useState<string | null>(null)

  const allOptions = useMemo(
    () => agents.map((a) => new AgentOption(a.id, a.name, a.image)),
    [agents],
  )

  const options = useMemo(() => {
    if (!query) return allOptions
    const q = query.toLowerCase()
    return allOptions.filter(
      (o) => o.name.toLowerCase().includes(q) || o.id.toLowerCase().includes(q),
    )
  }, [allOptions, query])

  const onSelectOption = useCallback(
    (selectedOption: AgentOption, nodeToReplace: LexicalNode | null, closeMenu: () => void) => {
      editor.update(() => {
        const chip = $createAgentChipNode(
          selectedOption.id,
          selectedOption.name,
          selectedOption.image,
        )
        if (nodeToReplace) {
          nodeToReplace.replace(chip)
        }
        const space = $createTextNode(' ')
        chip.insertAfter(space)
        space.select()
        closeMenu()
      })
    },
    [editor],
  )

  const checkForTriggerMatch = useBasicTypeaheadTriggerMatch('@', { minLength: 0 })

  return (
    <LexicalTypeaheadMenuPlugin<AgentOption>
      onQueryChange={setQuery}
      onSelectOption={onSelectOption}
      triggerFn={checkForTriggerMatch}
      options={options}
      menuRenderFn={(anchorElementRef, { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex }) => {
        if (!anchorElementRef.current) return null
        return createPortal(
          <AgentMentionMenu
            options={options}
            selectedIndex={selectedIndex}
            onSelect={selectOptionAndCleanUp}
            onHighlight={setHighlightedIndex}
          />,
          anchorElementRef.current,
        )
      }}
    />
  )
}

function isAgentMenuOpen(editor: LexicalEditor): boolean {
  return editor.getRootElement()?.getAttribute('aria-controls') === 'typeahead-menu'
}

function KeyboardShortcutPlugin({ onSubmit }: { onSubmit: (editor: LexicalEditor) => void }) {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return editor.registerCommand(
      KEY_ENTER_COMMAND,
      (event: KeyboardEvent) => {
        if (event.shiftKey) return false
        if (isAgentMenuOpen(editor)) return false
        event.preventDefault()
        onSubmit(editor)
        return true
      },
      COMMAND_PRIORITY_EDITOR,
    )
  }, [editor, onSubmit])

  return null
}

function SubmitButton({ onSubmit }: { onSubmit: (editor: LexicalEditor) => void }) {
  const [editor] = useLexicalComposerContext()
  return (
    <Button
      type="button"
      size="icon"
      className="size-8 shrink-0 p-0"
      onClick={() => onSubmit(editor)}
      aria-label="Submit"
    >
      <ArrowUp className="size-4" />
    </Button>
  )
}

type AgentMode = 'coordinator' | 'direct'

function AgentModePicker({ agents }: { agents: Agent[] }) {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<AgentMode>('coordinator')
  const [directAgentId, setDirectAgentId] = useState<string | null>(null)
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({})
  const containerRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const specialistAgents = useMemo(
    () => sortSpecialistAgents(agents.filter((agent) => agent.id !== SYSTEM_AGENT_ID)),
    [agents],
  )

  const selectedDirectAgent = useMemo(
    () => specialistAgents.find((agent) => agent.id === directAgentId),
    [specialistAgents, directAgentId],
  )

  useEffect(() => {
    if (mode !== 'direct') return
    if (directAgentId && specialistAgents.some((agent) => agent.id === directAgentId)) return
    const first = specialistAgents[0]
    if (first) setDirectAgentId(first.id)
  }, [mode, directAgentId, specialistAgents])

  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return

    const updatePosition = () => {
      const rect = triggerRef.current!.getBoundingClientRect()
      setMenuStyle({
        position: 'fixed',
        left: rect.left,
        bottom: window.innerHeight - rect.top + 8,
        width: '18rem',
      })
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)
    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node
      if (
        !containerRef.current?.contains(target) &&
        !menuRef.current?.contains(target)
      ) {
        setOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  const menu = open ? (
    <div
      ref={menuRef}
      role="menu"
      style={menuStyle}
      className="z-50 max-h-80 overflow-x-hidden overflow-y-auto rounded-xl border border-border bg-popover p-1 text-popover-foreground shadow-md"
    >
      <p className="px-2 py-1.5 text-[11px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
        Coordinator
      </p>
      <button
        type="button"
        role="menuitem"
        onClick={() => {
          setMode('coordinator')
          setOpen(false)
        }}
        className={cn(
          'flex w-full cursor-pointer items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
          mode === 'coordinator' && 'bg-accent text-accent-foreground',
        )}
      >
        <img src={openbotLogo} alt="" aria-hidden="true" className="size-5 shrink-0" />
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="text-sm font-medium">OpenBot</span>
          <span className="truncate text-[11px] text-muted-foreground">
            Coordinates multiple specialist agents
          </span>
        </div>
        {mode === 'coordinator' ? <Check className="size-4 shrink-0 text-primary" /> : null}
      </button>

      {specialistAgents.length > 0 ? (
        <>
          <div className="my-1 h-px bg-border" />
          <p className="px-2 py-1.5 text-[11px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
            Specialist Agents
          </p>
          {specialistAgents.map((agent) => {
            const isSelected = mode === 'direct' && agent.id === directAgentId
            return (
              <button
                key={agent.id}
                type="button"
                role="menuitem"
                onClick={() => {
                  setMode('direct')
                  setDirectAgentId(agent.id)
                  setOpen(false)
                }}
                className={cn(
                  'flex w-full cursor-pointer items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
                  isSelected && 'bg-accent text-accent-foreground',
                )}
              >
                <img
                  src={agent.image}
                  alt=""
                  aria-hidden="true"
                  className="size-5 shrink-0 rounded-full object-cover"
                />
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="text-sm font-medium">{agent.name}</span>
                  {agent.description ? (
                    <span className="truncate text-[11px] text-muted-foreground">
                      {agent.description}
                    </span>
                  ) : null}
                </div>
                {isSelected ? <Check className="size-4 shrink-0 text-primary" /> : null}
              </button>
            )
          })}
        </>
      ) : null}
    </div>
  ) : null

  return (
    <div ref={containerRef} className="relative flex min-w-0 items-center">
      <Button
        ref={triggerRef}
        type="button"
        variant="outline"
        size="sm"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((current) => !current)}
      >
        {mode === 'coordinator' ? (
          <>
            <img src={openbotLogo} alt="" aria-hidden="true" className="size-3.5 shrink-0" />
            <span className="truncate">OpenBot</span>
          </>
        ) : selectedDirectAgent ? (
          <>
            <img
              src={selectedDirectAgent.image}
              alt=""
              aria-hidden="true"
              className="size-4 shrink-0 rounded-full object-cover"
            />
            <span className="truncate">{selectedDirectAgent.name}</span>
          </>
        ) : (
          <span className="truncate text-muted-foreground">Select Agent</span>
        )}
        <ChevronDown className="size-3 shrink-0 opacity-60" />
      </Button>

      {menu ? createPortal(menu, document.body) : null}
    </div>
  )
}

function StarterPromptButton({
  item,
  agents,
}: {
  item: StarterPrompt
  agents: Agent[]
}) {
  const [editor] = useLexicalComposerContext()

  const handleClick = () => {
    const segments = parsePromptSegments(item.prompt, agents)
    editor.update(() => {
      const root = $getRoot()
      root.clear()
      const paragraph = $createParagraphNode()
      appendSegmentsToParagraph(paragraph, segments)
      root.append(paragraph)
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        paragraph.selectEnd()
      }
    })
    editor.focus()
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={handleClick}
      className="h-8 border border-dashed border-border px-4 text-muted-foreground hover:border-border hover:text-foreground"
    >
      <span className="font-medium text-foreground/70">{item.label}</span>
    </Button>
  )
}

export function AgentComposer({ registry }: { registry: Registry | null }) {
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(registry?.channels[0]?.id || null)

  const initialConfig = useMemo(
    () => ({
      namespace: 'Composer',
      nodes: [AgentChipNode],
      onError: (error: Error) => console.error(error),
      theme: {
        text: { base: 'text-foreground text-left' },
        paragraph: 'text-left',
      },
    }),
    [],
  )

  const handleSubmit = useCallback((editorInstance: LexicalEditor) => {
    editorInstance.read(() => {
      const text = $getRoot().getTextContent()
      if (!text.trim()) return
      window.open(`https://openbot.one?prompt=${encodeURIComponent(text)}`, '_blank')
    })
  }, [])

  if (!registry) return null

  const selectedChannel = registry.channels.find((c) => c.id === selectedChannelId)

  return (
    <div className="w-full max-w-3xl mx-auto text-left">
      <LexicalComposer initialConfig={initialConfig}>
        <div className="group/input-group relative flex w-full min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-background outline-none transition-[color,box-shadow] has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-[3px] has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50">
          <div className="relative w-full flex-1">
            <RichTextPlugin
              contentEditable={
                <ContentEditable
                  data-slot="input-group-control"
                  className="composer-input block w-full max-h-[220px] min-h-[4.25rem] resize-none overflow-y-auto whitespace-pre-wrap px-3 py-2.5 text-base leading-6 outline-none focus-visible:ring-0 md:text-[0.9375rem] [&_p]:text-left"
                />
              }
              placeholder={
                <div className="pointer-events-none absolute top-0 left-0 select-none px-3 py-2.5 text-base leading-6 text-muted-foreground/60 md:text-[0.9375rem]">
                  {selectedChannel
                    ? `Create a ${selectedChannel.name}...`
                    : 'Ask OpenBot a task... use @ to tag agents you\'d like to involve'}
                </div>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <AgentMentionPlugin agents={registry.agents} />
            <AgentChipDeletionPlugin />
            <KeyboardShortcutPlugin onSubmit={handleSubmit} />
          </div>

          <div className="flex flex-row items-center gap-2 bg-background px-2.5 pb-2 pt-1">
            <AgentModePicker agents={registry.agents} />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8 shrink-0 text-muted-foreground hover:bg-accent hover:text-foreground"
              aria-label="Add attachment"
            >
              <Plus className="size-4" />
            </Button>
            <div className="min-w-0 flex-1" />
            <Button variant="ghost" size="sm" type="button" tabIndex={-1}>
              <Folder className="size-3.5 shrink-0 text-muted-foreground" />
              <span className="truncate font-medium">new-project</span>
            </Button>
            <SubmitButton onSubmit={handleSubmit} />
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <div className="flex flex-wrap justify-center gap-2">
            {registry.channels.map((channel) => {
              const isSelected = channel.id === selectedChannelId

              return (
                <Button
                  key={channel.id}
                  type="button"
                  variant={isSelected ? 'secondary' : 'outline'}
                  size="sm"
                  className="h-8 px-4"
                  onClick={() => setSelectedChannelId(channel.id)}
                >
                  {channel.name}
                </Button>
              )
            })}
          </div>

          {selectedChannel && selectedChannel.starterPrompts.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              {selectedChannel.starterPrompts.map((item, i) => (
                <StarterPromptButton key={i} item={item} agents={registry.agents} />
              ))}
            </div>
          )}
        </div>
      </LexicalComposer>
    </div>
  )
}
