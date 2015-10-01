angular.module('cardFilters', []).filter('UBER', function() {
  return function(input) {
  	var inputstr=String(input);
  	var index=inputstr.indexOf("cute");
  	return inputstr.replace("cute","UBER!");
  //  return index;
  };
});