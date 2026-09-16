export function wordCount(markdown = '') {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/[^\p{L}\p{N}'’-]+/gu, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

export function readingMinutes(markdown = '') {
  return Math.max(1, Math.ceil(wordCount(markdown) / 220));
}

export function slugifyHeading(text = '') {
  return text
    .toLowerCase()
    .replace(/[`*_~]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function extractToc(markdown = '') {
  return markdown
    .split('\n')
    .map((line) => {
      const match = line.match(/^(##|###)\s+(.+)$/);
      if (!match) return null;
      const level = match[1].length;
      const label = match[2].replace(/\[(.*?)\]\([^)]*\)/g, '$1').replace(/[*_`]/g, '').trim();
      return { level, label, id: slugifyHeading(label) };
    })
    .filter(Boolean);
}
