import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { UIProvider } from './context/UIContext'
import Home from './pages/Home'
import Resume from './pages/Resume'
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'
import Layout from './components/Layout'
import './index.css'

function App() {
  return (
    <ThemeProvider>
      <UIProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
            </Routes>
          </Layout>
        </Router>
      </UIProvider>
    </ThemeProvider>
  )
}

export default App
