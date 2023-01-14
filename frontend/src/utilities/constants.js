class constants {
  static getConstant(){

    const startingip = 'http://192.168.56.1:5000/'
    const factoryConstant = {
<<<<<<< HEAD
    url: 'http://192.168.56.1:5000/',    //Production:'http://124.29.205.234:3500','http://192.168.15.5:4000','http://192.168.70.107:4000' Testing:'http://192.168.1.78:4000' Noshan:'http://192.168.1.97:4000' Aamir:'http://192.168.1.169:4000'
    empList:'http://192.168.56.1:5000/api/itdept/employee',
    empView:'http://192.168.56.1:5000/api/itdept/employee/details',
    empAdd:'http://192.168.56.1:5000/api/itdept/employee',
    login: 'http://192.168.56.1:5000/api/login',
    logList: 'http://192.168.56.1:5000/api/logistics',
    taskList:'http://192.168.56.1:5000/api//itdept/task',
   // Pen_status:'pending',
    reportUrl: 'http://192.168.56.1:5000/', //Production:'http://sina_win_server/Sina',http://admin-pc:88/ReportServer Testing:'http://finsrv01/ReportServer_SQL2014'
    reportPath: '/sysrep',  //Production:'/SINA_Web' ,/PAF_HIMS
         };
=======
    url: startingip,    //Production:'http://124.29.205.234:3500/%27,%27http://192.168.15.5:4000%27,%27http://192.168.70.107:4000' Testing:'http://192.168.1.78:4000/' Noshan:'http://192.168.1.97:4000/' Aamir:'http://192.168.1.169:4000/'
    empList: startingip + 'api/itdept/employee',
    empView: startingip + 'api/itdept/employee/details',
    empAdd: startingip + 'api/itdept/employee',
    login: startingip + 'api/login',
    logList: startingip + 'api/logistics',
    reportUrl: startingip, //Production:'http://sina_win_server/Sina%27,http://admin-pc:88/ReportServer Testing:'http://finsrv01/ReportServer_SQL2014'
    reportPath: '/sysrep',   //Production:'/SINA_Web' ,/PAF_HIMS
    };
>>>>>>> f6cf5b182558b06d13ab04db91a9c4921a5f8724

  return factoryConstant;
}
}

export default (constants);