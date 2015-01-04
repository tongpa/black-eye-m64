//var app_track_report = angular.module("track-report", ['ui.bootstrap','ngRoute','ngGrid']);
	/*
app_track_report.controller('trackReportController',
	function   ($scope, $http,$log,$location ){
		$scope.url = '/importemail/getHistoryEmail';
		$scope.content = [];
		
		$log.log('trackReport Controller');
		
		$scope.reportProblem = function( ){
			$log.log('reportProblem');
		}
	});
	*/

angular.element(document).ready(function() {
    var myDiv1 = document.getElementById("track-report");
    
    angular.bootstrap(myDiv1, ["MyModuleA" ]);
    $log.log('track-report');
});
	
var moduleA = angular.module("MyModuleA", []);
moduleA.controller("trackReportController", function($scope) {
	$log.log('trackReport Controller');
});

	
	  