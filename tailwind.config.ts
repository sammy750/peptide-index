import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Editorial palette. `paper` is the background, `ink` the text,
        // `volt` the single accent, `line` for hairlines, `muted` for secondary text.
        paper: "#FCFCFA",
        ink: "#191A15",
        volt: "#B6F300",
        line: "#E6E6DE",
        muted: "#6B6C63",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        prose: "68ch",
        content: "72rem",
      },
      typography: () => ({
        index: {
          css: {
            "--tw-prose-body": "#191A15",
            "--tw-prose-headings": "#191A15",
            "--tw-prose-links": "#191A15",
            "--tw-prose-bold": "#191A15",
            "--tw-prose-counters": "#6B6C63",
            "--tw-prose-bullets": "#C9C9BF",
            "--tw-prose-hr": "#E6E6DE",
            "--tw-prose-quotes": "#191A15",
            "--tw-prose-quote-borders": "#B6F300",
            "--tw-prose-captions": "#6B6C63",
            "--tw-prose-code": "#191A15",
            "--tw-prose-pre-bg": "#191A15",
            "--tw-prose-pre-code": "#FCFCFA",
            "--tw-prose-th-borders": "#E6E6DE",
            "--tw-prose-td-borders": "#E6E6DE",
            maxWidth: "68ch",
            a: {
              textDecoration: "none",
              borderBottom: "1px solid #C9C9BF",
              fontWeight: "500",
            },
            "a:hover": {
              borderBottomColor: "#191A15",
            },
            code: {
              fontWeight: "500",
              backgroundColor: "#F2F2EC",
              padding: "0.1em 0.35em",
              borderRadius: "0.25rem",
            },
            "code::before": { content: "none" },
            "code::after": { content: "none" },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
