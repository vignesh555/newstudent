
//registrationUrl --> Registration Rest Api
//dropdownUrl --> Dropdown Rest Api
//loadingRegister --> Text for the loading mask in the Register
//loadingStudentList --> Text for the loading mask in the Student List
//loadingStudentEdit --> Text for the loading mask in the Edit Student


angular.module("studentApp")
	.constant("studentConstants",{
		"registrationUrl" : "https://api.mongolab.com/api/1/databases/angulardb1/collections/registration/:id?apiKey=HAv8Jy5YBlUoTTko_GP4gOVcKggMnee0",
		"dropdownUrl" : "https://api.mongolab.com/api/1/databases/angulardb1/collections/states?apiKey=HAv8Jy5YBlUoTTko_GP4gOVcKggMnee0",
		"loadingRegister" : "Loading Registration Form...",
		"loadingStudentList" : "Loading List of Student...",
		"loadingStudentEdit" : "Getting a student data for edit..."
});