import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import requireTransform from 'vite-plugin-require-transform'


// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        }
    },
    plugins: [
        vue(),
        requireTransform({
            fileRegex: /.js$|.vue$/
        }),
    ],
    server: {
        proxy: {
            // 正则表达式写法
            '/': {
                ws: false,
                // target: "http://icestone.top:8090",
                target: "http://localhost:89",
                changeOrigin: true,
                pathRewrite: {
                    '^/': '/'
                }
            }
        }
    }
})
