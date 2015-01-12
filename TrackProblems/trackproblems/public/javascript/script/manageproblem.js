var app = angular.module("manage-report", ['ui.bootstrap','ngGrid']);//.config(function() { }); 



app.controller("filedController", function($scope, $http,$log) {
	 console.log('filedController');
	 // entity to edit  
	  $scope.entity = {  
	    name: 'Max',  
	    country: 2,  
	    licenceAgreement: true,  
	    description: 'I use AngularJS'  
	  };  
	  
	  
	// fields description of entity  
	  $scope.fields = [  
	    {  
	      name: 'project',  
	      title: 'Project',  
	      required: true,  
	      type: {  
	        view: 'input'  
	      }  
	    },  
	    {  
	      name: 'country',  
	      title: 'Country',  
	      type: {  
	        view: 'select',  
	        options: [  
	          {id: 0, name: 'USA'},  
	          {id: 1, name: 'German'},  
	          {id: 2, name: 'Russia'}  
	        ]  
	      }  
	    },  
	    {  
	      name: 'licenceAgreement',  
	      title: 'Licence Agreement',  
	      type: {  
	        view: 'checkbox'  
	      }  
	    },  
	    {  
	      name: 'description',  
	      title: 'Description',  
	      type: {  
	        view: 'textarea'  
	      }  
	    } 
	  ];  
	  
	  
	  $scope.url = '/track/showFieldByPage?id=1';
		
		$scope.fetchContent = function (){
	        $http.get($scope.url).success(function(response) {
	        	$scope.fields = response.fields;
	        	 
	        	
	        	
	        	
	        	
	        	 
	        });
		};
		
		 $scope.fetchContent();
});



