var tarotApp = angular.module('tarotApp', [
  'ngRoute',
  'tarotControllers',
  'cardFilters',
  'tarotServices',
  'tarotAnimations',
  'tarotResultServices',
  'ezfb'
]);

tarotApp.config(["$routeProvider","ezfbProvider",
	function($routeProvider,ezfbProvider){
		ezfbProvider.setInitParams({
    		appId: '1723502797877606',
    		version: 'v2.4'
  		});
  		ezfbProvider.setLocale('zh_TW');

		$routeProvider.
		when("/home",{
			templateUrl: "home.html",
			controller: "MenuCtrl"
		}).
		when("/archive/:resultId",{
			templateUrl: "archive.html",
			controller: "ArchiveCtrl"
		}).
		when("/archive/:resultId/:bs",{
			templateUrl: "archive.html",
			controller: "ArchiveCtrl"
		}).
		when("/cards/:cardId/:cardName",{
			templateUrl: "cardDetails.html",
			controller: "CardDetailCtrl"
		}).
		when("/result/:askerName/:cardNum",{
			templateUrl: "cardlist.html",
			controller: "CardListCtrl"
		}).
		when("/backstage",{
			templateUrl: "backstage.html",
			controller: "BackStageCtrl"
		}).
		otherwise({
			redirectTo:"/home"
		});
	}]);

tarotApp.directive('afterView',
	['$animate','$timeout',
	function($animate,$timeout){
		return{
			restrict: 'A',
			link: function(scope,element,attrs){
				$timeout(function(){
					$animate.addClass(element,'slide-in',function(){console.log('animation complete!');});
				});
			}
		}
	}]);
