var map;
function initialize() {
    // Create a simple map.
    map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: 4,
        center: {lat: 39.8, lng: -94.6}
    });
    var citiesList = [
        ["New York, New York", 2459115],
        ["Los Angeles, California",	2442047],
        ["Chicago, Illinois", 2379574],
        ["Wichita, Kansas", 12588472],
        ["Philadelphia, Pennsylvania", 2471217],
        ["Phoenix, Arizona", 2471390],
        ["Denver, Colorado", 2391279],
        ["Omaha, Nebraska", 2465512],
        ["Seattle, Washington", 2490383],
        ["San Jose, California", 2488042],
        ["Atlanta, Georgia", 2357024],
    ];
    var geocoder = new google.maps.Geocoder();

    for (var i = 0; i < citiesList.length; ++i) {
        (function() {
            var city = citiesList[i][0];
            var woeid = citiesList[i][1];
            geocoder.geocode( { 'address': city }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var loc = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                    var datapoint = new google.maps.Data.Feature();
                    datapoint.setGeometry(loc);
                    datapoint.setProperty('name', city);
                    datapoint.setProperty('woeid', woeid);

                    map.data.add(datapoint);
                } else {
                    console.log("Something wrong: " + status);
                }
            });
            //if (i % 5 == 0) {
            //mySleep(1000);
            //}
        })()
    }

    map.data.addListener('click', function(event) {
        //document.getElementById("info-box").textContent = event.feature.getProperty('woeid');
        $('.woe').html(event.feature.getProperty('name'));
        $('#now').show();
        handleClick(event.feature.getProperty('woeid'));
    });
}

function handleClick(woeid) {
    $('.trends').show();
    $.post('/', {id: woeid}).success(function(data) {
        var i = 0;
        for (var item in data.trends) {
            var info = data.trends[item].name;
            info = info.replace(/#/,'').replace(/([a-z]|[0-9])([A-Z])/g,'$1_$2').replace(/\s/g,'_');
            console.log(info);
            $('#box' + i).html(info); i++;
        }
    });
}

//function mySleep(millis) {
//  var date = new Date();
//  var curDate = null;
//  do { curDate = new Date(); }
//  while(curDate-date < millis);
//}

google.maps.event.addDomListener(window, 'load', initialize);
