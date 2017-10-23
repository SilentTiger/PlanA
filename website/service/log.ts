export function log(...params: any[]) {
  console.log.apply(null, params)
}

export function debug(...params: any[]) {
  console.debug.apply(null, params)
}

export function warn(...params: any[]) {
  console.warn.apply(null, params)
}

export function error(...params: any[]) {
  console.error.apply(null, params)
}