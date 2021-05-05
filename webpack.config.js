// module resolver for intellij IDEs => Do not erase it
const path = require('path')

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './components'),
      'libs': path.resolve(__dirname, './libs')
    }
  }
}
