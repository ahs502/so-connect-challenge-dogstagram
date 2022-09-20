export interface Image {
  /** @example "HkC31gcNm" */
  readonly id: string

  /** @example 300 */
  readonly width: number

  /** @example 244 */
  readonly height: number

  /** @example "https://cdn2.thedogapi.com/images/HkC31gcNm.png" */
  readonly url: string
}
