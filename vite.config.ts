import { defineConfig } from 'vite'
export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'SudokuFormats',
      fileName: 'index',
      formats: ['es'],
    },
    outDir: 'website/lib',
    emptyOutDir: false,
    target: 'es2021', // match tsconfig.json
  }
})
