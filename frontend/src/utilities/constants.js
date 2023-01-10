
 class constants {
  static getConstant(){
    const factoryConstant = {
    url: 'http://127.0.0.1:3500',    //Production:'http://124.29.205.234:3500','http://192.168.15.5:4000','http://192.168.70.107:4000' Testing:'http://192.168.1.78:4000' Noshan:'http://192.168.1.97:4000' Aamir:'http://192.168.1.169:4000'
    reportUrl: 'http://127.0.0.1', //Production:'http://sina_win_server/Sina',http://admin-pc:88/ReportServer Testing:'http://finsrv01/ReportServer_SQL2014'
    reportPath: '/sysrep',  //Production:'/SINA_Web' ,/PAF_HIMS
         };

  return factoryConstant;
}
}

export default (constants);