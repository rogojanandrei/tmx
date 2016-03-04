(function(){
	'use strict'

	dialogService.$inject = ['ngDialog'];
	function dialogService(ngDialog){

		function openAddEditEntryDialog(text){
			var dialog = ngDialog.open({
				templateUrl: 'app/calendar/addEditTaskDialog.html',
				controller: ["$scope", "data", function($scope, data) {
                    this.text = data.text;
                }],

                controllerAs: "vm",
                resolve: {
                    data: function () {
                        return {
                            text: text
                        }
                    }
                }
			});
		}

		return {
			openAddEditEntryDialog: openAddEditEntryDialog
		};
	}
	window.app.factory("dialogService", dialogService);
})();