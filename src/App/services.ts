export default null

fetch(`https://api.thedogapi.com/v1/breeds?page=1&limit=10`, {
  headers: {
    'x-api-key': 'live_fhxlFssMcdVApH5CHU1N9n1y7cxnJ6NFHJdeg2361HPWN1w5oiEVOpTqBeQ7NWBg',
  },
})
  .then(response => response.json())
  .then(console.log)
