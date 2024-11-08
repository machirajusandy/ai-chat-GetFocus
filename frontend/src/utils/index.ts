export function transformTextToMarkdownLink(
  data: string,
  wordToTransform: string,
  url: string
): string {
  const markdownLink = `[${wordToTransform}](${url})`
  return data.replace(new RegExp(wordToTransform, 'g'), markdownLink)
}
