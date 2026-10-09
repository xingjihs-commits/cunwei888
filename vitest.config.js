import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // 测试文件位置
    include: ['tests/**/*.test.js'],
    // 环境
    environment: 'node',
    // 覆盖率
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: [
        'cloudfunctions/common/constants.js',
        'cloudfunctions/common/db.js',
        'cloudfunctions/common/securityLogic.js',
        'utils/format.js'
      ]
    }
  }
})
