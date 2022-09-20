import { config } from '../../config'
import { authenticatedUserIdLocalStorageEntry } from '../authenticatedUserIdLocalStorageEntry'
import { parseBreedAttached } from './parsers/parseBreedAttached'
import { parseFavoriteAttached } from './parsers/parseFavoriteAttached'
import { parseImage } from './parsers/parseImage'
import { parseImageAttached } from './parsers/parseImageAttached'
import { Breed } from './types/Breed'
import { BreedAttached } from './types/BreedAttached'
import { Favorite } from './types/Favorite'
import { FavoriteAttached } from './types/FavoriteAttached'
import { Image } from './types/Image'
import { ImageAttached } from './types/ImageAttached'

export const services = {
  async getAllBreeds(): Promise<{
    breads: BreedAttached[]
  }> {
    const response = await fetch(`${config.theDogApi.baseUrl}/breeds`, {
      headers: {
        'x-api-key': config.theDogApi.apiKey,
      },
    })
    const data = await response.json()
    return {
      breads: Array.isArray(data) ? data.map(parseBreedAttached) : [],
    }
  },

  async searchImages(options?: {
    page?: number
    limit?: number
    breedId?: Breed['id']
    types?: ('jpg' | 'png' | 'gif')[]
    order?: 'random' | 'asc' | 'desc'
  }): Promise<{
    images: ImageAttached[]
    totalCount: number
  }> {
    const authenticatedUserId = authenticatedUserIdLocalStorageEntry.read()
    const query = [
      options?.page !== undefined && `page=${options.page}`,
      options?.limit !== undefined && `limit=${options.limit}`,
      options?.breedId !== undefined && `breed_id=${options.breedId}`,
      options?.types &&
        Array.isArray(options.types) &&
        options.types.length > 0 &&
        `mime_types=${options.types.map(type => `image/${type}`).join(',')}`,
      options?.order !== undefined && `order=${options.order}`,
      authenticatedUserId && `sub_id=${authenticatedUserId}`,
    ]
      .filter(Boolean)
      .join('&')
    const response = await fetch(`${config.theDogApi.baseUrl}/images/search${query ? `?${query}` : ''}`, {
      headers: {
        'x-api-key': config.theDogApi.apiKey,
      },
    })
    const data = await response.json()
    return {
      images: Array.isArray(data) ? data.map(parseImageAttached) : [],
      totalCount: response.headers.has('pagination-count') ? Number(response.headers.get('pagination-count')) : 0,
    }
  },

  async getImage(options: { imageId: Image['id'] }): Promise<{
    image: Image
  }> {
    const authenticatedUserId = authenticatedUserIdLocalStorageEntry.read()
    const query = [authenticatedUserId && `sub_id=${authenticatedUserId}`].filter(Boolean).join('&')
    const response = await fetch(`${config.theDogApi.baseUrl}/images/${options.imageId}${query ? `?${query}` : ''}`, {
      headers: {
        'x-api-key': config.theDogApi.apiKey,
      },
    })
    const data = await response.json()
    return {
      image: parseImage(data),
    }
  },

  async getAllUserFavorites(options?: { page?: number; limit?: number }): Promise<{
    favorites: FavoriteAttached[]
    totalCount: number
  }> {
    const authenticatedUserId = authenticatedUserIdLocalStorageEntry.read()
    const query = [
      options?.page !== undefined && `page=${options.page}`,
      options?.limit !== undefined && `limit=${options.limit}`,
      authenticatedUserId && `sub_id=${authenticatedUserId}`,
    ]
      .filter(Boolean)
      .join('&')
    const response = await fetch(`${config.theDogApi.baseUrl}/favourites${query ? `?${query}` : ''}`, {
      headers: {
        'x-api-key': config.theDogApi.apiKey,
      },
    })
    const data = await response.json()
    return {
      favorites: Array.isArray(data) ? data.map(parseFavoriteAttached) : [],
      totalCount: response.headers.has('pagination-count') ? Number(response.headers.get('pagination-count')) : 0,
    }
  },

  async getUserFavorite(options: { favoriteId: Favorite['id'] }): Promise<{
    favorite: FavoriteAttached
  }> {
    const response = await fetch(`${config.theDogApi.baseUrl}/favourites/${options.favoriteId}`, {
      headers: {
        'x-api-key': config.theDogApi.apiKey,
      },
    })
    const data = await response.json()
    return {
      favorite: parseFavoriteAttached(data),
    }
  },

  async addUserFavorite(options: { imageId: Image['id'] }): Promise<{
    favoriteId: Favorite['id']
  }> {
    const authenticatedUserId = authenticatedUserIdLocalStorageEntry.read()
    const response = await fetch(`${config.theDogApi.baseUrl}/favourites`, {
      headers: {
        'x-api-key': config.theDogApi.apiKey,
        'content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        image_id: options.imageId,
        ...(authenticatedUserId ? { sub_id: authenticatedUserId } : {}),
      }),
    })
    const data = await response.json()
    return {
      favoriteId: data.id,
    }
  },

  async removeUserFavorite(options: { favoriteId: Favorite['id'] }): Promise<void> {
    const response = await fetch(`${config.theDogApi.baseUrl}/favourites/${options.favoriteId}`, {
      headers: {
        'x-api-key': config.theDogApi.apiKey,
      },
      method: 'DELETE',
    })
    await response.json()
  },
} as const
