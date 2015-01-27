vidStreamer.controller('MainCtrl', function ($scope,$rootScope,$state,DataFactory) {

		if ($rootScope.haveURL()){
			DataFactory.getList(function(data){
				$rootScope.media = data;
			});
		}
		
		$scope.setURL = function(){
			if ($scope.cfURL) {
				$rootScope.submit('urlRoot', $scope.cfURL);
				DataFactory.getList(function(data){
					$rootScope.media = data;
				});
			} else {
				$scope.cfURL = null;
				$rootScope.removeItem('urlRoot');
				$state.go('main');
			}
		}
		
		
        
  });