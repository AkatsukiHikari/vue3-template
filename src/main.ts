import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import { setupDirectives } from '@/plugins/directives'
import { createRouterGuards , generatedMenus } from '@/router'
import mitt from 'mitt'

import App from './App.vue'
import "./index.css"

// 默认路由及布局
import { RedirectRoute } from '@/router/base'
import { createRouter , createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'


// @ts-ignore
const routes = setupLayouts( generatedRoutes );


const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

// 数据持久化
const pinia = createPinia();
pinia.use( piniaPersist );

const app:any = createApp(App);

app.use(router)

app.use(pinia)
setupDirectives( app );

app.mount('#app');

createRouterGuards( router )

generatedMenus( );