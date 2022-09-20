/**
 * Contains all the global level configurations.
 * Most probably these values are about to be taken from environment variables
 * or injected by any other such tools during build process.
 */
export const config = {
  nodeEnvironment: process.env.NODE_ENV,

  passwordPostfix: 'zoot',

  theDogApi: {
    baseUrl: 'https://api.thedogapi.com/v1',
    apiKey: 'live_fhxlFssMcdVApH5CHU1N9n1y7cxnJ6NFHJdeg2361HPWN1w5oiEVOpTqBeQ7NWBg',
    recommendedLimit: 23,
  },
} as const
