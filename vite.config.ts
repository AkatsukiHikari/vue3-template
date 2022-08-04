import { defineConfig , loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import { resolve } from 'path'  
import Layouts from 'vite-plugin-vue-layouts'
import { fstat , readFileSync } from 'fs'
const path = require("path")


function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

const env = loadEnv("development", __dirname);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      Pages({
        syncIndex: false
      }),
      Layouts({
        defaultLayout:"index"
      })
  ],

  server:{
    // open: true,
    // https: {
    //   cert: readFileSync(path.join(__dirname, 'src/ssl/1_mp.kunjuee.com_bundle.crt')),
    //   key: readFileSync(path.join(__dirname , 'src/ssl/2_mp.kunjuee.com.key') )
    // },
    proxy:{
      '^/userinfo': {
        target: env.VITE_API_CLOUD,
        changeOrigin: true,
        rewrite: (path) => path.replace('/userinfo', '/'),
        secure: false,
      },
      '^/api': {
        target: env.VITE_API_REST,
        changeOrigin: true,
        rewrite: (path) => path.replace('/api', '/'),
        secure: false,
      },
      '^/fq': {
        target: env.VITE_QUERY_REST,
        changeOrigin: true,
        rewrite: (path) => path.replace('/fq', '/'),
        secure: false,
      },
      '^/auth': {
        target: env.VITE_AUTH_REST,
        changeOrigin: true,
        rewrite: (path) => path.replace('/auth', '/'),
        secure: false,
      },
    }
  },  

  resolve:{
    alias: [
      {
        find: /\/#\//,
        replacement: pathResolve('types') + '/',
      },
      {
        find: '@',
        replacement: pathResolve('src') + '/',
      }
    ]
  },

  build:{
    target: 'modules',
    assetsDir: 'assets', //相对于build.outDir而言
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    minify: 'esbuild',
    sourcemap: false,
    polyfillDynamicImport: true,
  }
})
