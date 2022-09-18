import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

fetch(`https://api.thedogapi.com/v1/breeds?page=1&limit=10`, {
  headers: {
    'x-api-key': 'live_fhxlFssMcdVApH5CHU1N9n1y7cxnJ6NFHJdeg2361HPWN1w5oiEVOpTqBeQ7NWBg',
  },
})
  .then(response => response.json())
  .then(console.log)
