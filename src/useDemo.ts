import { useEffect } from "react";

const LEAD_IN = 600;
const PER_CHARACTER = 90;
const BEFORE_RETURN = 320;

/**
 * Types a command out on load and runs it, so the first thing a visitor sees
 * is the shell demonstrating itself rather than an empty prompt.
 */
export function useDemo(
  command: string,
  setDraft: (draft: string) => void,
  run: (input: string) => void,
) {
  useEffect(() => {
    let cancelled = false;
    let timer: number;

    const type = (length: number) => {
      if (cancelled) return;
      setDraft(command.slice(0, length));

      timer =
        length < command.length
          ? window.setTimeout(() => type(length + 1), PER_CHARACTER)
          : window.setTimeout(() => run(command), BEFORE_RETURN);
    };

    timer = window.setTimeout(() => type(1), LEAD_IN);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [command, setDraft, run]);
}
