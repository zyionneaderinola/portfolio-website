import { useState, useEffect } from 'react'
import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import ProjectCard from './components/ProjectCard'
import Contact from './components/Contact'
import ParticleField from './components/ParticleField'
import Documents from './components/Documents'

function App() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
  }, [])

  return (
    <div style={{ position: 'relative' }}>
      
      {/* Global particle background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}>
        <ParticleField />
      </div>

      {/* All page content sits on top */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <Hero />
        <div className="divider"></div>
        <Skills />
        <div className="divider"></div>
        <section className="section" id="projects">
        <Documents />
        <div className="divider"></div>
        <section className="section" id="projects"></section>
          <p className="section-label">Work</p>
          <h2>My Projects</h2>
          <div className="projects-grid">
            {projects.map(project => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </section>
        <Contact />
        <footer>
          <p>© 2026 Zyionne Aderinola</p>
          <p>Built with MERN Stack</p>
        </footer>
      </div>

    </div>
  )
}

export default App