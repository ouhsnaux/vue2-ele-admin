const path = require('path');

module.exports = {
  title: '后台管理系统组件库',
  plugins: ['demo-container'],
  locales: {
    '/': {
      lang: 'zh-CN',
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './'),
      },
    },
  },
  themeConfig: {
    searchMaxSuggestions: 10,
    nextLinks: true,
    prevLinks: true,
    sidebar: [
      '/',
      {
        title: '基础组件',
        children: [
          'CustomTable',
          {
            title: '表单输入项',
            children: [
              '/form/NumberInput',
              '/form/SelectInput',
              '/form/CheckboxGroup',
              '/form/RadioGroup',
              '/form/DateInput',
              '/form/CascaderInput',
              // '/form/FileInput',
              '/form/DynamicInput',
              // '/form/FileInputEnhance',
              '/form/SelectInputAutoClean',
            ],
          },
          'CustomForm',
          'CustomFormUtils',
          'CustomDialog',
          'CustomDrawer',
          'CustomIcon',
          'IconTip',
        ],
      },
      {
        title: '复合组件',
        collapsable: false,
        children: [
          {
            title: 'ComplexTable',
            path: '/ComplexTable/',
            children: [
              { title: 'Query', path: 'ComplexTable/ComplexTableQuery' },
              { title: 'Content', path: 'ComplexTable/ComplexTableContent' },
            ],
          },
          'DialogWithForm',
          'DrawerWithForm',
          'DetailDialog',
          'DetailDrawer',
          'CRUD',
          // 'TableWithForm',
        ],
      },
    ],
  },
};
