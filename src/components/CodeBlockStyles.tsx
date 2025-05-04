'use client'

export default function CodeBlockStyles() {
  return (
    <style jsx global>{`
      pre {
        white-space: pre-wrap;
        word-wrap: break-word;
      }
      code {
        white-space: pre-wrap;
        word-wrap: break-word;
      }
      pre[class*="language-"] {
        background: transparent !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      code[class*="language-"] {
        background: transparent !important;
      }
    `}</style>
  )
} 
