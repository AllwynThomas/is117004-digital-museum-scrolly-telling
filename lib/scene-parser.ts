export interface SceneNode {
  rawContent: string;
  cleanContent: string;
  backgroundSrc: string | null;
  backgroundFocal: string | null;
  splitSrc: string | null;
  splitReverseSrc: string | null;
}

const BACKGROUND_DIRECTIVE = /!\[bg(?:\s+([^\]]+))?\]\((.*?)\)/;
const SPLIT_DIRECTIVE = /!\[split\]\((.*?)\)/;
const SPLIT_REVERSE_DIRECTIVE = /!\[split-reverse\]\((.*?)\)/;

function splitIntoSceneChunks(markdown: string): string[] {
  const chunks: string[] = [];
  let currentLines: string[] = [];

  for (const line of markdown.split(/\r?\n/)) {
    if (line.trim() === "---") {
      const chunk = currentLines.join("\n").trim();
      if (chunk.length > 0) {
        chunks.push(chunk);
      }
      currentLines = [];
      continue;
    }

    currentLines.push(line);
  }

  const finalChunk = currentLines.join("\n").trim();
  if (finalChunk.length > 0) {
    chunks.push(finalChunk);
  }

  return chunks;
}

export function parseSceneMarkdown(markdown: string): SceneNode[] {
  if (typeof markdown !== "string") {
    throw new TypeError("parseSceneMarkdown expects a string");
  }

  if (markdown.trim() === "") {
    return [];
  }

  return splitIntoSceneChunks(markdown)
    .map((chunk) => {
      const backgroundMatch = chunk.match(BACKGROUND_DIRECTIVE);
      const splitMatch = chunk.match(SPLIT_DIRECTIVE);
      const splitReverseMatch = chunk.match(SPLIT_REVERSE_DIRECTIVE);

      let cleanContent = chunk;

      if (backgroundMatch) {
        cleanContent = cleanContent.replace(BACKGROUND_DIRECTIVE, "");
      }

      if (splitMatch) {
        cleanContent = cleanContent.replace(SPLIT_DIRECTIVE, "");
      }

      if (splitReverseMatch) {
        cleanContent = cleanContent.replace(SPLIT_REVERSE_DIRECTIVE, "");
      }

      return {
        rawContent: chunk,
        cleanContent: cleanContent.trim(),
        backgroundSrc: backgroundMatch?.[2] ?? null,
        backgroundFocal: backgroundMatch?.[1]?.trim() ?? null,
        splitSrc: splitMatch?.[1] ?? null,
        splitReverseSrc: splitReverseMatch?.[1] ?? null,
      };
    });
}