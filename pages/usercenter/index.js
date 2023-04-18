import { fetchUserCenter } from '../../services/usercenter/fetchUsercenter';
import Toast from 'tdesign-miniprogram/toast/index';

const app = getApp()

Page({
  data: {
    user:{},

  },

  onLoad() {
    this.getVersionInfo();
    let user = wx.getStorageSync('user',user)
    if(user != null){
      this.setData({
        user:user,
      })
    }
    
  },

  userInfo(){
    wx.navigateTo({
      url: '/pages/user-info/user-info',
    })
  },

  onShow() {
    this.getTabBar().init();
    
    let user = wx.getStorageSync('user')
    this.setData({
      user:user,
    })
  },
  logOut(){
    this.setData({
      user:'',
    })
    wx.setStorageSync('user',null)
  },

  login(){

    wx.navigateTo({
      url: '/pages/login/login',
    })
    
    //只能在后端调用https://api.weixin.qq.com相关的请求不然appsecret会泄露
    // wx.login({
    //   success: (res) => {
    //     if(res.code){
    //       wx.request({
    //         url: 'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code',
    //         method:'GET',
    //         data:{
    //           appid:'',
    //           secret:'',
    //           js_code:res.code,
    //           grant_type:'authorization_code'
    //         }
    //       })
    //     }
    //   },
    // })
    

    //  这个接口因为安全问题废弃了
    // var that = this
    // wx.getUserProfile({
    //   desc: '用于登录',
    //   success(res){
    //     console.log(res)
    //     let user = res.userInfo
    //     //缓存
    //     wx.setStorageSync('user', user)
    //     app.globalData.userInfo = user
        
    //     that.setData({
    //       userInfo:user,
    //       isLogin:true,
    //     })

    //     //添加到数据库
    //     //if(wx.cloud().collection)
    //     wx.cloud.database().collection('login_users').add({
    //       data:{
    //         avatarUrl:user.avatarUrl,
    //         nickName:user.nickName
    //       },
    //       success(res){
    //         console.log(res)
    //         wx.showToast({
    //           title: '登录成功',
    //         })
    //       }
    //     })

    //   }
    // })
  },

  


  getVersionInfo() {
    const versionInfo = wx.getAccountInfoSync();
    const { version, envVersion = __wxConfig } = versionInfo.miniProgram;
    this.setData({
      versionNo: envVersion === 'release' ? version : envVersion,
    });
  },
});
