
angular.module("studentApp").controller("listCtrl",fnListCtrl);

//List Students Controller
//sharedData service to get the List of user data
//data key data after resolve
function fnListCtrl($scope,$location,sharedData,data){
  this.userData = [];

  this.noRowsPerPage = this.selectRows ? this.selectRows : 5;
  this.noButtonDisplay = 3;
  this.dataSearch = sharedData.getData();
  
  //Redirect to delete or edit when user select a record
  this.editDeleteRedirectFn = function(_id){
    $location.path('/editDelete/' + _id);
  };

  //Reset the user data
  this.clearUserData = function(data){
    this.userData = data;
  }
};
