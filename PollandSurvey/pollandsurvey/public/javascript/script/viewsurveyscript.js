var app = angular.module("poll", ['ui.bootstrap']);
 

/**controller***/
	app.controller("pollController", function($scope, $http,$window,$log) {
		
		
		
		//$scope.url = '/ang/getQuestion';
		$scope.url = 'preview/getDataPreview?idProject=2';
		$scope.idProject = '';
		$scope.idResp = '';
		$scope.content = [];
		
		
		$scope.selectedData={};
		
		/**count select Question**/
		$scope.countQuestion = [];
		
		$scope.lastQuestion =  [];
		
		
		/**for paging**/
		$scope.bigCurrentPage =1;
		/**max for next page**/
		$scope.maxSize =3;
		/**for item per page**/
		$scope.itemPerPage= 1;
		
		/**total of question**/
		$scope.bigTotalItems = 0;
		/**sum question answerd*/
		$scope.numberQuestion =0;
		
		$scope.selected_radio = 1;
		
		$scope.init = function(url,idproject,idresp){
			$scope.url = url;
			$scope.idProject = idproject;
			$scope.idResp = idresp;
			
			//console.log(url);
			//console.log(idproject);
			
			$scope.fetchContent();
		}
		
		
		/**function for this controller update Question attempted**/
		$scope.updateQuestionsAttemptedCount = function() {
		    $scope.numberQuestion++;
		  };
		
		/**function for this controller for next Question **/
		$scope.setNextQuestion = function (){
			
			
			
			
			//$log.log('Page changed to : ' + ($scope.bigCurrentPage ) );
			//$log.log('Page total to : ' + ($scope.bigTotalItems ) );
			$scope.numberQuestion = $scope.numberQuestion +1;
			if( $scope.bigCurrentPage < $scope.bigTotalItems)
			{	$scope.bigCurrentPage = $scope.bigCurrentPage +1;
			 	$scope.pageChanged();
			}
			else{
				if ($scope.bigCurrentPage == $scope.bigTotalItems){
					$scope.pageChanged();
				}
				
			}
		}
		
		/**function for this controller for next Question **/
		$scope.setPage = function (pageNo) {
		    $scope.bigCurrentPage = pageNo;
		  };
		  
		  /**function for this controller for next Question **/
		$scope.pageChanged = function() {
		  	
		   // $log.log('Page changed to : ' + ($scope.bigCurrentPage -1) );
		    $scope.contentQuestion = [];
		    $scope.contentQuestion.push($scope.content[($scope.bigCurrentPage-1) ]);
		    
		  //  $log.log($scope.contentQuestion);
		    
		  //  $log.log('countQuestion : ' );
		  //  $log.log($scope.countQuestion);
		    
		  //  $log.log('last data ');
		 //   $log.log($scope.lastQuestion);
		  
		     
		    if( $scope.lastQuestion.length > 0 ){
		    
			    var data = {value : $scope.lastQuestion[0]  };
			    data.finished =  ($scope.bigCurrentPage == $scope.bigTotalItems);
			    $http.post("/ans/saveQuestion",data).success(function(data,status,heafers, config){
			    //	console.log(data);
			    	if (status == 200 && data.success == true){
			    		value = $scope.lastQuestion.pop(); //remove data;
			    	//	console.log('finished : ' + data.finished);
			    		if(data.finished){
			    	//		$log.log('redirect : ' + data.redirect);
			    			//$location.path('http://www.google.com');
			    			$window.location.href = data.redirect;
			    			//$location.url('http://www.google.com');
			    		}
			    	}
			    	 
			    }).error(function(data, status, headers, config) {
			        // called asynchronously if an error occurs
			        // or server returns response with an error status.
			      });
			    
			 //   $log.log("save to server:");
			    
		    }
		    
		   // debugger;
		  };

		  
		  
	
		/**Paging**/
		
		/**Query data */
		$scope.fetchContent = function (){
		//	console.log($scope.url);
	        $http.get($scope.url).success(function(response) {
	        	$scope.content = response.questions[0].question;
	        	
	        	$scope.contentQuestion = [];
	        	
	        	$scope.contentQuestion.push($scope.content[0]);
	        	
	        	$scope.bigTotalItems= $scope.content.length;
	        	$scope.maxSize =$scope.bigTotalItems;
	        	if($scope.bigTotalItem >10){
	        		$scope.maxSize = 5
	        	}
	        	//$log.log('Nomber to: ' + $scope.bigTotalItems);
	        	
	        	
	        	 
	        });
		};
	
		$scope.selectedScore  = function(idQuestion){
		//	$log.log('Page changed to: ' + id);
		};
		

	    
	    
	   
	});
	

	

