const Url = require('./Url.js')
exports.returnHost = () => (
  Url.host === 'http://localhost:3000' ? '<测试线>' : '<正式线>'
)
