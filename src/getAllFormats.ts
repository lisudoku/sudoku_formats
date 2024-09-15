import { decoders } from './formats'

export const getAllFormats = () => decoders.map(({ format, urlPatterns }) => ({
  format,
  urlPatterns,
}))
