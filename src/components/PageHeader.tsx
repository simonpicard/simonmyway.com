import { ReactNode } from 'react'

interface PageHeaderProps {
  children: ReactNode
  className?: string
}

export default function PageHeader({ children, className = '' }: PageHeaderProps) {
  return (
    <div className={`px-2 sm:px-5 py-4 border-b border-dark-border-default bg-dark-canvas-subtle ${className}`}>
      {children}
    </div>
  )
} 
