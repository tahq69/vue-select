import Sample from "./Sample.vue"

export const sample = Sample

export default function(vue, options) {
  log(vue, options).then(() => "a")
}

async function log(...args) {
  const logger = new Promise<boolean>(r => {
    setTimeout(() => {
      // tslint:disable-next-line:no-console
      console.log(args)
      r(true)
    }, 1 * 1000)
  })

  return await logger
}
