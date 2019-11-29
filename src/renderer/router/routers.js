// const Main = resolve => require.ensure([], () => resolve(require('@/components/main/index')) )
const Bg = resolve => require.ensure([], () => resolve(require('@/components/bg/index')) )
const Content = resolve => require.ensure([], () => resolve(require('@/components/content/index')) )
const Account = resolve => require.ensure([], () => resolve(require('@/components/account/index')) )
const Receive = resolve => require.ensure([], () => resolve(require('@/components/account/receive')) )

export default [
  {
    path: '/',
    component: Bg,
    meta: {
      notCache: true
    },
    children: [
      {
        path: '/',
        meta: {
          title: '首页',
          notCache: true
        },
        component: resolve => require.ensure([], () => resolve(require('@/pages/home/enter')) )
      }
    ]
  },
  {
    path: '/login',
    component: Bg,
    meta: {
      notCache: true
    },
    children: [
      {
        path: '/',
        meta: {
          title: '登陆',
          notCache: true
        },
        component: resolve => require.ensure([], () => resolve(require('@/pages/home/login')) )
      }
    ]
  },
  {
    path: '/register',
    component: Bg,
    meta: {
      notCache: true
    },
    children: [
      {
        path: '/',
        meta: {
          title: '注册',
          notCache: true
        },
        component: resolve => require.ensure([], () => resolve(require('@/pages/home/register')) )
      }
    ]
  },
  {
    path: '/createGroup',
    component: Content,
    meta: {
      notCache: true
    },
    children: [
      {
        path: '/',
        meta: {
          title: '创建组',
          notCache: true
        },
        component: resolve => require.ensure([], () => resolve(require('@/pages/group/createGroup')) )
      }
    ]
  },
  {
    path: '/gValid',
    component: Content,
    meta: {
      notCache: true
    },
    children: [
      {
        path: '/',
        meta: {
          title: '组确认',
          notCache: true
        },
        component: resolve => require.ensure([], () => resolve(require('@/pages/group/gValid')) )
      }
    ]
  },
  {
    path: '/person',
    component: Content,
    meta: {
      notCache: true
    },
    children: [
      {
        path: '/',
        meta: {
          title: '个人账户',
          notCache: true
        },
        component: resolve => require.ensure([], () => resolve(require('@/pages/person/index')) ),
        children: [
          {
            path: '/',
            meta: {
              title: '个人账户',
              notCache: true
            },
            component: Account,
          },
          {
            path: '/person/receive',
            meta: {
              title: '接收',
              notCache: true
            },
            component: Receive
          },
        ]
      }
    ]
  },
  {
    path: '/group',
    component: Content,
    meta: {
      notCache: true
    },
    children: [
      {
        path: '/',
        meta: {
          title: '共管账户',
          notCache: true
        },
        component: resolve => require.ensure([], () => resolve(require('@/pages/group/index')) ),
        children: [
          {
            path: '/',
            meta: {
              title: '共管账户',
              notCache: true
            },
            component: Account
          },
          {
            path: '/group/receive',
            meta: {
              title: '接收',
              notCache: true
            },
            component: Receive
          },
        ]
      },
    ]
  },
  {
    path: '/sendTxns',
    component: Content,
    meta: {
      notCache: true
    },
    children: [
      {
        path: '/',
        meta: {
          title: '交易',
          notCache: true
        },
        component: resolve => require.ensure([], () => resolve(require('@/pages/txns/index')) )
      }
    ]
  },
  {
    path: '/tValid',
    component: Content,
    meta: {
      notCache: true
    },
    children: [
      {
        path: '/',
        meta: {
          title: '交易',
          notCache: true
        },
        component: resolve => require.ensure([], () => resolve(require('@/pages/txns/tValid')) )
      }
    ]
  },
  {
    path: '/waitNews',
    component: Content,
    meta: {
      notCache: true
    },
    children: [
      {
        path: '/',
        meta: {
          title: '消息',
          notCache: true
        },
        component: resolve => require.ensure([], () => resolve(require('@/pages/news/index')) )
      }
    ]
  },
  {
    path: '/tNewsList',
    component: Content,
    meta: {
      notCache: true
    },
    children: [
      {
        path: '/',
        meta: {
          title: '消息',
          notCache: true
        },
        component: resolve => require.ensure([], () => resolve(require('@/pages/news/tNewsList')) )
      }
    ]
  },
  {
    path: '/gNewsList',
    component: Content,
    meta: {
      notCache: true
    },
    children: [
      {
        path: '/',
        meta: {
          title: '消息',
          notCache: true
        },
        component: resolve => require.ensure([], () => resolve(require('@/pages/news/gNewsList')) )
      }
    ]
  },
]