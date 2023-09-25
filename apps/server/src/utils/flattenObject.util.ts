/* eslint-disable no-prototype-builtins */
export function flattenObject(ob: any) {
  const toReturn: any = {}

  for (const i in ob) {
    if (!ob.hasOwnProperty(i)) continue

    if (typeof ob[i] == 'object' && ob[i] !== null) {
      const flatObject: any = flattenObject(ob[i])
      for (const x in flatObject) {
        if (!flatObject?.hasOwnProperty(x)) continue

        toReturn[i + '.' + x] = flatObject[x]
      }
    } else {
      toReturn[i] = ob[i]
    }
  }
  return toReturn
}
