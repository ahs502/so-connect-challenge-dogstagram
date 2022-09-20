import { Pages } from './Pages'
import { StylingProvider } from './styling'

export function App() {
  return (
    <StylingProvider>
      <Pages />
    </StylingProvider>
  )
}
