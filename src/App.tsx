import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import { UIProvider } from './context/UIContext'
import Home from './pages/Home'
import Resume from './pages/Resume'
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'
import ProjectDetail from './pages/ProjectDetail'
import Layout from './components/Layout'

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageWrapper>
            <Home />
          </PageWrapper>
        } />
        <Route path="/resume" element={
          <PageWrapper>
            <Resume />
          </PageWrapper>
        } />
        <Route path="/blog" element={
          <PageWrapper>
            <Blog />
          </PageWrapper>
        } />
        <Route path="/blog/:id" element={
          <PageWrapper>
            <BlogDetail />
          </PageWrapper>
        } />
        <Route path="/project/:id" element={
          <PageWrapper>
            <ProjectDetail />
          </PageWrapper>
        } />
      </Routes>
    </AnimatePresence>
  );
};

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

function App() {
  return (
    <ThemeProvider>
      <UIProvider>
        <Router>
          <Layout>
            <AnimatedRoutes />
          </Layout>
        </Router>
      </UIProvider>
    </ThemeProvider>
  )
}

export default App;
