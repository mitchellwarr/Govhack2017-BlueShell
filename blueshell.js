angular.module('bmap', [])
.controller('bmapController', function TrigController($scope, $http) {

    $scope.initMap = function() {
        var baseMap = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            id: 'mapid',
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            subdomains: ['a','b','c']
        })
        $scope.mymap = L.map('mapid', {
            center: [-38.6, 176],
            zoom: 8,
            layers: [baseMap]
        });
    }

    $scope.getData = function() {
        // $http.get('/getSettings')
        //     .then(function(response) {
        //         data = response.data;
        //         $scope.use_wind = data.wind;
        //         $scope.use_ele = data.elevation;
        //         $scope.wind_deg = data.deg;
        //         console.log(data);
        //     });

        // $scope.insertLocData($scope.createTestData(20));
        $scope.insertLocHeatMap($scope.createTestData(240));
    };

    $scope.insertLocHeatMap = function(data) {
        var marks = [];
        if($scope.heat) {
            $scope.mymap.removeLayer($scope.heat);
        }
        for ( var i = 0; i < data.length; ++i ) {
            marks.push([data[i].lat, data[i].lng])
        }
        $scope.heat = L.heatLayer(marks, {radius: 10, minOpacity: 0.7}).addTo($scope.mymap);
    }

    $scope.insertLocData = function(data) {
        for ( var n = 0; n < $scope.markers.length; ++n ) {
            $scope.mymap.removeLayer($scope.markers[n])
        }
        $scope.markers = [];
        for ( var i = 0; i < data.length; ++i ) {
            $scope.markers.push(L.marker( [data[i].lat, data[i].lng] )
                // .bindPopup( '<a href="' + data[i].url + '" target="_blank">' + data[i].name + '</a>' )
                .addTo( $scope.mymap ));
        }
    }

    $scope.preset = function(type) {
        switch(type) {
        }
    }

    $scope.createTestData = function(length) {
        var testData = [];
        for(var i = 0; i < length; i++) {
            testData.push({
                lat: -38 + (Math.random()*-2),
                lng: 175 + (Math.random()*2),
                weight: 1
            });
        }
        return testData;
    };

    $scope.markers = [];
    $scope.mymap = null;
    $scope.heat = null;
    $scope.initMap();
    $scope.getData();
});