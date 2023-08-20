import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'index',
        meta: { title: "首页" },
        component: () => import('@/views/Index.vue')
    },
    {
        path: '/login',
        name: 'login',
        meta: { title: "登录" },
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        meta: { title: "注册" },
        component: () => import('../views/Register.vue')
    },
    {
        path: '/read',
        name: 'read',
        children: [
            {
                path: '/read',
                name: 'readIndex',
                meta: { title: "阅读文章" },
                component: () => import('@/views/Read.vue')
            },
            {
                path: '/read/readTag',
                name: "ReadTag",
                meta: { title: "关于此标签的数据" },
                component: () => import('@/components/read/ReadTag.vue')
            }
        ],
    },
    {
        path: '/user',
        name: 'user',
        meta: { title: "用户" },
        children: [
            {
                path: '/user/',
                name: 'user',
                meta: { title: "用户" },
                component: () => import('../views/User.vue'),
            },
            {
                path: '/user/headImg',
                name: 'headImg',
                meta: { title: "头图" },
                component: () => import('@/components/user/HeadImg.vue'),
            },
            {
                path: '/user/postedComments',
                name: 'postedComments',
                meta: { title: "已发布评论" },
                component: () => import('@/components/user/PostedComments.vue'),
            },
            {
                path: '/user/about',
                name: 'about',
                meta: { title: "关于该用户" },
                component: () => import('@/components/user/About.vue'),
            },
        ],
    },
    {
        path: '/edit',
        name: 'edit',
        children: [
            {
                path: '/edit/vMdEditor',
                name: 'vMdEditor',
                meta: { title: "编辑文章-v-md-editor" },
                component: () => import('@/components/edit/Vedit.vue')
            },
        ],
    },
    {
        path: '/noteList',
        name: 'noteList',
        meta: { title: "笔记列表" },
        component: () => import('@/components/note/NoteList.vue')
    },
    {
        path: '/myselfHistory',
        name: 'myselfHistory',
        meta: { title: "历史阅读记录" },
        component: () => import('@/components/user/MyselfHistory.vue')
    },
    {
        path: '/searchHistory',
        name: 'searchHistory',
        meta: { title: "历史搜索记录" },
        component: () => import('@/components/user/SearchHistory.vue')
    },
    {
        path: '/userDetail',
        name: 'userDetail',
        meta: { title: "用户详情" },
        component: () => import('@/components/user/UserDetail.vue')
    },
    {
        path: '/editUser',
        name: 'editUser',
        meta: { title: "编辑信息" },
        component: () => import('@/components/user/EditUser.vue')
    },
    {
        path: '/codeClips',
        name: 'codeClips',
        meta: { title: "代码片段" },
        component: () => import('@/components/code/CodeIndex.vue')
    },
    {
        path: '/new',
        children: [
            {
                path: '/new/',
                name: "Index",
                meta: { title: "新建" },
                component: () => import('@/components/new/Index.vue')
            },
            {
                path: '/new/code/',
                name: "CodeIndex",
                component: () => import('@/components/code/CodeIndex.vue')
            },
            {
                path: '/new/blog',
                name: "markdown",
                meta: { title: "编辑文章" },
                component: () => import('@/components/edit/Vedit.vue')
            }
        ],
    },
    {
        path: '/code',
        name: 'code',
        children: [
            {
                path: '/code/codeClips',
                name: "CodeIndex",
                component: () => import('@/components/code/CodeIndex.vue')
            },
            {
                path: '/code/detail',
                name: "Detail",
                meta: { title: "code detail" },
                component: () => import('@/components/code/Detail.vue')
            }
        ],
    },
    {
        path: '/friend',
        name: 'friend',
        children: [
            {
                path: '/friend/links',
                name: "links",
                component: () => import('@/components/friend/Links.vue')
            },
        ],
    },
    {
        path: '/admin',
        name: 'admin',
        children: [
            {
                path: '/admin/',
                name: "adminIndex",
                meta: { title: "admin" },
                component: () => import('@/views/Admin.vue')
            },
            {
                path: '/admin/log',
                name: "Log",
                meta: { title: "log" },
                component: () => import('@/components/admin/Log.vue')
            },
            {
                path: '/admin/allMarkdown',
                name: "AllMarkdown",
                meta: { title: "操作所有文章" },
                component: () => import('@/components/admin/AllMarkdown.vue')
            },
        ],
    },
    {
        path: "/test",
        name: 'test',
        meta: {
            title: 'test',
        },
        component: () => import('@/views/Test.vue')
    },
    {
        path: '/404',
        name: 'NotFound',
        meta: {
            title: 'Page not found',
        },
        component: () => import('@/views/NotFound.vue')
    },
    {
        path: '/:pathMatch(.*)',
        redirect: '/404',
        hidden: true
    }
]

// @date 2023/5/3 , @author icestone
// 设置路由模式
const router = createRouter({
    history: createWebHashHistory(),
    // mode: 'history',
    // base: '/',
    routes
})

/**
 * @Description:
 * @author icestone
 * @date 2023/5/3
 * 设置导航守卫
 */
router.beforeEach((to, from, next) => {
    // @date 2023/5/5 , @author icestone
    // 判断是否有标题
    if (to.meta.title) {
        document.title = to.meta.title
    }
    let nextRoute = ['editUser', 'user', 'markdown', 'editMarkdown', 'adminIndex', 'test']
    // 是否是登录中
    let userInfo = JSON.stringify(localStorage.getItem('userInfo'))
    // 当前进入的页面是不是需要验证的页面
    if (nextRoute.indexOf(to.name) >= 0) {
        if (JSON.stringify(userInfo).length < 10) {
            router.push('/login')
        }
    }
    next()
})

export default router
