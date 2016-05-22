

angular.module("studentApp").directive("allDataPagination",fnAllDataPagination);


function fnAllDataPagination(){
	return{
		restrict : "E",
		transclude : true,
		scope : {
			noRowsPerPage : '@',
			pageContent : '@',
			noButtonDisplay : '@',
			clearUserData : '&'
		},
		templateUrl : "../scripts/partials/paginator.html",
		controller : function($scope){

		},
		link: function(scope, element, attr){

			scope.initalizeValues = function(){

				//Pagination Array Value Empty
				scope.pageArray = [];

				//Conversion of the Values to Numeric
				scope.noRowsPerPage = scope.selectRows ? scope.selectRows : Number(scope.noRowsPerPage);
				scope.noButtonDisplay = Number(scope.noButtonDisplay);

				//Parse the page content
				scope.pageContent = angular.isString(scope.pageContent) ? JSON.parse(scope.pageContent) : scope.pageContent;

				//Number of Pages according to the row content
				scope.noPages = Math.ceil(scope.pageContent.length / Number(scope.noRowsPerPage));

				//Default load of the pagination
				scope.defaultPageLoad();
			}

			scope.selectRowChanges = function(){
				scope.initalizeValues();
			}

			scope.defaultPageLoad = function(){
				if(scope.noPages > 1){
					var numPage = scope.noPages > scope.noButtonDisplay ? scope.noButtonDisplay : scope.noPages;
					scope.getNextPageList(1,numPage);
					scope.pageArray[0].active = true;
				}

				scope.firstPage = false;
				scope.lastPage = scope.noPages <= scope.noButtonDisplay ? false : true;

				scope.displayData(0);
			}

			scope.getNextPageList = function(_start,_end,_pagesCount){
				for(var count = _start; count <= _end; count++){
					var active = ((_pagesCount + 1) === count) ? true : false;
					scope.pageArray.push({
						"page" : count,
						"active" : active
					});
				}
			}

			scope.displayPages = function(pagesObj){
				//Median and next pages
				var median = parseInt(scope.noButtonDisplay / 2),
					starts = pagesObj.page - ((scope.noButtonDisplay % 2 === 0) ? (median -1) :  median),
					ends = pagesObj.page + median,
					pagesCount = pagesObj.page - 1;

				scope.pageContent = angular.isString(scope.pageContent) ? JSON.parse(scope.pageContent) : scope.pageContent;
				if( starts <= 0 ){
					starts = 1;
					ends = scope.pageContent.length < scope.noButtonDisplay ? scope.pageContent.length : scope.noButtonDisplay;
					scope.firstPage = false;
					scope.lastPage = scope.noPages <= scope.noButtonDisplay ? false : true;
				}else if( ends > scope.noPages ){
					starts = (scope.noPages - scope.noButtonDisplay)  + 1;
					ends = scope.noPages;
					scope.firstPage = scope.noPages <= scope.noButtonDisplay ? false : true;
					scope.lastPage = false;
				}else{
					scope.firstPage = scope.noPages <= scope.noButtonDisplay ? false : true;
					scope.lastPage = scope.noPages <= scope.noButtonDisplay ? false : true;
				}

				scope.activePages(starts,ends,pagesCount,pagesObj);
				return pagesCount;
			}

			scope.activePages = function(starts,ends,pagesCount,pagesObj){
				if(scope.noPages > scope.noButtonDisplay){
					scope.pageArray = [];
					scope.getNextPageList(starts,ends,pagesCount);	
				}else{
					angular.forEach(scope.pageArray, function(value, key) {
  						value.active = false;
					});
					pagesObj.active = true;
				}
				scope.displayData(pagesCount);
			}

			scope.displayData = function(pageNumber){
				var startCount = (pageNumber === 0 ? pageNumber : (pageNumber * scope.noRowsPerPage)),
					endCount = (Number(scope.noRowsPerPage) + startCount);

				endCount = endCount > scope.pageContent.length ? scope.pageContent.length : endCount;
				scope.pageContent = angular.isString(scope.pageContent) ? JSON.parse(scope.pageContent) : scope.pageContent;	

				var userData = [];
				for(var count = startCount; count < endCount; count++){
					userData.push(scope.pageContent[count]);
				}

				scope.clearUserData({ registerList: userData });
			};

			scope.goToFirstPage = function(){
				scope.displayPages({
					page : 1,
					active : true
				})
			}

			scope.goToLastPage = function(){
				scope.displayPages({
					page : scope.noPages,
					active : true
				})
			}

			scope.nextPage = function(){
				var pageNumber = 0;
				angular.forEach(scope.pageArray, function(value, key) {
					if(value.active){
						pageNumber = value.page;
					}
				});
				var pageNumber = scope.displayPages({
					page : pageNumber + 1,
					active : false
				})
			}

			scope.prevPage = function(){
				var pageNumber = 0;
				angular.forEach(scope.pageArray, function(value, key) {
					if(value.active){
						pageNumber = value.page;
					}
				});
				var pageNumber = scope.displayPages({
					page : pageNumber - 1,
					active : false
				})
			}

			scope.initalizeValues();
		}
	}
};
