import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// 自动导入所有TSX组件
const modules = import.meta.glob('../views/**/*.tsx')

// 自动生成路由配置
function generateRoutes() {
  const routes: RouteRecordRaw[] = []

  for (const path in modules) {
    // 获取组件名称
    const componentName = path
      .replace('../views/', '')
      .replace('.tsx', '')
      .toLowerCase()

    // 处理路由路径
    let routePath = componentName
    if (routePath.includes('/index')) {
      routePath = routePath.replace('/index', '')
    }
    if (routePath === 'index') {
      routePath = ''
    }

    // 创建路由配置
    const route: RouteRecordRaw = {
      path: routePath ? `/${routePath}` : '/',
      name: componentName.replace('/', '-'),
      component: modules[path],
      // 如果是目录下的index.tsx，设置为父路由
      children: []
    }

    routes.push(route)
  }

  // 按路径长度排序，确保父路由在子路由前面
  routes.sort((a, b) => a.path.length - b.path.length)
  return routes
}

const router = createRouter({
  history: createWebHistory(),
  routes: generateRoutes()
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 这里可以添加路由守卫逻辑，比如权限验证等
  next()
})

export default router
