import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true,
        propsDestructure: true
      }
    }),
    vueJsx({
      // 只处理 JSX/TSX 文件
      include: ['**/*.jsx', '**/*.tsx'],
      // 排除 node_modules 中的文件
      exclude: ['node_modules/**'],
      babelPlugins: []
    })
  ],
  css: {
    // 处理 CSS 文件
    modules: {
      localsConvention: 'camelCaseOnly'
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        math: 'always',
        additionalData: `
        @import 'icepro/src/assets/animate.less';
        @import 'icepro/src/assets/variables.less';
        @import 'icepro/src/assets/common.less';
        @import '@/assets/variables.less';
        `
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@views': path.resolve(__dirname, './src/views'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@api': path.resolve(__dirname, './src/api'),
      '@config': path.resolve(__dirname, './src/config'),
      '@router': path.resolve(__dirname, './src/router'),
      icepro: path.resolve(__dirname, './node_modules/icepro')
    },
    preserveSymlinks: true,
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  optimizeDeps: {
    include: ['icepro']
  },
  server: {
    port: 5173,
    hmr: {
      overlay: false, // 禁用错误遮罩层
      protocol: 'ws', // 使用 WebSocket 协议
      timeout: 5000 // 增加超时时间
    },
    watch: {
      usePolling: true, // 使用轮询监听文件变化
      interval: 100, // 轮询间隔
      useFsEvents: false // 禁用 fsevents
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite(path) {
          return path.replace(/^\/api/, '')
        }
      }
    }
  }
})
