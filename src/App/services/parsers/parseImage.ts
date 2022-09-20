import { Image } from '../types/Image'

export function parseImage(data: any): Image {
  return {
    id: data.id,
    width: data.width,
    height: data.height,
    url: data.url,
  }
}
