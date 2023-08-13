import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            vue: path.resolve('./node_modules/vue')
        }
    },
    css: {
        // 预处理器配置项
        preprocessorOptions: {
            less: {
                math: "always",
            },
        },
    },
    server: {
        proxy: {
            // 正则表达式写法
            '/api': {
                target: 'http://localhost:89',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
})
