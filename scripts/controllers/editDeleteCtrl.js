angular.module("studentApp").controller("editDeleteCtrl",fnEditDeleteCtrl);


function fnEditDeleteCtrl($scope,$routeParams,$location,data,resourceEntry,statesDropDownData,sharedData){

  //On Change country get the corresponding state list
  this.countryChange = function(obj){
    this.states = this.allStates.filter(function (objCountry) {
          return objCountry.CountryId == obj.Id;
    });
  }

  //Update data
  this.updateRegister = function(register){
    
    var params = angular.copy(this.editRegister); 
        params.dob = sharedData.convertDateFormat( params.dob );

    resourceEntry.update({'id':$routeParams.paramId},params, 
      function(resp, headers){
        $location.path('/list');
      },
      function(err){
        console.log(err);
    });

  };
  
  //Delete the selected data
  this.deleteRegister = function(register){
    resourceEntry.delete({'id':$routeParams.paramId}, 
      function(resp, headers){
        $location.path('/list');
      },
      function(err){
        console.log(err);
      });
  };

  //Populate the edit data
  this.loadEditData = function(){
    this.allStates = statesDropDownData[0].states;
    this.countries = statesDropDownData[0].countries;


    data.dob = data.dob !== "" ? new Date(data.dob) : "" ;
    this.editRegister = data;
    this.selectCountryDropdown();
    
  }

  //To load the pre selection of the country
  this.selectCountryDropdown = function(){
    var selectedCountryObj = {};
    angular.forEach(this.countries, function(value, key) {
      if(value.Id === data.country.Id){
          selectedCountryObj = value;
      }
    });
    this.editRegister.country = selectedCountryObj;
    this.countryChange(selectedCountryObj);
    this.selectStateDropdown(data);
  }

  //To load preselection of state
  this.selectStateDropdown = function(){
    var selectedStateObj = {};
    angular.forEach(this.states, function(value, key) {
      if(value.Id === data.state.Id){
          selectedStateObj = value;
      }
    });
    this.editRegister.state = selectedStateObj;
  }

  this.loadEditData();

};