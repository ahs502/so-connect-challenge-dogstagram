import { Image } from './Image'

export interface Favorite {
  /** @example new Date("2022-09-20T00:29:25.000Z") */
  readonly createdAt: Date

  /** @example 58326 */
  readonly id: number

  /** @example "SyfsC19NQ" */
  readonly imageId: Image['id']

  /** @example "hessamoddin" */
  readonly userId: string

  /** @example "6abruz" */
  readonly ownerId: string
}
