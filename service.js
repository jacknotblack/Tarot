var tarotServices = angular.module('tarotServices', ['ngResource']);

tarotServices.factory('Card', ['$resource',
  function($resource){
    return $resource("tarot.json", {}, {
      query: {method:'GET', params:{cardId:'cards'}, isArray:true,cache:false}
    });
  }]);

var tarotResultServices = angular.module('tarotResultServices', ['ngResource']);

tarotResultServices.factory('tarotResult', ['$resource',
  function($resource){
    return $resource('http://1.34.137.108:8080/api/results',null, {
        'update': { method:'PUT' }
    }
    );
  }]);
