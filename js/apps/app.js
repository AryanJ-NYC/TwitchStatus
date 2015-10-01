var twitchApp = angular.module('TwitchApp', []);

twitchApp.controller('MainController', ['$scope', '$http', '$q', function ($scope, $http, $q) {
    var baseStreamUrl = "https://api.twitch.tv/kraken/streams/",
        baseChannelUrl = "https://api.twitch.tv/kraken/channels/",
        channels = ["freecodecamp",
                    "storbeck",
                    "terakilobyte",
                    "habathcx",
                    "RobotCaleb",
                    "thomasballinger",
                    "noobs2ninjas",
                    "beohoff"],
        streamPromises = [],
        channelPromises = [],
        i;
    $scope.data = {};
    for (i = 0; i < channels.length; i++) {
        streamPromises.push($http.get(baseStreamUrl + channels[i]));
        channelPromises.push($http.get(baseChannelUrl + channels[i]));
    }
    
    $q.all(streamPromises).then(function (array) {
        for (i = 0; i < array.length; i++) {
            var channelName = channels[i];
            $scope.data[channelName] = {};
            $scope.data[channelName].stream = array[i].data.stream;
        }
    });
    
    $q.all(channelPromises).then(function (channelData) {
        for (i = 0; i < channelData.length; i++) {
            var channelName = channels[i];

            $scope.data[channelName].displayName = channelData[i].data.display_name;
            if (channelData[i].data.logo) {
                $scope.data[channelName].logo = channelData[i].data.logo;
            } else {
                $scope.data[channelName].logo = "http://placehold.it/300";
            }
            $scope.data[channelName].url = channelData[i].data.url;
        }
    });
}]);