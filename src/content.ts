/**
 * Everything the shell knows about me. Each topic is a block of terminal
 * output; `row` keeps the columns lined up without hand-counted spaces.
 */

const row = (...cells: string[]) =>
  cells.map((cell) => cell.padEnd(14)).join("").trimEnd();

export const whoami = "kaiser sakhi — backends, and the whole stack under them.";

export const topics: Record<string, string[]> = {
  about: [
    "i build backends and own every layer beneath them —",
    "the schema, the deploy, the box it runs on.",
    "performance is not a phase i get to later.",
    "",
    "off the clock: a pi 5, a mini-pc and a few cloud",
    "boxes stitched together with docker and tailscale,",
    "mostly so i can break them on purpose.",
  ],

  work: [
    row("novatro.ai", "2025 —", "software developer"),
    "  natural-language reads and writes over erp data.",
    "  contract review, shipped end to end.",
    "",
    row("pupilfirst", "2023 — 24", "jr. web developer"),
    "  lms internals, razorpay billing, rescript + react.",
    "  20% off the page load on the way out.",
  ],

  ship: [
    row("fitop.io", "elixir · phoenix · traefik"),
    "  multi-tenant saas. a new tenant gets its own",
    "  subdomain and certificate in seconds. built solo.",
    "",
    row("kode search", "vespa · scrapy · rails"),
    "  crawls programming docs, serves search over them.",
    "",
    row("wiretap", "elixir"),
    "  a tcp/http server built from nothing but otp.",
    "",
    row("rvault", "rust"),
    "  cli password vault. aes-gcm over argon2.",
    "",
    row("envsafe", "ruby"),
    "  version control for the .env you keep losing.",
    "",
    "  all of it: github.com/kaisersakhi",
  ],

  writing: [
    row("apr 2025", "setting up traefik with wildcard ssl"),
    row("jun 2025", "ruby on rails interview questions"),
    "",
    "  the rest: blog.kaisersakhi.com",
  ],

  contact: [
    row("mail", "mail@kaisersakhi.com"),
    row("github", "github.com/kaisersakhi"),
    row("linkedin", "linkedin.com/in/kaisersakhi"),
    row("writing", "blog.kaisersakhi.com"),
  ],
};

export { row };
