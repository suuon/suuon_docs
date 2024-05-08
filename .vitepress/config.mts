import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "DRF+Vue 开发项目",
  description: "A VitePress Site",
  lang: "zh-cn",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'DRF', link: '/drf/' },
      { text: 'Vue', link: '/vue/' }
    ],

    sidebar: {
      '/drf/': [
        {
          text: 'Django',
          items: [
            { text: '简介', link: '/drf/' },
            { text: '开始配置纯净版Django', link: '/drf/getting-started' },
            { text: '路由', link: '/drf/router' },
            { text: '自定义Auth', link: '/drf/custom-auth' },
            { text: '权限-Permission', link: '/drf/permission' },
            { text: '限流-Throttle', link: '/drf/throttle' },
          ]
        },
      ],
      '/vue/': [
        {
          text: 'Vue',
          items: [
            { text: 'vue', link: '/vue/' },
          ]
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/suuon/' }
    ]
  }
})
