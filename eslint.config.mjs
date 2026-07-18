import coreWebVitals from 'eslint-config-next/core-web-vitals'

const config = [
  {
    ignores: ['.next/**', 'node_modules/**', 'out/**', 'next-env.d.ts', 'drafts/**', '.venv/**'],
  },
  ...coreWebVitals,
]

export default config
