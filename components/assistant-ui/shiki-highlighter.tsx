"use client";

import { FC } from "react";
import ShikiHighlighter, { type ShikiHighlighterProps } from "react-shiki";
import type { SyntaxHighlighterProps as AUIProps } from "@assistant-ui/react-markdown";
import { cn } from "@/lib/utils";

/**
 * Props for the SyntaxHighlighter component
 */
export type HighlighterProps = Omit<
  ShikiHighlighterProps,
  "children" | "theme"
> & {
  theme?: ShikiHighlighterProps["theme"];
} & Pick<AUIProps, "node" | "components" | "language" | "code">;

/**
 * SyntaxHighlighter component, using react-shiki
 * Use it by passing to `defaultComponents` in `markdown-text.tsx`
 *
 * @example
 * const defaultComponents = memoizeMarkdownComponents({
 *   SyntaxHighlighter,
 *   h1: //...
 *   //...other elements...
 * });
 */
export const SyntaxHighlighter: FC<HighlighterProps> = ({
  code,
  language,
  theme = "github-dark",
  className,
  node: _node,
  components: _components,
  ...props
}) => {
  const BASE_STYLES =
    "[&_pre]:overflow-x-auto [&_pre]:rounded-b-lg [&_pre]:bg-black [&_pre]:p-4 [&_pre]:text-white";

  return (
    <ShikiHighlighter
      {...props}
      language={language}
      theme={theme}
      addDefaultStyles={true}
      showLanguage={true}
      className={cn(BASE_STYLES, className)}
    >
      {code}
    </ShikiHighlighter>
  );
};

SyntaxHighlighter.displayName = "SyntaxHighlighter";
