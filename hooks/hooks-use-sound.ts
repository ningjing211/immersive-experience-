// hooks/useSound.ts
import { useState, useRef } from "react"

export function useSound(initialState = true) {
  const [soundOn, setSoundOn] = useState(initialState)
  const audioRef = useRef<HTMLIFrameElement | null>(null)

  // Toggle sound function
  const toggleSound = () => {
    setSoundOn(!soundOn)
    
    if (audioRef.current && audioRef.current.contentWindow) {
      try {
        // Correct YouTube iframe API message format
        audioRef.current.contentWindow.postMessage(
          JSON.stringify({
            event: "command",
            func: soundOn ? "pauseVideo" : "playVideo",
          }),
          "*"
        )
      } catch (error) {
        console.error("Error controlling audio:", error)
      }
    }
  }

  return {
    soundOn,
    audioRef,
    toggleSound
  }
}
