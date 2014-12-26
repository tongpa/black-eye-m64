var app = angular.module("importEmail", ['ui.bootstrap','ngRoute']);
	
 

	app.controller("historyController", function($scope, $http,$log,$location,$routeParams   ) {
		$scope.url = '/preview/getDataPreview';
		$scope.content = [];
		console.log('historyController');
		/**Paging**/
		var getUrl = $location.url();
		var param = $location.search();
		
		console.log(param.id);
		 
		
		 
		$scope.setPage = function (pageNo) {
		    $scope.bigCurrentPage = pageNo;
		  };
		  
		  $scope.pageChanged = function() {
			    $log.log('Page changed to: ' + $scope.bigCurrentPage);
			  };

		  $scope.maxSize = 10;
		  $scope.bigTotalItems = 175;
		  $scope.bigCurrentPage = 1;
	
		/**Paging**/
		
		$scope.fetchContent = function (){
			
			$scope.url = $scope.url + "?idProject=" +param.id  ;
			
	        $http.get($scope.url).success(function(response) {
	        	$scope.content = response.questions[0].question;;
	        	 
	        	}
	        );
		};
	

	  // $scope.fetchContent();
	    
	
	});
	

	app.controller("mainController", function($scope, $http,$log,$location,$routeParams   ) {
		$scope.url = '/preview/getDataPreview';
		$scope.content = [];
		console.log('mainController');
		/**Paging**/
		var getUrl = $location.url();
		var param = $location.search();
		
		console.log(param.id);
		 
		
		 
		$scope.setPage = function (pageNo) {
		    $scope.bigCurrentPage = pageNo;
		  };
		  
		  $scope.pageChanged = function() {
			    $log.log('Page changed to: ' + $scope.bigCurrentPage);
			  };

		  $scope.maxSize = 10;
		  $scope.bigTotalItems = 175;
		  $scope.bigCurrentPage = 1;
	
		/**Paging**/
		
		$scope.fetchContent = function (){
			
			$scope.url = $scope.url + "?idProject=" +param.id  ;
			
	        $http.get($scope.url).success(function(response) {
	        	$scope.content = response.questions[0].question;;
	        	 
	        	}
	        );
		};
	

	  // $scope.fetchContent();
	    
	
	});
	
	
	  