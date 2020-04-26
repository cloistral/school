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
      if (param.success) {
        param.success(res.data)
      }
    },
    fail: function (err) {
      if (param.fail) {
        param.fail(err)
      }
    },
    complete: function (res) {
        wx.hideLoading()
    },
  })
}

module.exports = request