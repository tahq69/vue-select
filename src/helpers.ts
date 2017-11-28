const escape = document.createElement("textarea")
const strip = document.createElement("div")

export function highlight(text: string, pattern: string) {
  if (pattern === "") return text

  const regex = new RegExp(pattern, "g")
  const safePattern = escapeHTML(pattern)
  const replaceValue = `<strong>${safePattern}</strong>`

  return text.replace(regex, replaceValue)
}

export function escapeHTML(html: string): string {
  escape.textContent = html

  return escape.innerHTML
}

export function stripHTML(html: string): string {
  strip.innerHTML = html
  return strip.textContent || strip.innerText || ""
}
