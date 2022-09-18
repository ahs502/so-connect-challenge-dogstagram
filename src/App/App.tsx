import { Pages } from './Pages'
import { Provider } from './Provider'
import './vendor-styles'

export function App() {
  return (
    <Provider>
      <Pages />
    </Provider>
  )
}
