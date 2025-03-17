// components/layout/Menu.tsx
import React from "react"
import { sectionTitles } from "../../data/sectionData"

interface MenuProps {
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
  selectPageFromMenu: (index: number) => void
}

const Menu: React.FC<MenuProps> = ({ 
  menuOpen, 
  setMenuOpen, 
  selectPageFromMenu 
}) => {
  return (
    <div 
      className="fixed inset-0 z-[75] pointer-events-none"
      style={{
        clipPath: menuOpen ? 'circle(150% at 95% 5%)' : 'circle(0% at 95% 5%)',
        transition: 'clip-path 0.8s cubic-bezier(0.77, 0, 0.175, 1)',
      }}
    >
      <div 
        className={`absolute inset-0 bg-[#b3b1a6] backdrop-blur-md ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        style={{
          opacity: menuOpen ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
        }}
      >
        {/* Close button */}
        <button 
          className="absolute top-8 right-8 text-black/70 flex items-center text-sm font-light"
          style={{ fontFamily: "'Libre Baskerville', serif" }}
          onClick={() => setMenuOpen(false)}
        >
          <span className="mr-2">close menu</span>
          <div className="w-4 h-px bg-black/70"></div>
        </button>
        
        {/* Central content area */}
        <div className="flex flex-col justify-center items-center h-full">
          <div className="max-w-md w-full mx-auto px-8 -translate-x-24 mt-16">
            <ul className="space-y-5">
              {sectionTitles.map((title, index) => (
                <li 
                  key={index} 
                  className="transform transition-all duration-500 translate-x-0 opacity-100" 
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <button 
                    className={`text-2xl font-light tracking-wider hover:text-black transition-colors ${index === 0 ? 'text-black' : 'text-black/50'}`}
                    style={{ fontFamily: "'Alice', serif" }}
                    onClick={() => selectPageFromMenu(index)}
                  >
                    {title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Footer links */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-8 text-xs text-black/70">
          <a 
            href="#" 
            className="hover:text-black transition-colors"
            style={{ fontFamily: "'Libre Baskerville', serif" }}
          >
            About us
          </a>
          <a 
            href="#" 
            className="hover:text-black transition-colors"
            style={{ fontFamily: "'Libre Baskerville', serif" }}
          >
            Get in touch
          </a>
          <a 
            href="#" 
            className="hover:text-black transition-colors"
            style={{ fontFamily: "'Libre Baskerville', serif" }}
          >
            Legal notice
          </a>
        </div>
      </div>
    </div>
  )
}

export default Menu
