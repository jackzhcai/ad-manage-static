import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import nestedRouter from './modules/nested'

// import tableRouter from './modules/table'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  // {
  //   path: '/documentation',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/documentation/index'),
  //       name: 'Documentation',
  //       meta: { title: 'Documentation', icon: 'documentation', affix: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/guide',
  //   component: Layout,
  //   redirect: '/guide/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/guide/index'),
  //       name: 'Guide',
  //       meta: { title: '引导页', icon: 'guide', noCache: true }
  //     }
  //   ]
  // },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  {
    path: '/supply',
    component: Layout,
    name: 'theme',
    meta: {
      title: '媒体管理',
      icon: 'example'
    },
    redirect: {
      name: 'SupplyList'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views-new/supply/list'),
        name: 'SupplyList',
        meta: {
          title: '媒体列表',
          icon: 'theme'
        }
      }
    ]
  },

  {
    path: '/slot',
    component: Layout,
    name: 'Slot',
    meta: {
      title: '广告位管理',
      icon: 'example'
    },
    redirect: {
      name: 'SlotList'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views-new/slot/list'),
        name: 'SlotList',
        meta: {
          title: '广告位列表',
          icon: 'list'
        }
      }
    ]
  },

  {
    path: '/third-part-ad',
    component: Layout,
    name: 'ThirdPartAd',
    meta: {
      title: '第三方广告管理',
      icon: 'user'
    },
    redirect: {
      name: 'ThirdPartAdList'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views-new/third-part-ad/list'),
        name: 'ThirdPartAdList',
        meta: {
          title: '第三方广告列表',
          icon: 'user'
        }
      }
    ]
  },
  {
    path: '/direct',
    component: Layout,
    name: 'Direct',
    meta: {
      title: '直客管理',
      icon: 'peoples'
    },
    redirect: {
      name: 'AdvertiserList'
    },
    children: [
      {
        path: 'advertiser/list',
        component: () => import('@/views-new/direct/advertiser-list'),
        name: 'AdvertiserList',
        meta: {
          title: '广告主列表'
        }
      },
      {
        path: 'ad/list',
        component: () => import('@/views-new/direct/ad-list'),
        name: 'AdList',
        meta: {
          title: '广告列表'
        }
      },
      {
        path: 'creative/list',
        component: () => import('@/views-new/direct/creative-list'),
        name: 'CreativeList',
        meta: {
          title: '创意列表'
        }
      }
    ]
  },
  {
    path: '/report',
    component: Layout,
    name: 'Report',
    meta: {
      title: '报表',
      icon: 'chart'
    },
    redirect: {
      name: 'ServeList'
    },
    children: [
      {
        path: 'serve',
        component: () => import('@/views-new/report/index'),
        name: 'ReportServe',
        meta: {
          title: '媒体端'
        },
        children: [
          {
            path: 'supply',
            component: () => import('@/views-new/report/serve/supply'),
            name: 'ReportServeSupply',
            meta: {
              title: '媒体'
            }
          },
          {
            path: 'slot',
            component: () => import('@/views-new/report/serve/slot'),
            name: 'ReportServeSlot',
            meta: {
              title: '广告位'
            }
          },
          {
            path: 'channel',
            component: () => import('@/views-new/report/serve/channel'),
            name: 'ReportServeChannel',
            meta: {
              title: '广告分布'
            }
          }
        ]
      }
      // {
      //   path: 'client',
      //   component: () => import('@/views-new/report/index'),
      //   name: 'ReportClient',
      //   meta: {
      //     title: '广告端'
      //   },
      //   children: [
      //     {
      //       path: 'test1',
      //       component: () => import('@/views-new/report/client/test'),
      //       name: 'ReportClientTest1',
      //       meta: {
      //         title: '测试1'
      //       }
      //     },
      //     {
      //       path: 'test2',
      //       component: () => import('@/views-new/report/client/test'),
      //       name: 'ReportClientTest2',
      //       meta: {
      //         title: '测试2'
      //       }
      //     }
      //   ]
      // }
    ]
  },

  {
    path: '/optimize',
    component: Layout,
    alwaysShow: true, // will always show the root menu
    name: 'Optimize',
    meta: {
      title: '优化',
      icon: 'nested'
    },
    redirect: {
      name: 'OptimizeAd'
    },
    children: [
      {
        path: 'ad',
        component: () => import('@/views-new/optimize/ad'),
        name: 'OptimizeAd',
        meta: {
          title: '广告优先级'
        }
      },
      {
        path: 'direct',
        component: () => import('@/views-new/optimize/direct'),
        name: 'OptimizeDirect',
        meta: {
          title: '直客广告优先级'
        }
      },
      {
        path: 'category',
        component: () => import('@/views-new/optimize/category'),
        name: 'OptimizeAd',
        meta: {
          title: '直客广告投放类别'
        }
      },
      {
        path: 'budget',
        component: () => import('@/views-new/optimize/budget'),
        name: 'OptimizeBudget',
        meta: {
          title: '直客广告预算分配'
        }
      }
    ]
  },

  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: '管理员',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      // {
      //   path: 'page',
      //   component: () => import('@/views-new/permission/page'),
      //   name: 'PagePermission',
      //   meta: {
      //     title: '页面权限',
      //     roles: ['admin'] // or you can only set roles in sub nav
      //   }
      // },
      // {
      //   path: 'directive',
      //   component: () => import('@/views-new/permission/directive'),
      //   name: 'DirectivePermission',
      //   meta: {
      //     title: '指令权限'
      //     // if do not set roles, means: this page does not require permission
      //   }
      // },
      {
        path: 'role',
        component: () => import('@/views-new/permission/role'),
        name: 'RolePermission',
        meta: {
          title: '管理员列表',
          roles: ['admin']
        }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,

  // tableRouter,

  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/icons/index'),
  //       name: 'Icons',
  //       meta: { title: '图标', icon: 'icon', noCache: true }
  //     }
  //   ]
  // },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/list',
  //   name: 'Example',
  //   meta: {
  //     title: 'Example',
  //     icon: 'example'
  //   },
  //   children: [
  //     {
  //       path: 'create',
  //       component: () => import('@/views/example/create'),
  //       name: 'CreateArticle',
  //       meta: { title: 'Create Article', icon: 'edit' }
  //     },
  //     {
  //       path: 'edit/:id(\\d+)',
  //       component: () => import('@/views/example/edit'),
  //       name: 'EditArticle',
  //       meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
  //       hidden: true
  //     },
  //     {
  //       path: 'list',
  //       component: () => import('@/views/example/list'),
  //       name: 'ArticleList',
  //       meta: { title: 'Article List', icon: 'list' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/tab',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/tab/index'),
  //       name: 'Tab',
  //       meta: { title: 'Tab', icon: 'tab' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'ErrorPages',
  //   meta: {
  //     title: 'Error Pages',
  //     icon: '404'
  //   },
  //   children: [
  //     {
  //       path: '401',
  //       component: () => import('@/views/error-page/401'),
  //       name: 'Page401',
  //       meta: { title: '401', noCache: true }
  //     },
  //     {
  //       path: '404',
  //       component: () => import('@/views/error-page/404'),
  //       name: 'Page404',
  //       meta: { title: '404', noCache: true }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/error-log',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'log',
  //       component: () => import('@/views/error-log/index'),
  //       name: 'ErrorLog',
  //       meta: { title: 'Error Log', icon: 'bug' }
  //     }
  //   ]
  // },

  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/export-excel',
  //   name: 'Excel',
  //   meta: {
  //     title: 'Excel',
  //     icon: 'excel'
  //   },
  //   children: [
  //     {
  //       path: 'export-excel',
  //       component: () => import('@/views/excel/export-excel'),
  //       name: 'ExportExcel',
  //       meta: { title: 'Export Excel' }
  //     },
  //     {
  //       path: 'export-selected-excel',
  //       component: () => import('@/views/excel/select-excel'),
  //       name: 'SelectExcel',
  //       meta: { title: 'Export Selected' }
  //     },
  //     {
  //       path: 'export-merge-header',
  //       component: () => import('@/views/excel/merge-header'),
  //       name: 'MergeHeader',
  //       meta: { title: 'Merge Header' }
  //     },
  //     {
  //       path: 'upload-excel',
  //       component: () => import('@/views/excel/upload-excel'),
  //       name: 'UploadExcel',
  //       meta: { title: 'Upload Excel' }
  //     }
  //   ]
  // },

  // {
  //   path: '/zip',
  //   component: Layout,
  //   redirect: '/zip/download',
  //   alwaysShow: true,
  //   name: 'Zip',
  //   meta: { title: 'Zip', icon: 'zip' },
  //   children: [
  //     {
  //       path: 'download',
  //       component: () => import('@/views/zip/index'),
  //       name: 'ExportZip',
  //       meta: { title: 'Export Zip' }
  //     }
  //   ]
  // },

  // {
  //   path: '/pdf',
  //   component: Layout,
  //   redirect: '/pdf/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/pdf/index'),
  //       name: 'PDF',
  //       meta: { title: 'PDF', icon: 'pdf' }
  //     }
  //   ]
  // },
  // {
  //   path: '/pdf/download',
  //   component: () => import('@/views/pdf/download'),
  //   hidden: true
  // },

  // {
  //   path: '/theme',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/theme/index'),
  //       name: 'Theme',
  //       meta: { title: 'Theme', icon: 'theme' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/clipboard/index'),
  //       name: 'ClipboardDemo',
  //       meta: { title: 'Clipboard', icon: 'clipboard' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/PanJiaChen/vue-element-admin',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
