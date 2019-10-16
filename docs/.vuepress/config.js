
// .vuepress/config.js
module.exports = {
  title: 'AnHyun',
  description: '风起于青萍之末，浪成于微澜之间。',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: '/logo.png' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: '/', // 这是部署到github相关的配置
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
  themeConfig: {
    nav:[ // 导航栏配置
      {text: '基础·自检', link: '/basics/' },
      {text: '进阶·架构', link: '/advance/'},
      {text: '求职·面试', link: '/interview/'},
      {text: 'github', link: 'https://github.com/AnHyun'},       
    ],
    sidebarDepth: 2,
    sidebar: {
    	'/basics/': [
    		'/basics/',
    		{
	            title: 'Javascript基础',
	            children: [

	            ]
	        },
	        {
	            title: 'HTML和CSS',
	            children: [

	            ]
	        },
	        {
	            title: '计算机基础',
	            children: [

	            ]
	        },
	        {
	            title: '数据结构和算法',
	            children: [

	            ]
	        },
	        {
	            title: '运行环境',
	            children: [

	            ]
	        },
	        {
	            title: '前端工程',
	            children: [

	            ]
	        },
	        {
	            title: '框架和类库',
	            children: [

	            ]
	        },
	        {
	            title: '项目和业务',
	            children: [

	            ]
	        },
	        // {
	        //     title: '综合',
	        //     children: [
	        //         '/basics/综合/【自检】前端知识清单',
	        //     ]
	        // },
    	],
    	'/advance/': [
    		'/advance/',
    		{
	            title: 'vueJs',
	            children: [

	            ]
	        },
	        {
	            title: 'ReactJs',
	            children: [

	            ]
	        },
	        {
	            title: 'NodeJs',
	            children: [

	            ]
	        },
	        {
	            title: '微信公众号',
	            children: [

	            ]
	        },
	        {
	            title: '前端安全',
	            children: [

	            ]
	        },
	        {
	            title: 'reactNative',
	            children: [

	            ]
	        },
	        {
	            title: '工程化',
	            children: [

	            ]
	        },
	        {
	            title: '小程序',
	            children: [

	            ]
	        },
	        {
	            title: '自动化测试',
	            children: [

	            ]
	        },
	        {
	            title: '性能优化',
	            children: [

	            ]
	        },
	        {
	            title: '数据结构和算法',
	            children: [

	            ]
	        },
	        {
	            title: '设计模式',
	            children: [

	            ]
	        },
    	],
    	'/interview/': [
    		'/interview/',
    		{
	            title: 'HTML和CSS',
	            children: [

	            ]
	        },
	        {
	            title: 'JS基础',
	            children: [

	            ]
	        },
	        {
	            title: '网络',
	            children: [

	            ]
	        },
	        {
	            title: '浏览器',
	            children: [

	            ]
	        },
	        {
	            title: '框架篇',
	            children: [

	            ]
	        },
	        {
	            title: '编程题',
	            children: [

	            ]
	        },
	        {
	            title: '设计模式',
	            children: [

	            ]
	        },
	        {
	            title: '工具',
	            children: [

	            ]
	        },
    	]
    },
  }
};