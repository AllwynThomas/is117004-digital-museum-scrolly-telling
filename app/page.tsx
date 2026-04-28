import fs from "node:fs";
import path from "node:path";

import { PresentationShell } from "@/components/presentation/presentation-shell";
import { parseSceneMarkdown } from "@/lib/scene-parser";

export default function Home() {
  const sceneFile = path.join(
    process.cwd(),
    "content",
    "scenes",
    "digital-museum.md",
  );
  const markdown = fs.readFileSync(sceneFile, "utf8");
  const scenes = parseSceneMarkdown(markdown);

  return <PresentationShell scenes={scenes} />;
}
