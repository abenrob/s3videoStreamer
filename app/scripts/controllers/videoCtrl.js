vidStreamer.controller('VideoCtrl', function ($scope,$rootScope,$sce,$state,$stateParams,$filter,DataFactory) {
	console.log($rootScope.haveURL());
	if (!$rootScope.haveURL()){
		$state.go('main');
	}
	if (!$rootScope.media){
		DataFactory.getList(function(data){
			$rootScope.media = data;
			console.log($rootScope.media)
			$scope.video = _.findWhere($rootScope.media.films,{title:$stateParams.video});
			defineVideo();
		});
	} else {
		$scope.video = _.findWhere($rootScope.media.films,{title:$stateParams.video});
		defineVideo();
	}
	

	function defineVideo(){
		var fileSources = _.map(_.each($scope.video.sources, function(source){
					source.src = $sce.trustAsResourceUrl($rootScope.getItem('urlRoot') + source.file)
				}),_.clone);

		$scope.config = {
			sources: fileSources,
			plugins: {
				poster: $rootScope.getItem('urlRoot') + $scope.video.poster
			}
		};
	};
    
  });