/**directive***/	 
	 
	app.directive('contentItem', function ($compile, $templateCache) {
	    /* EDITED FOR BREVITY */

	     console.log("show");
	     
	
	     var radioTemplateFile = '/template/radiotpl.html';
	     var checkboxTemplateFile = '/template/checkboxtpl.html';
	     var imageTemplateFile = '/template/imagetpl.html';
	     
	      
	     
	     var getTemplate = function(contentType) {
	         var template = '';
	          
	         switch(contentType) {
	             case 'radio':
	                 template = radioTemplateFile;
	                 
	                 
	                 break;
	             case 'check':
	                 template = checkboxTemplateFile;
	                 break;
	             case 'image':
	                 template = imageTemplateFile;
	                 break;
	         }

	         return template;
	     }
	     
	      

	    /* EDITED FOR BREVITY */
	     
	     var directive = {};
	     directive.restrict = 'E';
	     directive.scope  =  { content:'=' };
	     directive.template =  '<ng-include src="getTemplateUrl()"/>';
	     
	     directive.link =    function($scope, $element, $attrs) {
	    	 var same = false;
	    	 var qnaObj = new Object();
	    	 $scope.selectedScore = function(id,value, type){
	    		    
	    		// 	console.log("id : " + id + ", value : " + value + ", type : " + type  );
	    		 	qnaObj = new Object();
	    		 	qnaObj.id = id;
	    		 	qnaObj.idproject = $scope.$parent.idProject;
	    		 	qnaObj.idresp = $scope.$parent.idResp;
	    		 	qnaObj.value = [];
	    		 	qnaObj.value.push(value);
	    		 	qnaObj.type = type;
	    		 	console.log(qnaObj);
	    		 	
	    		 	 
	    		 	same = false;
	    		 	angular.forEach( $scope.$parent.countQuestion, function(qna) {
	    		          if( qna.id === id ) {
	    		        	  same =true;
	    		        	  
	    		        	  switch(type) {
	    			             case 'radio':
		    			            	 qna.value = [];
		    			            	 qna.value.push(value);
	    			            	 	break;
	    			             case 'check':
	    			            	 	var s = false;
	    			            	 	
	    			            	 	 for(var i in qna.value){
	    			            	         if(qna.value[i]==value){
	    			            	        	 qna.value.splice(i,1);
	    			            	        	 s =true;
	    			            	             break;
	    			            	         }
	    			            	     }	    			            	 	
	    			            	 	 
	    			            	 	if (!s){
	    			            	 		qna.value.push(value);
	    			            	 	}
	    			            	 	break;
	    			             case 'image':
	    			            	 qna.value = [];
	    			            	 qna.value.push(value);
	    			                 break;
	    			         } 
	    		        	  
	    		        	  
	    		          }   
	    		 	});	    		 	
	    		 	if (!same) {
	    		 		$scope.$parent.countQuestion.push(qnaObj);
	    		 		
	    		 		$scope.$parent.updateQuestionsAttemptedCount();
	    		 	}
	    	//	 	console.log($scope.$parent.countQuestion);
	    		 	
	    		 	$scope.$parent.lastQuestion.push(qnaObj);
	    	//	 	console.log($scope.$parent.lastQuestion);
	    		 	
	    		 	
	    		 	//debugger;
	    	   };
	    	
	     };
	     
	     
	     directive.controller = function($scope) {
	         $scope.getTemplateUrl = function() {  
	        	 console.log('gettemplate');
	        	 
	        	 
	        	 
	        	 return getTemplate($scope.content.type);
	           
	         }
	       }
	     
	     
	 
	     
	     return directive;
	   
	});