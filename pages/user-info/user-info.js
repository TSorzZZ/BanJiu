// pages/user-info/user-info.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{},
    sex:['男','女'],
    idx:0,
    date: '2023-05-01',
  },

  onChooseAvatar(e) {
    console.log(e.detail)
    let user = wx.getStorageSync('user',user);
    user.avatarUrl = e.detail
    this.setData({
      user:user,
    })
    wx.setStorageSync('user',user);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let user = wx.getStorageSync('user',user)
    if(user != null){
      this.setData({
        user:user,
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  bindPickerChange(e){
    this.setData({
      idx: e.detail.value
    })
  },

  bindDateChange: function(e) {
    console.log('picker选择改变', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    let user = wx.getStorageSync('user',user)
    if(user != null){
      this.setData({
        user:user,
      })
    }
  },

  change(e){
    let new_user = e.detail.value
    let user = wx.getStorageSync('user',user)
    console.log('storage',user)

   //判断逻辑没有补全   修改手机号后现在的主键_id不会改变，虽然登录还是靠判断phone,有点小问题
    let tmp = wx.cloud.database().collection('user').where({phone:user.phone}).update({
      data:{
        phone:new_user.phone==""?user.phone:new_user.phone,
        password:new_user.password==""?user.password:new_user.password,
        nickName:new_user.nickName==""?user.nickName:new_user.nickName,
        trueName:new_user.trueName==""?user.trueName:new_user.trueName,
        sex:new_user.sex,
        data:new_user.date,
        school:new_user.school==""?user.school:new_user.school,
        major:new_user.major==""?user.major:new_user.major,

      }
    })
    
    wx.cloud.database().collection('user').where({phone:new_user.phone==""?user.phone:new_user.phone}).get().then(res =>{
      console.log('333',res.data[0])
      wx.setStorageSync('user',res.data[0])
      wx.showToast({
        title: '修改成功',
      })
      wx.navigateBack({
        delta:0,
      })
    })

    // wx.cloud.database().collection('user').where({
    //   data:{
    //     _id:user.phone,
    //     phone:user.phone,
    //     password:user.password,
    //     nickName:user.nickName,
    //     avatarUrl:'/image/BanJiu.jpg'
    //   }
    // }).then(res =>{
    //   console.log('注册成功',res)
    //   wx.showToast({
    //     title: '注册成功',
    //   })
    //   wx.navigateBack({
    //     delta:0,
    //   })
    // }).catch(res =>{
    //   console.log('注册失败',res)
    //   wx.showToast({
    //     icon:'error',
    //     title: '手机号已注册',
    //   })
    // })

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