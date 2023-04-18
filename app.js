import updateManager from './common/updateManager';

App({
  onLaunch: function () {
    
    wx.cloud.init({
      env: 'cloud1-6gzjo01d1acf2284',
     traceUser: true,  //追踪用户
   });
  },

  onShow: function () {
    updateManager();
  },

  globalData:{
    userInfo:null,
    
  }
});
