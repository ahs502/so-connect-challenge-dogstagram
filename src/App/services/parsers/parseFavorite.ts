import { Favorite } from '../types/Favorite'

export function parseFavorite(data: any): Favorite {
  return {
    createdAt: new Date(data.created_at),
    id: data.id,
    imageId: data.image_id,
    userId: data.sub_id,
    ownerId: data.user_id,
  }
}
