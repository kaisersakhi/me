import { row, topics, whoami } from "./content";
import { toggleTheme } from "./theme";

/** One entry of scrollback. `menu` items are clickable; the rest is output. */
export type Block =
  | { kind: "input"; text: string; at: string; ok: boolean }
  | { kind: "text"; lines: string[]; error?: boolean }
  | { kind: "menu"; items: string[] };

const text = (...lines: string[]): Block[] => [{ kind: "text", lines }];
const fail = (message: string): Block[] => [{ kind: "text", lines: [message], error: true }];
const menu = (items: string[]): Block[] => [{ kind: "menu", items }];

export const TOPICS = Object.keys(topics);

type Command = {
  /** Shown by `help`. Leave it out to keep the command unlisted. */
  summary?: string;
  run: (args: string[]) => Block[];
};

export const commands: Record<string, Command> = {
  help: {
    summary: "this",
    run: () =>
      text(
        ...Object.entries(commands)
          .filter(([, command]) => command.summary)
          .map(([name, command]) => row(name, command.summary!)),
        "",
        "a topic on its own works too — try 'ship'.",
        "tab completes, ↑ recalls, ctrl-l clears.",
      ),
  },

  ls: { summary: "what there is to read", run: () => menu(TOPICS) },

  cat: {
    summary: "read one of them",
    run: ([name]) => {
      if (!name) return [...fail("cat: read what?"), ...menu(TOPICS)];

      const topic = topics[name];
      return topic ? text(...topic) : fail(`cat: ${name}: no such topic`);
    },
  },

  whoami: { summary: "the one-line version", run: () => text(whoami) },

  theme: { summary: "flip the lights", run: () => text(`theme → ${toggleTheme()}`) },

  clear: { summary: "wipe the scrollback", run: () => [] },

  sudo: { run: () => fail("nice try. i don't have root here either.") },
};

/**
 * Resolves a line of input to output plus an exit status, which the prompt
 * reports the way a real shell does. A bare topic name reads that topic.
 */
export function execute(name: string, args: string[]) {
  const command = commands[name];
  const blocks = command
    ? command.run(args)
    : TOPICS.includes(name)
      ? commands.cat!.run([name])
      : fail(`${name}: command not found. try 'help'.`);

  return { blocks, ok: !blocks.some((block) => block.kind === "text" && block.error) };
}
