import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, '../shared/src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@context': path.resolve(__dirname, './src/context')
    }
  },
  server: {
    port: 3000,
    host: true,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: process.env.NODE_ENV === 'development',
    target: 'es2015',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // 核心框架分離
          'react-core': ['react', 'react-dom'],
          'react-router': ['react-router', 'react-router-dom'],
          
          // Chart.js 分離 (較大的套件)
          'charts': ['chart.js', 'react-chartjs-2'],
          
          // 工具庫分離
          'utils': ['axios', 'lucide-react']
        },
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name.split('.').pop()
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return 'images/[name]-[hash][extname]'
          }
          if (extType === 'css') {
            return 'css/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    
    // 壓縮設定
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: process.env.NODE_ENV === 'production',
        drop_debugger: true,
        pure_funcs: process.env.NODE_ENV === 'production' ? 
          ['console.log', 'console.info', 'console.debug'] : []
      }
    }
  },
  
  preview: {
    port: 3000,
    host: true
  },
  
  envPrefix: 'VITE_'
})