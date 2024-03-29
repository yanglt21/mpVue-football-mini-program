const WXFIle = {
  saveImage: function (count = 1, sizeType = ['original', 'compressed'], sourceType = ['album', 'camera']) {
    console.log('测试')
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count: count,
        sizeType: sizeType,
        sourceType: sourceType,
        success: (result) => {
          resolve(result)
        },
        fail: (err) => {
          reject(err)
        },
        complete: () => {}
      })
    })
  },
  uploadFile: function (url, filePath, name, formData = {}) {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: url,
        filePath: filePath,
        name: name,
        formData: formData,
        success: (result) => {
          resolve(result)
        },
        fail: (err) => {
          reject(err)
        },
        complete: () => {}
      })
    })
  }
}
export default WXFIle
