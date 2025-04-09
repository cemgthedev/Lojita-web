import { Link } from "@heroui/link";
import { ExternalLinkIcon } from "lucide-react";


export const Footer = () => {
    return (
      <footer className="bg-purple-200 dark:bg-zinc-800 border-t border-purple-600 w-full flex items-center justify-center p-6">
        <Link
          isExternal
          className="flex items-center gap-2 text-current text-center"
          href="https://heroui.com"
          title="heroui.com homepage"
        >
          <p>Copyright (c) 2024 Carlos Eduardo de Moura Gomes</p>
          <ExternalLinkIcon className="w-5 h-5"/>
        </Link>
      </footer>
    );
}