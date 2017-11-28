export function highlight(text: string, pattern: string) {
  if (pattern === "") return text

  const regex = new RegExp(pattern, "g")
  const safePattern = escapeHTML(pattern)
  const replaceValue = `<strong>${safePattern}</strong>`

  return text.replace(regex, replaceValue)
}

export function escapeHTML(html: string): string {
  const escape = document.createElement("textarea")
  escape.textContent = html

  return escape.innerHTML
}
