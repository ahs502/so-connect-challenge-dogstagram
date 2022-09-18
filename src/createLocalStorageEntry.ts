import useLocalStorage, { deleteFromStorage, writeStorage } from '@rehooks/local-storage'

interface CreateLocalStorageEntry {
  <T>(key: string, defaultValue: T): LocalStorageEntry<T>
  <T>(key: string): LocalStorageEntry<T | null>
}

interface LocalStorageEntry<T> {
  readonly write: (value: T) => void
  readonly read: () => T
  readonly delete: () => void
  readonly useRead: () => T
}

export const createLocalStorageEntry: CreateLocalStorageEntry = (key: string, defaultValue: any = null) => {
  return {
    write(value) {
      writeStorage(key, value)
    },

    read() {
      const stringifiedValue = window.localStorage.getItem(key)
      if (stringifiedValue === null) return defaultValue
      return JSON.parse(stringifiedValue)
    },

    delete() {
      deleteFromStorage(key)
    },

    useRead() {
      const [value] = useLocalStorage(key, defaultValue)
      return value
    },
  }
}
