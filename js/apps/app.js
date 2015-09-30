var twitchApp = angular.module('TwitchApp', []);

twitchApp.controller('MainController', ['$scope', '$http', '$q', function ($scope, $http, $q) {
    var baseStreamUrl = "https://api.twitch.tv/kraken/streams/";
    var baseChannelUrl = "https://api.twitch.tv/kraken/channels/";
    
    var channels = ["freecodecamp",
                    "storbeck",
                    "terakilobyte",
                    "habathcx",
                    "RobotCaleb",
                    "thomasballinger",
                    "noobs2ninjas",
                    "beohoff"];

    $scope.data = {};
    promises = [];
    for (i = 0; i < channels.length; i++) {
        promises.push($http.get(baseStreamUrl + channels[i]));
    }
    $q.all(promises).then(function (array) {
        for (i = 0; i < array.length; i++) {
            channelName = channels[i];
            $scope.data[channelName] = array[i].data;
        }
    });
}]);