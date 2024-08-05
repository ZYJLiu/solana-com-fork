import { type DocsLayoutProps } from "fumadocs-ui/layout";
import { type HomeLayoutProps } from "fumadocs-ui/home-layout";
import { pageTree } from "./source";
import dynamic from "next/dynamic";

const ThemeLogo = dynamic(() => import("./components/ThemeLogo"), {
  ssr: false,
});

// shared configuration
export const baseOptions: HomeLayoutProps = {
  githubUrl: "https://github.com/solana-foundation/solana-com",
  nav: {
    title: <ThemeLogo />,
    transparentMode: "none",
  },
  links: [
    {
      text: "Documentation",
      url: "/test",
      active: "nested-url",
    },
  ],
};

// docs layout configuration
export const docsOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: pageTree,
};
