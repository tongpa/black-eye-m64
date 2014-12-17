var app = angular.module("poll", ['ui.bootstrap']);
	
	app.controller("pollController", function($scope, $http,$log) {
		$scope.url = '/ang/getQuestion';
		$scope.content = [];
		
		/**Paging**/
		$scope.bigCurrentPage =1;
		$scope.setNextQuestion = function (){
			
			$log.log('Page changed to : ' + ($scope.bigCurrentPage ) );
			$log.log('Page total to : ' + ($scope.bigTotalItems ) );
			
			if( $scope.bigCurrentPage < $scope.bigTotalItems)
			{	$scope.bigCurrentPage = $scope.bigCurrentPage +1;
			 	$scope.pageChanged();
			}
		}
		
		$scope.setPage = function (pageNo) {
		    $scope.bigCurrentPage = pageNo;
		  };
		  
		  $scope.pageChanged = function() {
			  	
			    $log.log('Page changed to : ' + ($scope.bigCurrentPage -1) );
			    $scope.contentQuestion = [];
			    $scope.contentQuestion.push($scope.content[($scope.bigCurrentPage-1) ]);
			    
			    $log.log($scope.contentQuestion);
			  };

		  $scope.maxSize =3;
		  $scope.itemPerPage= 1;
		  $scope.bigTotalItems = 20;
		  
	
		/**Paging**/
		
		/**Query data */
		$scope.fetchContent = function (){
	        $http.get($scope.url).success(function(response) {
	        	$scope.content = response.questions[0].question;
	        	
	        	$scope.contentQuestion = [];
	        	
	        	$scope.contentQuestion.push($scope.content[0]);
	        	
	        	$scope.bigTotalItems= $scope.content.length;
	        	$scope.maxSize =$scope.bigTotalItems;
	        	if($scope.bigTotalItem >10){
	        		$scope.maxSize = 5
	        	}
	        	$log.log('Nomber to: ' + $scope.bigTotalItems);
	        	 
	        	 
	        	}
	        );
		};
	
		$scope.selectedScore  = function(idQuestion){
			$log.log('Page changed to: ' + id);
		};
		

	    $scope.fetchContent();
	    
	
	});
	
	
	 
	app.directive('contentItemIndex', function ($compile, $templateCache) {
		console.log("contentItemIndex");
		
		
		
		var getTemplate = function(contentType) {
	         var template = '';
	          
	         template ="/template/questionindextpl.html";

	         return template;
	     }
		
		
		var directive = {};
	     directive.restrict = 'E';
	     //directive.link =  linker;	     
	     directive.template =  '<ng-include src="getTemplateUrl()"/>';
	     directive.controller = function($scope) {
	         $scope.getTemplateUrl = function() {  
	        	  
	        	 return getTemplate($scope.content.type);
	           
	         }
	       }
	     directive.scope  =  {
					             content:'=' 
					         }
	     
	     return directive;
	});
	app.directive('contentItem', function ($compile, $templateCache) {
	    /* EDITED FOR BREVITY */

	     console.log("show");
	     
	     var imageTemplate = '<div class="entry-photo"><h2>&nbsp;</h2><div class="entry-img"><span><a href="{{rootDirectory}}{{content.data}}"><img ng-src="{{rootDirectory}}{{content.data}}" alt="entry photo"></a></span></div><div class="entry-text"><div class="entry-title">{{content.title}}</div><div class="entry-copy">{{content.description}}</div></div></div>';
	     var videoTemplate = '<div class="entry-video"><h2>&nbsp;</h2><div class="entry-vid"><iframe ng-src="{{content.data}}" width="280" height="200" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div><div class="entry-text"><div class="entry-title">{{content.title}}</div><div class="entry-copy">{{content.description}}</div></div></div>';
	     var noteTemplate = '<div class="entry-note"><h2>&nbsp;</h2><div class="entry-text"><div class="entry-title">{{content.title}}</div><div class="entry-copy">{{content.data}}</div></div></div>';

	     
	     var radioTemplate = '<div> <h2>{{content.question}}</h2><input type="hidden" name="question_{{content.id}}" value="{{content.id}}"/><label data-ng-repeat="answer in content.answer"><input type="radio" name="radio_{{content.id}}" ng-model="$parent.id"  value="{{answer.id}}" required="required"/> {{answer.label}} </label></div>';
	     
	     var radioTemplateFile = '/template/radiotpl.html';//'radiotpl.html';
	     var checkboxTemplateFile = '/template/checkboxtpl.html';
	     var imageTemplateFile = '/template/imagetpl.html';
	     
	     //radioTemplateFile = '/ang/radiotpl';
	      
	     
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
	     
	     /**show tag html*/
	     var linker = function(scope, element, attrs) {
	    	 
	    	 scope.rootDirectory = 'images/';
	    	 //debugger;
	         element.html(getTemplate(scope.content.type) );//.show();

	         $compile(element.contents())(scope);
	     }
	     
	   
	     

	    /* EDITED FOR BREVITY */
	     
	     var directive = {};
	     directive.restrict = 'E';
	     //directive.link =  linker;	     
	     directive.template =  '<ng-include src="getTemplateUrl()"/>';
	     directive.controller = function($scope) {
	         $scope.getTemplateUrl = function() {  
	        	 console.log('gettemplate');
	        	 return getTemplate($scope.content.type);
	           
	         }
	       }
	     directive.scope  =  {
					             content:'=' 
					         };
	     
	 
	     
	     return directive;
	   /*
	     return {
	         restrict: "E",
	         link: linker,
	         scope: {
	             content:'='
	         }
	     };*/
	});