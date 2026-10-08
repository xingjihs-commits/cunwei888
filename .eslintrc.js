/* eslint-disable */
/**
 * .eslintrc.js - ESLint 基础配置（Vue3 + uni-app）
 * 只做静态检查，不做格式化；规则以「能发现明显问题」为目标，样式类规则关闭。
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-essential'],
  globals: {
    uni: 'readonly',
    wx: 'readonly',
    getApp: 'readonly',
    getCurrentPages: 'readonly',
    plus: 'readonly',
    App: 'writable',
    Page: 'writable',
    Component: 'writable',
    getRegExp: 'readonly'
  },
  rules: {
    // 潜在问题降级为 warning，保证 lint 可运行、不阻断
    'no-unused-vars': 'warn',
    'no-undef': 'warn',
    'no-cond-assign': 'warn',
    'no-irregular-whitespace': 'off',
    // uni-app 条件编译（// #ifdef / // #ifndef）会让 eslint 误判为不可达代码
    'no-unreachable': 'off',
    // 允许空的 catch（项目里大量用于忽略非关键异常）
    'no-empty': ['warn', { allowEmptyCatch: true }],
    // Vue 模板中大量单文件页面，关闭强约束
    'vue/multi-word-component-names': 'off',
    'vue/no-v-html': 'off',
    'vue/require-default-prop': 'off',
    'vue/require-prop-types': 'off',
    'vue/no-reserved-component-names': 'off',
    // 项目有「父传 reactive form 给子组件直接读写」的既定模式，关闭该规则
    'vue/no-mutating-props': 'off',
    'vue/require-v-for-key': 'warn',
    'vue/no-unused-components': 'warn',
    'vue/no-unused-vars': 'warn'
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'unpackage/',
    'cloudfunctions/',
    '*.config.js',
    'scripts/'
  ]
}
