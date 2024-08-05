"use client";
import Image from "next/image";
import { useTheme } from "next-themes";
import SolanaLogo from "@@/public/src/img/logos-solana/logotype.svg";
import SolanaLogoDark from "@@/public/src/img/logos-solana/logotype-dark.svg";

export default function ThemeLogo() {
  const { theme } = useTheme();

  return (
    <Image
      alt="Solana Docs"
      src={theme === "dark" ? SolanaLogo : SolanaLogoDark}
      width={120}
      height={16}
      priority
      aria-label="Solana Docs"
    />
  );
}
