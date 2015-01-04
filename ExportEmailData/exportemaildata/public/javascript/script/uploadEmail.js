var app = angular.module("importEmail", ['ui.bootstrap','ngRoute','ngGrid']);
	
	app.factory('mySharedService', function($rootScope) {
		console.log("mySharedService");
	    var sharedService = {};
	    sharedService.message = '';    
	    sharedService.prepForBroadcast = function(msg) {
	        this.message = msg;
	        this.broadcastItem();
	    };

	    sharedService.broadcastItem = function() {
	        $rootScope.$broadcast('handleBroadcast');
	    };

	    return sharedService;
	});
	
	app.factory('uploadSuccessService',function($rootScope){
		var uploadService= {};
		uploadService.message='';
		uploadService.prepForBroadcast = function(msg){
			this.message = msg;
			this.broadcastItem();
		}
		uploadService.broadcastItem = function() {
	        $rootScope.$broadcast('uploadSuccessBroadcast');
	    };
	    
	    return uploadService;
	});
	
	
	app.directive('fileModel', ['$parse', function ($parse) {
	    return {
	        restrict: 'A',
	        link: function(scope, element, attrs) {
	            var model = $parse(attrs.fileModel);
	            var modelSetter = model.assign;
	            
	            element.bind('change', function(){
	                scope.$apply(function(){
	                    modelSetter(scope, element[0].files[0]);
	                });
	            });
	        }
	    };
	}]);

	app.service('fileUpload', ['$http','$interval', function ($http,$interval ) {
		
	    this.uploadFileToUrl = function(file, uploadUrl,uploadSuccessService ){
	        var fd = new FormData();
	        fd.append('file', file);
	        $http.post(uploadUrl, fd, {
	            transformRequest: angular.identity,
	            headers: {'Content-Type': undefined}
	        })
	        .success(function(data, status, headers, config){
	        	console.log('success');
	        	uploadSuccessService.prepForBroadcast(data);
	        	
	        })
	        .error(function(data, status, headers, config){
	        });
	    }
	}]);
	
	
	/*
	app.directive('myComponent', function(mySharedService) {
		
	    return {
	        restrict: 'E',
	        controller: function($scope, $attrs, mySharedService) {
	            $scope.$on('handleBroadcast', function() {
	                $scope.message = 'Directive: ' + mySharedService.message;
	            });
	        },
	        replace: true,
	        template: '<input>'
	    };
	   
	}); */

	
	function historyController($scope, $http,$log,$location,$routeParams,mySharedService,uploadSuccessService){
		$scope.url = '/importemail/getHistoryEmail';
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
			
			 
			
	        $http.get($scope.url).success(function(response) {
	        	$log.log(response.historys);
	        	$scope.content = response.historys;
	        	//$scope.content = response.questions[0].question;;
	        	// debugger;
	        	}
	        );
		};
	
		$scope.selectedEntity;
		 
		$scope.gridHistrory = { 
				data: 'content',
				jqueryUITheme: true,
				multiSelect: false,
				//keepLastSelected: false, 
				columnDefs: [{field:'id_export_email', displayName:'id',width :'10%'},
				             {field:'import_date', displayName:'date',width :'25%'},
				             {field:'total_row', displayName:'total',width :'20%'},
				             {field:'insert_real_row', displayName:'import',width :'20%'},
				             {field:'status', displayName:'status',width :'20%'}
							],
				/*beforeSelectionChange: function(row) {
					  row.changed = true;
					  return true;
					},
					afterSelectionChange : function (rowItem, event) {
						if (rowItem.changed){
					    	console.log("deal with row " + rowItem.rowIndex);
					    	rowItem.changed=false;
						}
					}
				*/
				afterSelectionChange : function (rowItem, event) {
				 	if(rowItem && rowItem.entity){
					    if(rowItem.selected){
					       $scope.selectedEntity = rowItem.entity;
					       
					       //$log.log($scope.selectedEntity);
					       
					       
					       mySharedService.prepForBroadcast($scope.selectedEntity.id_export_email);
					    }
					  }
				}
		};
		
	    $scope.$on('handleBroadcast', function() {
	        $scope.message = mySharedService.message;
	        
	        $log.log("call to historyController :" + mySharedService.message);
	    });
	    
	    
	    $scope.$on('uploadSuccessBroadcast', function() {
	        $scope.message = uploadSuccessService.message;
	        $scope.fetchContent();
	        $log.log("call to historyController(uploadSuccessBroadcast) :" + uploadSuccessService.message);
	    });
	    
	   $scope.fetchContent();
		}
	
	
	function mainController($scope,$interval, $http,$log,$location,$routeParams,mySharedService,fileUpload,uploadSuccessService){
		$scope.url = '/preview/getDataPreview';
		$scope.content = [];
		$scope.myFile = '';
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
			
			url = $scope.url + "?idProject=" +param.id  ;
			
	        $http.get(url).success(function(response) {
	        	$scope.content = response.questions[0].question;;
	        	 
	        	}
	        );
		};
	
		
		$scope.uploadFile = function(){
	        var file = $scope.myFile;
	        console.log('file is ' + JSON.stringify(file));
	        var uploadUrl = "/fileUpload";
	        fileUpload.uploadFileToUrl(file, uploadUrl,uploadSuccessService);
	    
	    };
	    
	    
	    $scope.$on('handleBroadcast', function() {
	        $scope.message = mySharedService.message;
	        
	        $log.log("call to mainController :" + mySharedService.message);
	    });
	    
	    $scope.$on('uploadSuccessBroadcast', function() {
	        $scope.message = uploadSuccessService.message;
	        
	        $log.log("call to mainController(uploadSuccessBroadcast) :" + uploadSuccessService.message);
	    });
	  // $scope.fetchContent();
	}

	function showHistoryController($scope,$interval, $http,$log,$location,$routeParams,mySharedService,uploadSuccessService){
		$scope.url = '/importemail/getHistoryEmail';
		$scope.historyDetail =[];
		$scope.formFields = [];
		$scope.getHistoryDetail = function (idHistory){
			
			url = $scope.url + "?id=" + idHistory  ;
			
	        $http.get(url).success(function(response) {
	        	$log.log(response.historys);
	        	$scope.historyDetail = response.historys;
	        	$scope.formFields= response.historys;
	        	
	        	if($scope.formFields.length >0)
	        	{
	        		if($scope.formFields[0].status == 'finish'){
	        			$log.log('finish');
	        			$interval.cancel($scope.stopShowDetail);
	        		}
	        	}
	        	else{
	        		$interval.cancel($scope.stopShowDetail);
	        	}
	        	
	        	
	        	//$scope.content = response.questions[0].question;;
	        	// debugger;
	        	}
	        );
		};
		 
		$scope.gridHistoryDetail = { 
				data: 'historyDetail',
				jqueryUITheme: true,
				multiSelect: false,
				//keepLastSelected: false, 
				columnDefs: [ 
				             {field:'import_date', displayName:'date',width :'20%'},
				             {field:'total_row', displayName:'total',width :'12%'},
				             {field:'insert_row', displayName:'import',width :'12%'},
				             {field:'error_row', displayName:'error',width :'12%'},
				             {field:'same_old_row', displayName:'same',width :'12%'},
				             {field:'insert_real_row', displayName:'import',width :'12%'},
				             
				             {field:'origin_file', displayName:'origin file',width :'10%'},
				             {field:'error_file', displayName:'error file',width :'10%'}
							],
				 
				afterSelectionChange : function (rowItem, event) {
				 	if(rowItem && rowItem.entity){
					    if(rowItem.selected){
					       $scope.selectedEntity = rowItem.entity;
					       
					       $log.log($scope.selectedEntity);
					    }
					  }
				}
		};
		
		
		
	    $scope.$on('handleBroadcast', function() {
	    	
	        $scope.message = mySharedService.message;
	        $scope.getHistoryDetail($scope.message);
	        
	        $log.log("call to showHistoryController :" + mySharedService.message);
	    });
	    
	    $scope.$on('uploadSuccessBroadcast', function() {
	        $scope.message = uploadSuccessService.message;
	        //start show
	        $scope.getHistoryDetail($scope.message.id);
	        //wait 30 sec 
	        $scope.stopShowDetail = $interval(function updateTime() {
	        	$scope.getHistoryDetail($scope.message.id);
	          }, 30000);
	        
	        
	        $log.log("call to showHistoryController(uploadSuccessBroadcast) :" + uploadSuccessService.message);
	    });
		
		//$scope.getHistoryDetail();
	}
	
	
	 
	
	  