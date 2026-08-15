import { Routes, Route } from 'react-router-dom';
import { Nav } from './components/layout/Nav';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/hero/hero';
import { ProjectGrid } from './components/projects/ProjectGrid';
import { BlogList } from './components/blog/BlogList';
import { BlogPostPage } from './components/blog/BlogPostPage';
import { TerminalOverlay } from './components/terminal/TerminalOverlay';
import { useTerminal } from './components/terminal/useTerminal';

function Home() {
  return (
      <>
        <Hero />
        <div id="projects" style={{ paddingTop: 40 }}>
          <ProjectGrid />
        </div>
        <div id="writing" style={{ paddingTop: 64 }}>
          <BlogList />
        </div>
      </>
  );
}

export default function App() {
  const { open, setOpen } = useTerminal();

  return (
      <>
        <Nav />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
          </Routes>
        </main>
        <Footer />
        <TerminalOverlay open={open} onClose={() => setOpen(false)} />
      </>
  );
}