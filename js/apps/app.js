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
                    "beohoff",
                    "medrybw"],
        streamPromises = [],
        channelPromises = [],
        all = [],
        online = [],
        i;
    $scope.data = [];
    
    for (i = 0; i < channels.length; i++) {
        streamPromises.push($http.get(baseStreamUrl + channels[i]));
        channelPromises.push($http.get(baseChannelUrl + channels[i]));
    }
    
    channelPromises = $q.all(channelPromises);
    streamPromises = $q.all(streamPromises);
    
    $q.all([channelPromises, streamPromises]).then(function (data) {
        var channelData = data[0],
            streamData = data[1];
        for (i = 0; i < channelData.length; i++) {
            var channelName = channels[i];
            $scope.data.push({});
            $scope.data[i].displayName = channelData[i].data.display_name;
            if (channelData[i].data.logo) {
                $scope.data[i].logo = channelData[i].data.logo;
            } else {
                $scope.data[i].logo = "http://placehold.it/300";
            }
            $scope.data[i].stream = streamData[i].data.stream;
            $scope.data[i].url = channelData[i].data.url;
            $scope.$apply;
        }
    });
    
    all = $scope.data;
    
    $scope.onlineClickEvent = function () {
        for (i = 0; i < $scope.data.length; i++) {
            if ($scope.data[i].stream) {
                online.push($scope.data[i]);
            }
        }
        $scope.data = online;
    };
    
    $scope.allClickEvent = function () {
        $scope.data = all;
    };
}]);