
(function(){
    //setting up the module
    angular.module("studentApp",['ngRoute','ngResource']);
    
    //get the module config with config and run
    angular.module("studentApp").config(config);
    angular.module("studentApp").run(runFn);

    //Get the List of States and Countries During Registration
    //Get the List of Students and Current Student for Edit
    function config($routeProvider){
          $routeProvider.
              when('/register', {
                templateUrl: 'scripts/partials/registration.html',
                controller: 'registrationCtrl',
                controllerAs: 'registrationObj',
                resolve : {
                  'statesDropDownData' : getStatesDropDownData
                }
              }).
              when('/list', {
                templateUrl: 'scripts/partials/lists.html',
                controller: 'listCtrl',
                controllerAs: 'listObj',
                 resolve: {
                        'data': getStudentRecords
                }
              }).
              when('/editDelete/:paramId', {
                templateUrl: 'scripts/partials/editDelete.html',
                controller: 'editDeleteCtrl',
                controllerAs: 'editDeleteObj',
                resolve: {
                        'data': getStudentRecord,
                        'statesDropDownData' : getStatesDropDownData
                }
              }).
              otherwise({
                redirectTo: '/register'
              });

    }

    //Run Function for Loading Mask during routing
    function runFn($rootScope,$location,studentConstants,$templateCache){

      $rootScope.$on('$routeChangeStart', function() {
          var loadingText = "";
         
          switch ($location.url()) {
            case "/register":
                loadingText = studentConstants.loadingRegister;
                break;
            case "/list":
                loadingText = studentConstants.loadingStudentList;
                break;
            default: 
                loadingText = studentConstants.loadingStudentEdit;
          };

          $rootScope.loadingText = loadingText;
          $rootScope.loadingFlag = true;
      });
    }

    //Get the List of Students
    function getStudentRecords(resourceEntry,$q,sharedData) {
      var deferred = $q.defer();
      var student = resourceEntry.query({},function(response) {  
        sharedData.setData(response);
        return deferred.resolve(response);
      });
      return deferred.promise;
    }

    //Get a single Student List
    function getStudentRecord(resourceEntry,$q,$route) {
      var deferred = $q.defer();
      var student = resourceEntry.get({'id':$route.current.params.paramId},function(response) {  
        console.log(response);
        return deferred.resolve(response);
      });
      return deferred.promise;
    }

    //Get the Country and State Dropdown list
    function getStatesDropDownData(resourceDropdown,$q){
      var deferred = $q.defer();
      var student = resourceDropdown.query({},function(response) {  
        console.log(response);
        return deferred.resolve(response);
      });
      return deferred.promise;
    }

})();





