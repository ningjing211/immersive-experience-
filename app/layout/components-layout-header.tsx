import React from "react"

interface HeaderProps {
  menuOpen: boolean
  toggleMenu: () => void
}

const Header: React.FC<HeaderProps> = ({ menuOpen, toggleMenu }) => {
  return (
    <header className="fixed top-0 left-0 w-full px-8 py-7 flex justify-between items-center z-50 backdrop-blur-sm">
      <div className="flex items-center">
        <div className="relative w-7 h-7 mr-2.5">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-white"></div>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></div>
          <div className="absolute left-0 top-0 h-full w-0.5 bg-white"></div>
          <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <span className="text-sm font-medium">One One </span>
      </div>

      <div 
        className="flex items-center cursor-pointer z-[80]"
        onClick={toggleMenu}
      >
        <span className="mr-2.5 text-sm font-medium">menu</span>
        <div className="flex flex-col gap-1.5">
          <div className={`w-5 h-px bg-white transition-all duration-300 ${menuOpen ? 'transform rotate-45 translate-y-1.5' : ''}`}></div>
          <div className={`w-5 h-px bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></div>
          <div className={`w-5 h-px bg-white transition-all duration-300 ${menuOpen ? 'transform -rotate-45 -translate-y-1.5' : ''}`}></div>
        </div>
      </div>
    </header>
  )
}

export default Header 