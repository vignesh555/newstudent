//Store the registration data and the date time conversion
angular.module("studentApp").service("sharedData",function($resource){
    this.registerData = [];

    this.setData = function(registerObject){
      this.registerData = registerObject;
    }

    this.reAssignData = function(registerArray){
      this.registerData = registerArray;
    }

    this.getData = function(registerArray){
      return this.registerData;
    }

    this.convertDateFormat = function(date){
      var todayTime = new Date( date );
      var month = todayTime.getMonth() + 1;
      var day = todayTime .getDate();
      var year = todayTime .getFullYear();
      return month + "/" + day + "/" + year;
    }
})
//Regsitration Resource Entry
.factory('resourceEntry', function($resource,studentConstants) {
  var actions = { 
    'get':    {method:'GET'},
    'save':   {method:'POST'},
    'query':  {method:'GET', isArray:true},
    'update': {method:'PUT'},
    'delete': {method:'DELETE'} 
  };
  return $resource(studentConstants.registrationUrl,{id:'@id'},actions);
})
//Dropdown Resource Entry
.factory('resourceDropdown', function($resource,studentConstants) {
  return $resource(studentConstants.dropdownUrl);
});
