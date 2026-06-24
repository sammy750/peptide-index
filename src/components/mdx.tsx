import { MDXRemote } from "next-mdx-remote/rsc";

import { cn } from "@/lib/utils";

/** A styled aside usable inside any .mdx body: <Callout>…</Callout>. */
function Callout({
  children,
  type = "note",
}: {
  children: React.ReactNode;
  type?: "note" | "warning";
}) {
  return (
    <div
      className={cn(
        "my-6 rounded-lg border px-4 py-3 text-sm leading-relaxed",
        type === "warning"
          ? "border-volt bg-volt/15 text-ink"
          : "border-line bg-paper text-ink/80",
      )}
    >
      {children}
    </div>
  );
}

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

/** Components made available to every MDX document. */
const components = {
  Callout,
  a: ({ href = "", children, ...rest }: AnchorProps) => {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  },
};

/** Server component: compile + render an MDX body string (frontmatter pre-stripped). */
export function Mdx({ source }: { source: string }) {
  return (
    <div className="prose prose-index">
      <MDXRemote source={source} components={components} options={{ parseFrontmatter: false }} />
    </div>
  );
}
