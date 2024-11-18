export default defineConfig({
  plugins: [react()],
  base: '/',  // Change from './' to '/'
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/\.(css|less|sass|scss|styl|stylus|pcss|postcss)$/i.test(assetInfo.name)) {
            return `assets/css/[name].[hash][extname]`
          }
          if (/\.(png|jpe?g|gif|svg|ico|webp)$/i.test(assetInfo.name)) {
            return `assets/images/[name].[hash][extname]`
          }
          return `assets/[ext]/[name].[hash][extname]`
        },
        chunkFileNames: 'assets/js/[name].[hash].js',
        entryFileNames: 'assets/js/[name].[hash].js'
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});