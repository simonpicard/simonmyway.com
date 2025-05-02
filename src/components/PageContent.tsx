import { ReactNode } from 'react'

interface PageContentProps {
  children: ReactNode
  className?: string
}

export default function PageContent({ children, className = '' }: PageContentProps) {
  return (
    <div className={`px-2 sm:px-5 py-4 ${className}`}>
      {children}
    </div>
  )
} 
