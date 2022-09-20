import { LocalStorageEntry } from '../../LocalStorageEntry'

export const imageSizeLocalStorageEntry = LocalStorageEntry.create<'small' | 'medium' | 'large'>('image-size', 'medium')
