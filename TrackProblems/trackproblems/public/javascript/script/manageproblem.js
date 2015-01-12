var app = angular.module("manage-report", ['ui.bootstrap','ngGrid']);//.config(function() { }); 



app.controller("filedController", function($scope, $http,$log) {
	 console.log('filedController');
	 // entity to edit  
	  $scope.entity = {   };  
	  
	  
	// fields description of entity  
	  $scope.fields = [ ];  
	  
	  $scope.submit = function() {
	          
	         
	          
	          $scope.loadResultSearch($scope.entity);
	        
	      };
	  
	  $scope.url = '/track/showFieldByPage?id=1';
	  
	  $scope.getDataByURL = function(url,object){
		  console.log(url);
		  $http.get(url).success(function(response) {
				 
				 
			   object.select_options = response.fields;
			
				console.log( object);
			});
	  };
	  
		$scope.fetchContent = function (){
	        $http.get($scope.url).success(function(response) {
	        	//$scope.fields = response.fields;
	        	fields_data =  response.fields;
	        	 
	        	 
	        	for (field in fields_data){
	        		
	        		element_field = fields_data[field];
	        		
	        		for (ch in element_field.child){
	        			element = element_field.child[ch];
	        			if(element.url_get_option != null && element.type == "select"){
	        				element.select_options = [];
	        				$scope.getDataByURL(element.url_get_option+'?id=1'   ,element);
	        			}
	        			
	        		}
	        		
	        	}
	        	
	        	
	        	$scope.fields  = fields_data;
	        	 
	        });
		};
		//console.log($scope.fields);
		
		
		$scope.loadResultSearch = function(search){
			 console.log(search);
			 
			
			 $http.post('/searchData', search ).
			  success(function(data, status, headers, config) {
				  console.log(data);
				  
			  }).
			  error(function(data, status, headers, config) {
				  console.log(data);
			  });
			 
		};
		 $scope.fetchContent();
		 
});



