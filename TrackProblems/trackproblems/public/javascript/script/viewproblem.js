var app = angular.module("track-bug", ['ui.bootstrap']);



app.controller("filedController", function($scope, $http,$log) {

	$scope.url = '/track/showField';
	
	$scope.fetchContent = function (){
        $http.get($scope.url).success(function(response) {
        	$scope.content = response.fields[0].field;
        	debugger;
        	$scope.contentQuestion = [];
        	
        	$scope.contentQuestion.push($scope.content[0]);
        	
        	$scope.bigTotalItems= $scope.content.length;
        	$scope.maxSize =$scope.bigTotalItems;
        	if($scope.bigTotalItem >10){
        		$scope.maxSize = 5
        	}
        	$log.log('Nomber to: ' + $scope.bigTotalItems);
        	
        	
        	 
        });
	};
	
	 $scope.fetchContent();
});



