import useLocalStorage, { deleteFromStorage, writeStorage } from '@rehooks/local-storage'

// The library we're using doesn't have a unified behavior against different value types.
// It stringifies the object typed values and keeps the others unchanged while writting.
// In return it tries to parse the read value and if it can't, just returns the value itself.
// We take care of stringifying and parsing ourselves to overcome that undesirable behavior:

export class LocalStorageEntry<T> {
  private constructor(public readonly key: string, public readonly defaultValue: T) {}

  write(value: T): void {
    const stringifiedValue = JSON.stringify({ value })
    writeStorage(this.key, stringifiedValue)
  }

  read(): T {
    const stringifiedValue = window.localStorage.getItem(this.key)
    if (stringifiedValue === null) return this.defaultValue
    return JSON.parse(stringifiedValue)?.value
  }

  delete(): void {
    deleteFromStorage(this.key)
  }

  useRead(): T {
    // The whole method is going to be used as a hook:
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [maybeStringifiedValue] = useLocalStorage(this.key, null as any) // Sometimes, this hook internally tries to parse values
    const value =
      maybeStringifiedValue === null
        ? this.defaultValue
        : (typeof maybeStringifiedValue === 'string' ? JSON.parse(maybeStringifiedValue) : maybeStringifiedValue)?.value
    return value
  }

  static create: {
    <T>(key: string, defaultValue: T): LocalStorageEntry<T>
    <T>(key: string): LocalStorageEntry<T | null>
  } = function (key, defaultValue?) {
    return new LocalStorageEntry(key, arguments.length === 1 ? null : defaultValue)
  }
}
