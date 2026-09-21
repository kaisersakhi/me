import type { Block as BlockData } from "../commands";
import { Prompt } from "./Prompt";

/** Bare domains and emails, so terminal output can still be clicked. */
const LINK = /(\S+@\S+\.\S+|(?:[a-z0-9-]+\.)+(?:com|io|ai|dev|org|net)(?:\/\S*)?)/g;

const hrefFor = (token: string) =>
  token.includes("@") ? `mailto:${token}` : `https://${token}`;

function Linkify({ text }: { text: string }) {
  // String.split with a capturing group puts the matches at the odd indices.
  return text.split(LINK).map((part, index) =>
    index % 2 === 0 ? (
      part
    ) : (
      <a key={index} className="link" href={hrefFor(part)} target="_blank" rel="noreferrer">
        {part}
      </a>
    ),
  );
}

function Block({ block, onPick }: { block: BlockData; onPick: (item: string) => void }) {
  switch (block.kind) {
    case "input":
      return (
        <Prompt at={block.at} ok={block.ok}>
          <span>{block.text}</span>
        </Prompt>
      );

    case "text":
      return (
        <div className={`whitespace-pre-wrap ${block.error ? "text-fail" : "text-muted"}`}>
          <Linkify text={block.lines.join("\n")} />
        </div>
      );

    case "menu":
      return (
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {block.items.map((item) => (
            <button key={item} type="button" className="link" onClick={() => onPick(item)}>
              {item}
            </button>
          ))}
        </div>
      );
  }
}

export function Scrollback({
  blocks,
  onPick,
}: {
  blocks: BlockData[];
  onPick: (item: string) => void;
}) {
  return (
    <div className="space-y-4">
      {/* Blocks are only ever appended, so the index is a stable key. */}
      {blocks.map((block, index) => (
        <div key={index} className="arrive">
          <Block block={block} onPick={onPick} />
        </div>
      ))}
    </div>
  );
}
