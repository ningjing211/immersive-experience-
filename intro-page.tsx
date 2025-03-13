"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function IntroPage() {
  const [entering, setEntering] = useState(false)
  const router = useRouter()

  const handleEnter = () => {
    setEntering(true)

    // Navigate to the main experience after transition completes
    setTimeout(() => {
      router.push("/experience")
    }, 1500)
  }

  return (
    <div
      className={`fixed inset-0 bg-black text-white flex flex-col items-center justify-center transition-opacity duration-1500 ${entering ? "opacity-0" : "opacity-100"}`}
    >
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(25,25,25,0.8)_0%,rgba(0,0,0,1)_100%)]"></div>
      <div className="absolute inset-0 mix-blend-overlay opacity-20 bg-[url('data:image/svg+xml,%3Csvg width=&quot;40&quot; height=&quot;40&quot; viewBox=&quot;0 0 40 40&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fillOpacity=&quot;0.1&quot; fillRule=&quot;evenodd&quot;%3E%3Cpath d=&quot;M0 40L40 0H20L0 20M40 40V20L20 40&quot;%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
      <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)] pointer-events-none"></div>
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml,%3Csvg viewBox=&quot;0 0 200 200&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cfilter id=&quot;noiseFilter&quot;%3E%3CfeTurbulence type=&quot;fractalNoise&quot; baseFrequency=&quot;0.65&quot; numOctaves=&quot;3&quot; stitchTiles=&quot;stitch&quot;/%3E%3C/filter%3E%3Crect width=&quot;100%25&quot; height=&quot;100%25&quot; filter=&quot;url(%23noiseFilter)&quot;/%3E%3C/svg%3E')]"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-12 px-4">
        {/* Logo */}
        <div className="flex items-center gap-3"></div>

        {/* Main title */}
        <div className="text-center">
          <h2 className="text-7xl md:text-8xl font-extralight tracking-tighter mb-4">One</h2>
          <p className="text-lg font-light tracking-wider text-white/70 max-w-xl">
            Experience a sensory exploration through five dimensions
          </p>
        </div>

        {/* Enter button */}
        <button
          onClick={handleEnter}
          className="mt-8 border border-white/30 bg-transparent text-white py-3 px-12 text-sm tracking-widest uppercase hover:bg-white/10 transition-all duration-300 backdrop-blur-sm relative overflow-hidden group"
        >
          <span className="relative z-10">Enter</span>
          <span className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
        </button>

        {/* Subtle instruction */}
      </div>
    </div>
  )
}

