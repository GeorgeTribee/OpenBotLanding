import { useState, useEffect, useMemo, useCallback, type ReactElement } from 'react'
import { ArrowUp, Folder } from 'lucide-react'
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
    <button
      type="button"
      onClick={() => onSubmit(editor)}
      className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:bg-zinc-200 transition-colors shadow-lg"
    >
      <ArrowUp size={20} className="text-black" />
    </button>
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
    <button
      type="button"
      onClick={handleClick}
      className="px-4 py-1.5 rounded-full border border-zinc-800/30 bg-zinc-900/10 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700/50 transition-all text-[13px]"
    >
      {item.label}
    </button>
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
        text: { base: 'text-white text-left' },
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
        <div className="relative bg-[#0d0d0d]/40 backdrop-blur-xl border border-white/5 rounded-[24px] p-1.5 shadow-2xl focus-within:border-white/10 transition-all">
          <div className="p-3 pb-1 min-h-[80px] relative text-left">
            <RichTextPlugin
              contentEditable={
                <ContentEditable className="composer-input outline-none text-left text-[16px] font-normal leading-relaxed text-white placeholder-zinc-500 min-h-[50px] [&_p]:text-left" />
              }
              placeholder={
                <div className="absolute top-3 left-3 text-left text-zinc-500 text-[16px] pointer-events-none">
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

          <div className="flex items-center justify-between p-2 pt-0">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-zinc-500 text-[13px]">
              <div className="w-4 h-4 rounded-md bg-zinc-800/50 border border-white/5 flex items-center justify-center">
                <Folder size={10} className="text-zinc-600" />
              </div>
              <span>{'new-project'}</span>
            </div>
            <SubmitButton onSubmit={handleSubmit} />
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex flex-wrap justify-center gap-2">
            {registry.channels.map((channel) => {
              const isSelected = channel.id === selectedChannelId
              const participantAgents = channel.participants
                .map((id) => registry.agents.find((a) => a.id === id))
                .filter((a): a is Agent => !!a)

              return (
                <button
                  key={channel.id}
                  type="button"
                  onClick={() => setSelectedChannelId(channel.id)}
                  className={`px-4 py-1.5 rounded-full border transition-all text-[13px] flex items-center gap-2 ${isSelected
                      ? 'border-zinc-500/60 bg-zinc-800/40 text-zinc-100'
                      : 'border-zinc-800/30 bg-zinc-900/10 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700/50'
                    }`}
                >
                  {channel.name}
                  {participantAgents.length > 0 && (
                    <div className="flex -space-x-2 ml-1">
                      {participantAgents.map((agent, i) => (
                        <img
                          key={agent.id}
                          src={agent.image}
                          alt={agent.name}
                          className="w-4 h-4 rounded-full border border-black object-cover bg-zinc-900"
                          style={{ zIndex: participantAgents.length - i }}
                        />
                      ))}
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          {selectedChannel && (
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
