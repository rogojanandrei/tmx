(function(){
	var app = angular.module('app');
	app.service('utilityService',utilityService); 

		function utilityService(){

		function hasError(field, validation, form, submitted){
			if(form){
				if(!form[field])
					return false;
				if(validation){
					var validationError = form[field].$error[validation];
					return submitted && validationError;
				}
				return submitted && form[field].$invalid;
			}
		}	
	};
})();