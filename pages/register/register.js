// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  register(e){
    let user = e.detail.value
    console.log(user)
    if(!user.phone){
      wx.showToast({
        title: '请输入手机号',
      })
      return
    }
    if(!user.password){
      wx.showToast({
        title: '请输入密码',
      })
      return
    }
    if(!user.nickName){
      wx.showToast({
        title: '请输入昵称',
      })
      return
    }

    wx.cloud.database().collection('user').add({
      data:{
        _id:user.phone,
        phone:user.phone,
        password:user.password,
        nickName:user.nickName,
        avatarUrl:'/image/BanJiu.jpg'
      }
    }).then(res =>{
      console.log('注册成功',res)
      wx.showToast({
        title: '注册成功',
      })
      wx.navigateBack({
        delta:0,
      })
    }).catch(res =>{
      console.log('注册失败',res)
      wx.showToast({
        icon:'error',
        title: '手机号已注册',
      })
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})