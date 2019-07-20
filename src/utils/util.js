const Url = require('./Url.js')
exports.returnHost = () => (
  Url.host === 'http://localhost:3000' ? '<测试线>' : '<正式线>'
)
exports.showToast = (title, mask = false, time = 1500, icon = 'none') => {
  wx.showToast({
    title: title,
    icon: icon,
    duration: time,
    mask: mask
  })
}
