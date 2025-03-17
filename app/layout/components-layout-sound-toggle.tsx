// components/layout/SoundToggle.tsx
import React from "react"

interface SoundToggleProps {
  soundOn: boolean
  toggleSound: () => void
}

const SoundToggle: React.FC<SoundToggleProps> = ({ soundOn, toggleSound }) => {
  return (
    <button
      className="fixed bottom-8 right-8 z-[70] text-xs font-light tracking-wider lowercase opacity-80 cursor-pointer hover:opacity-100 transition-opacity duration-300 py-2 px-4 border border-white/30 rounded-full backdrop-blur-sm"
      onClick={toggleSound}
      aria-label={soundOn ? "mute" : "sound"}
    >
      {soundOn ? "mute" : "sound"}
    </button>
  );
};

export default SoundToggle;