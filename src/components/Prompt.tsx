import type { ReactNode } from "react";

/**
 * The two-line prompt: a context line of powerline segments with the exit
 * status and clock pushed to the right, then the line you actually type on.
 * Scrollback echoes and the live input share it, so history reads identically.
 */
export function Prompt({
  at,
  ok,
  children,
}: {
  at: string;
  ok: boolean;
  children: ReactNode;
}) {
  return (
    <div className="prompt">
      <div className="flex items-center">
        <span className="seg seg-user">
          kaiser<span className="hidden sm:inline">@kashmir</span>
        </span>
        <span className="seg seg-path">~</span>
        <span className="mx-3 grow border-t border-dashed border-rule" />
        <span className={ok ? "text-ok" : "text-fail"}>{ok ? "✔" : "✘"}</span>
        <span className="ml-2 tabular-nums text-muted">{at}</span>
      </div>

      <div className="mt-0.5 flex gap-2">
        <span className="shrink-0 select-none text-accent">❯</span>
        {children}
      </div>
    </div>
  );
}
