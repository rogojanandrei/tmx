(function(){
	'use strict'

	testController.$inject = ["$scope", "ngDialog", "dialogService"];
	function testController($scope, ngDialog, dialogService){
		var vm = this;
		$scope.open = open;
		$scope.text = "asdasesdasd"
		
		function open(){
			dialogService.openAddEditEntryDialog($scope.text)
				
		}
	}
	window.app.controller('testController', testController);
})();