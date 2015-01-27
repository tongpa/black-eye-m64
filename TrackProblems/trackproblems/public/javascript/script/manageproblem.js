var app = angular.module("manage-report", ['ui.bootstrap',
                                           'ngAnimate',
                                           'ngRoute',
                                           'ngSanitize',
                                           'ngTouch',
                                           'ngGrid']);//.config(function() { }); 



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
		
		
		//grid 
		$scope.filterOptions = {
		        filterText: "",
		        useExternalFilter: true
	    }; 
	    $scope.totalServerItems = 0;
	    $scope.pagingOptions = {
	        pageSizes: [250, 500, 1000],
	        pageSize: 250,
	        currentPage: 1
	    };	
		
	    $scope.mySelections=[];
	    
	    $scope.afterSelect = function (rowItem, event){
	    	 
	    	$.fancybox( '<h3>' + rowItem.entity.description + '</h3> <img src="/getImage?id=' + rowItem.entity.image + '" alt="Mountain View"/>  '  );
	    	 
	    	
	    }
	    
	    var myHeaderCellTemplate ='<div class="ngSelectionCell"><input tabindex="-1" class="ngSelectionCheckbox" type="checkbox" ng-checked="cbVal(row.entity)" /></div>';

		$scope.gridOptions = { 
				data: 'myData',
				enablePaging: true,
				showFooter: true,
				totalServerItems: 'totalServerItems',
				multiSelect: false,
				selectedItems: $scope.mySelections,
				afterSelectionChange : $scope.afterSelect,
				pagingOptions: $scope.pagingOptions,
		        filterOptions: $scope.filterOptions,
		        showSelectionCheckbox: true,
		        selectWithCheckboxOnly : true,
		        plugins:[new ngGridSingleSelectionPlugin()],
		        checkboxHeaderTemplate: '<input class="ngSelectionHeader" type="checkbox" ng-show="multiSelect" ng-model="allSelected" ng-change="toggleSelectAll(allSelected, true)"/>',
	            //rowTemplate: '<div ng-style="{\'cursor\': row.cursor, \'z-index\': col.zIndex(),\'height\': \'150px\' }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell {{col.cellClass}}" ng-cell></div>',
		        rowHeight: 100,
		        columnDefs: [

		                     {field: 'image', displayName: 'image', width: '25%', enableCellEdit: false, cellTemplate: '<div ><img src="/getImage?id={{row.getProperty(col.field)}}" alt="Mountain View" class="row_image"/> </div>'}, 
		                     {field:'description', displayName:'description', width: '25%', enableCellEdit: false}, 
		                     {field:'user', displayName:'user', width: '10%', enableCellEdit: false}, 
		                     {field:'from_page', displayName:'from_page', width: '15%', enableCellEdit: false}, 
		                     {
		                         field: 'dude',
		                         displayName: 'Dude', width: '15%',
		                         //headerCellTemplate: myHeaderCellTemplate,
		                         cellTemplate: '<input type="checkbox" ng-model="row.entity.dude" ng-click="toggle(row.entity.image,row.entity.user)">'
		                       }
		        
		        
		        ]
		};
		
		$scope.$on('ngGridEventRowSeleted',function(event,row){
			$scope.selectedRow=row;
			});
			
		$scope.toggle = function(name, value) {
	        //do something usefull here, you have the name and the new value of dude. Write it to a db or else. 
	        alert(name + ':' + value);
	      }
		
		$scope.setPagingData = function(data, page, pageSize){	
			debugger;
	        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
	        $scope.myData = pagedData;
	        $scope.totalServerItems = data.length;
	        if (!$scope.$$phase) {
	            $scope.$apply();
	        }
	    };
	    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
	        setTimeout(function () {
	            var data;
	            
	            $scope.entity.pageSize = pageSize;
	            $scope.entity.page = page;
	            if (searchText) {
	            	console.log('searchText' + pageSize + ' ' + page );
	                var ft = searchText.toLowerCase();
	                $http.get('/searchData').success(function (largeLoad) {		
	                    data = largeLoad.filter(function(item) {
	                        return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
	                    });
	                   // $scope.setPagingData(data,page,pageSize);
	                });            
	            } else {
	            	console.log('not searchText');
	            	$scope.loadResultSearch($scope.entity);
	            }
	        }, 100);
	    };
		
	    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
		
	    $scope.$watch('pagingOptions', function (newVal, oldVal) {
	        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
	        	console.log('pagingOptions');
	          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
	        }
	    }, true);
	    $scope.$watch('filterOptions', function (newVal, oldVal) {
	    	console.log('filterOptions');
	        if (newVal !== oldVal) {
	          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
	        }
	    }, true);
	    
		
		$scope.loadResultSearch = function(search){
			 console.log(search);
			 
			  
			
			 $http.post('/searchData', search ).
			  success(function(data, status, headers, config) {
				  console.log(data.problem);
				  
				  
				  $scope.myData = data.problem;
				  
				  
				  
				  
			  }).
			  error(function(data, status, headers, config) {
				  console.log(data);
			  });
			 
		};
		 $scope.fetchContent();
		 
});



