import { highlight, stripHTML } from "./helpers"

let seed = 0
const now = Date.now()

function uuid() {
  return `key_${now}_${++seed}`
}

interface IValue {
  id?: string
  Id?: string
  [key: string]: any
}

export default class CripOption<T extends IValue> {
  public value: T
  public key: string

  private textGenerator: (o: T) => string

  constructor(value: T, textGenerator: (o: T) => string) {
    this.textGenerator = textGenerator
    this.value = value
    this.key = value.id || value.Id || uuid()
  }

  public isActive(key: string) {
    return this.key === key
  }

  public text() {
    return this.textGenerator(this.value).toString()
  }

  public plainText() {
    return stripHTML(this.text())
  }

  public highlightedText(criteria: string) {
    return highlight(this.text(), criteria)
  }
}