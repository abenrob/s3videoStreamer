vidStreamer.factory('DataFactory', function ($rootScope,$http,$state) {
        return {
            getList: function(callback) {
                var rootURL = $rootScope.getItem('urlRoot');
                if (rootURL){
                    $http.get(rootURL)
                        .success(function(data){
                            console.log('success')
                            callback(data);
                        }).error(function(data, status, headers, config) {
                            console.log('fail-url returns nothing')
                            $rootScope.removeItem('urlRoot');
                            $state.transitionTo('main', null, {'reload':true});

                        })
                } else {
                    console.log('big fail')
                    $state.transitionTo('main', null, {'reload':true});
                }
            }
        };
    });