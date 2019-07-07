let model = require('./model')
const KEY = 'USER_MODEL'
const LocalStorage = {
  setStorage () {
    wx.setStorage({
      key: KEY,
      data: model
    })
  },
  asyncLoadStorageUserData () {
    return wx.getStorageSync(KEY)
  },
  clearStorageUserData (cb) {
    const self = this
    wx.removeStorage({
      key: KEY,
      success: (result) => {
        self.clearUserInfo()
        cb(result)
      }
    })
  },
  clearUserInfo (obj) {
    obj.isLogin = false
    obj.token = ''
    obj.nickName = ''
    obj.openId = ''
    obj.country = ''
    obj.sex = ''
    obj.province = ''
    obj.userId = ''
  },
  asyncStorageUserData (callback = {}) {
    wx.setStorage({
      key: KEY,
      data: model
    })
  }
}
module.exports = LocalStorage
