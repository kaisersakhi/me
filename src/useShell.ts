import { useCallback, useState } from "react";
import { TOPICS, commands, execute, type Block } from "./commands";
import { kashmirTime } from "./time";

/** Everything tab completion can offer: commands first, then topics. */
const VOCABULARY = [...Object.keys(commands), ...TOPICS];

export function useShell() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [draft, setDraft] = useState("");
  const [past, setPast] = useState<string[]>([]);
  const [recalled, setRecalled] = useState(-1);
  const [lastOk, setLastOk] = useState(true);

  const run = useCallback((input: string) => {
    const line = input.trim();
    const [name = "", ...args] = line.split(/\s+/);

    setDraft("");
    setRecalled(-1);

    // A bare return just leaves the prompt where it is, as any shell would.
    if (!line) return;
    setPast((history) => [line, ...history]);

    // `clear` is the one command that edits the scrollback instead of growing it.
    if (name === "clear") {
      setBlocks([]);
      return setLastOk(true);
    }

    const { blocks: output, ok } = execute(name, args);
    const echo: Block = { kind: "input", text: line, at: kashmirTime(), ok };

    setLastOk(ok);
    setBlocks((current) => [...current, echo, ...output]);
  }, []);

  /** Walks back through past commands: +1 is older, -1 is newer. */
  const recall = (step: number) => {
    const index = Math.min(Math.max(recalled + step, -1), past.length - 1);
    setRecalled(index);
    setDraft(index < 0 ? "" : past[index]!);
  };

  /** Completes the word under the cursor — a command first, a topic after that. */
  const complete = () => {
    const head = draft.slice(0, draft.lastIndexOf(" ") + 1);
    const stub = draft.slice(head.length);
    const matches = (head ? TOPICS : VOCABULARY).filter(
      (word) => word.startsWith(stub) && word !== stub,
    );

    if (matches.length === 1) setDraft(`${head}${matches[0]} `);
    else if (matches.length > 1)
      setBlocks((current) => [...current, { kind: "text", lines: [matches.join("  ")] }]);
  };

  return { blocks, draft, setDraft, lastOk, run, recall, complete };
}
