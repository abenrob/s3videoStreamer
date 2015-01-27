var vidStreamer = angular.module('vidStreamer', [
    "ngSanitize",
    "ui.router",
    "LocalStorageModule",
    "com.2fdevs.videogular",
    "com.2fdevs.videogular.plugins.buffering",
    "com.2fdevs.videogular.plugins.controls",
    "com.2fdevs.videogular.plugins.overlayplay",
    "com.2fdevs.videogular.plugins.poster"
    
]);

vidStreamer.config(function ($urlRouterProvider,$stateProvider,localStorageServiceProvider) {
    $urlRouterProvider
        .otherwise('/');
    $stateProvider
        .state('main', {
            url: '/',
            templateUrl: 'app/views/main.html',
            controller: 'MainCtrl'
        })
        .state('video', {
            url: '/:video',
            templateUrl: 'app/views/video.html',
            controller: 'VideoCtrl'
        })
    localStorageServiceProvider
        .setPrefix('vidStreamer')
        .setNotify(true, true)
});

vidStreamer.filter('playtime', function () {
    return function (playtime) {
        if (!playtime) { return '00:00'; }

        var hours   = (playtime.getHours() > 9 ? playtime.getHours() : '0'+playtime.getHours());
        var hours   = (playtime.getHours() > 11 ? '00' : hours);
        var minutes = (playtime.getMinutes() > 9 ? playtime.getMinutes() : '0'+playtime.getMinutes());
        var seconds = (playtime.getSeconds() > 9 ? playtime.getSeconds() : '0'+playtime.getSeconds());

        var time = (hours > 11 ? '00:'+minutes+':'+seconds : hours+':'+minutes+':'+seconds);

        return time;
    };
});


vidStreamer.run(function($rootScope,localStorageService){
    $rootScope.submit = function(key, val) {
        return localStorageService.set(key, val);
    }

    $rootScope.getItem = function(key) {
        return localStorageService.get(key);
    }

    $rootScope.removeItem = function(key) {
        return localStorageService.remove(key);
    }

    $rootScope.haveURL = function(){
        return (localStorageService.get('urlRoot') ? true : false);
    }
    
})