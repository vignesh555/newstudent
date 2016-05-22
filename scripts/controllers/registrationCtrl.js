angular.module("studentApp").controller("registrationCtrl",fnRegistrationCtrl);

//Regsitration Controller
function fnRegistrationCtrl($scope,$location,resourceEntry,sharedData,statesDropDownData){
    this.loadingFlagInternal = false;
    this.showRegistrationForm = true;
    this.register = {};
    this.allStates = statesDropDownData[0].states
    this.countries = statesDropDownData[0].countries;
    this.submitValidation = false;

    //Get the State corresponding to the Country Change
    this.countryChange = function(obj){
      this.states = this.allStates.filter(function (s) {
            return s.CountryId == obj.Id;
      });
      if(obj.CountryName == "India"){
        this.register.prefixVal = "+91-";
      }
      else
      {
        this.register.prefixVal = "+001-";
      }
    }

    //Save Registration
    this.registerFn = function(userForm){
      this.submitValidation = true;
      
      if(userForm.$valid)
      {
        this.loadingFlagInternal = true;
        this.loadingTextInternal = "Registration Saving Please Wait";
        this.showRegistrationForm = false;

          var registerObj = {};
              registerObj = angular.copy( this.register );

          registerObj.dob = sharedData.convertDateFormat( registerObj.dob );
          resourceEntry.save(registerObj, function(resp, headers){
              this.register = {};
              this.submitValidation = false;
              this.loadingFlagInternal = false;
              this.showRegistrationForm = true;
              $location.path('/list');
          },
          function(err){
              console.log(err);
          });
      }
    }
};




