const model = require('./model')
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
  asyncStorageUserData (callback = {}) {
    wx.setStorage({
      key: KEY,
      data: model
    })
  }
}
module.exports = LocalStorage
