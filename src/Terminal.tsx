import { useEffect, useRef, type KeyboardEvent } from "react";
import { Prompt } from "./components/Prompt";
import { Scrollback } from "./components/Scrollback";
import { useShell } from "./useShell";
import { useDemo } from "./useDemo";
import { useKashmirTime } from "./time";

export function Terminal() {
  const { blocks, draft, setDraft, lastOk, run, recall, complete } = useShell();
  const now = useKashmirTime();
  const input = useRef<HTMLInputElement>(null);
  const bottom = useRef<HTMLDivElement>(null);

  useDemo("ls", setDraft, run);

  // Keep the live prompt in view as output accumulates.
  useEffect(() => {
    bottom.current?.scrollIntoView({ block: "end" });
  }, [blocks]);

  const onKeyDown = (event: KeyboardEvent) => {
    const keys: Record<string, () => void> = {
      Enter: () => run(draft),
      Tab: complete,
      ArrowUp: () => recall(1),
      ArrowDown: () => recall(-1),
    };

    if (event.ctrlKey && event.key === "l") return run("clear");
    if (event.ctrlKey && event.key === "c") return setDraft("");

    const handler = keys[event.key];
    if (!handler) return;

    event.preventDefault();
    handler();
  };

  return (
    <main className="flex min-h-dvh items-center justify-center p-3 sm:p-8">
      <section
        className="flex max-h-[min(88dvh,46rem)] w-full min-w-0 max-w-3xl flex-col overflow-hidden rounded-xl border border-rule bg-surface shadow-2xl"
        onPointerUp={() => input.current?.focus()}
      >
        <header className="flex items-center gap-4 border-b border-rule bg-elevated px-4 py-2.5 text-xs">
          <span className="flex gap-2">
            {[0, 1, 2].map((dot) => (
              <span key={dot} className="size-2.5 rounded-full bg-muted/40" />
            ))}
          </span>
          <span className="min-w-0 grow truncate text-center text-muted">
            kaiser@kashmir — /bin/kaiser
          </span>
          <button type="button" className="link text-muted" onClick={() => run("theme")}>
            theme
          </button>
        </header>

        <div className="min-h-0 grow overflow-y-auto px-4 py-6 sm:px-6">
          <h1 className="font-display text-3xl leading-none sm:text-4xl">kaiser sakhi</h1>
          <p className="mt-2 text-muted">software developer · kashmir, india</p>
          <p className="mt-5 mb-7 border-t border-rule pt-5 text-muted">
            type a command, or click anything underlined. 'help' if you get lost.
          </p>

          <Scrollback blocks={blocks} onPick={(topic) => run(`cat ${topic}`)} />

          <div className="mt-4">
            <Prompt at={now} ok={lastOk}>
              <label className="relative grow">
                <span className="whitespace-pre-wrap">{draft}</span>
                <span className="cursor" />
                <input
                  ref={input}
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={onKeyDown}
                  // The span above is what you see; this only collects the keys.
                  className="absolute inset-0 w-full bg-transparent text-transparent caret-transparent outline-none"
                  aria-label="Terminal input"
                  autoFocus
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck={false}
                />
              </label>
            </Prompt>
          </div>

          <div ref={bottom} />
        </div>
      </section>
    </main>
  );
}
