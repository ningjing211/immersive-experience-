// styles/globalStyles.ts
import React from "react"

export const GlobalStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Alice&family=Chocolate+Classical+Sans&family=IM+Fell+Double+Pica:ital@0;1&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
    
    @keyframes scrollAnim {
      0% {
        transform: translateY(-5px);
        opacity: 0;
      }
      30% {
        opacity: 1;
      }
      60% {
        opacity: 1;
      }
      100% {
        transform: translateY(5px);
        opacity: 0;
      }
    }
  `}</style>
)

export default GlobalStyles
