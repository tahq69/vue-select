const escape = document.createElement("textarea")
const strip = document.createElement("div")

export function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0
    const v = c === "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function highlight(text: string, pattern: string): string {
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
