'use client'

import { useEffect } from 'react'

export default function CodeHighlight() {
  useEffect(() => {
    // Load Prism.js and its components
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js'
    script.async = true
    script.onload = () => {
      // Load language components
      const languages = [
        'javascript',
        'typescript',
        'jsx',
        'tsx',
        'python',
        'bash',
        'json',
        'yaml',
        'markdown'
      ]
      
      languages.forEach(lang => {
        const langScript = document.createElement('script')
        langScript.src = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-${lang}.min.js`
        langScript.async = true
        document.body.appendChild(langScript)
      })

      // Load theme
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css'
      document.head.appendChild(link)

      // Highlight all code blocks
      const Prism = (window as any).Prism
      if (Prism) {
        Prism.highlightAll()
      }
    }
    document.body.appendChild(script)

    return () => {
      // Cleanup
      document.body.removeChild(script)
    }
  }, [])

  return null
} 
