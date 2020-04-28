const request = function (param) {
  let baseUrl = 'https://www.5itt.top'
  let header = {}
  if (param.method == 'post') {
    header = { "Content-Type": "application/x-www-form-urlencoded" }
  }
  wx.showLoading({
      title: '加载中...',
  })
  wx.request({
    url: baseUrl + param.url,
    data: param.data ? param.data : {},
    header: header,
    method: param.method,
    dataType: 'json',
    success: function (res) {
      wx.hideLoading()
      if (param.success) {
        param.success(res.data)
      }
    },
    fail: function (err) {
      wx.hideLoading()
      if (param.fail) {
        param.fail(err)
      }
    },
  })
}

module.exports = request