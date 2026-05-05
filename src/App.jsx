import { Routes, Route } from 'react-router-dom'  // ✅ Sirf Routes, Route import karo
import Layout from './components/shared/PageLayout'
import HomePage from './pages/Homepage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* More routes will be added here */}
      </Routes>
    </Layout>
  )
}

export default App