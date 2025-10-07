import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'prettier'),
  {
    rules: {
      // Allow apostrophes/quotes in JSX text content without forcing HTML entities
      'react/no-unescaped-entities': 'off',
    },
  },
]

export default eslintConfig
