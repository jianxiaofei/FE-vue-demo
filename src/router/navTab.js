export default [
  {
    index: 'home',
    title: '首页',
    icon: 'home'
  }, {
    index: 'es6',
    title: 'ES6',
    icon: 'icon-es6',
    isIconFont: true
  },
  {
    index: 'visualization',
    title: '可视化',
    icon: 'area-chart',
    sub: [
      {
        index: 'echarts',
        title: '百度echarts'
      },
      {
        index: 'v-charts',
        title: 'v-charts'
      },
      {
        index: 'antv',
        title: '阿里antv'
      }
    ]
  }, {
    index: 'HTML',
    title: 'HTML',
    icon: 'html5'
  },
  {
    index: 'CSS',
    title: 'CSS',
    icon: 'icon-css',
    isIconFont: true
  },
  {
    index: 'JavaScript',
    title: 'JavaScript',
    icon: 'icon-javaScript',
    isIconFont: true
  },
  {
    index: 'Canvas',
    title: 'Canvas',
    icon: 'icon-canvas',
    isIconFont: true
  },
  {
    index: 'about',
    title: '关于',
    icon: 'desktop'
  },
  {
    index: 'Navigation-two',
    title: 'Navigation two',
    icon: 'appstore',
    sub: [
      {
        index: 'option-3',
        title: 'option 3'
      },
      {
        index: 'option-4',
        title: 'option 4',
        sub: [
          {
            index: 'option-5',
            title: 'option 5'
          },
          {
            index: 'option-6',
            title: 'option 6'
          }
        ]
      }
    ]
  }
]
