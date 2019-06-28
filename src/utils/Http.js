const Http = {
  /**
   * get 方法
   */
  get: function (url, data, header) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        data: data,
        header: {
          'content-type': 'application/json'
        },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: (result) => {
          wx.hideLoading()
          resolve(result)
        },
        fail: (errResult) => {
          wx.hideLoading()
          reject(errResult)
        },
        complete: () => {
          wx.hideLoading()
        }
      })
    })
  },

  /**
   * post 方法
  */
  post: function (url, data, header) {
    return new Promise((resolve, reject) => {
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      wx.request({
        url: url,
        data: data,
        header: {'content-type': 'application/json'},
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: (result) => {
          resolve(result)
        },
        fail: (errResult) => {
          reject(errResult)
        },
        complete: () => {
          wx.hideLoading()
        }
      })
    })
  }
}
export default Http
