import { useEffect, useState } from "react";

/** Wall-clock time where I am — the shell in the page is mine, not yours. */
export const kashmirTime = () =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());

export function useKashmirTime() {
  const [time, setTime] = useState(kashmirTime);

  useEffect(() => {
    // Tick on the minute rather than on a fixed interval, so the live prompt
    // never disagrees with a timestamp stamped moments ago.
    const id = setTimeout(() => setTime(kashmirTime()), 60_000 - (Date.now() % 60_000));
    return () => clearTimeout(id);
  }, [time]);

  return time;
}
