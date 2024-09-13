import { matchers } from './formats'

export const getAllFormats = () => matchers.map(({ format, urlPatterns }) => ({
  format,
  urlPatterns,
}))
