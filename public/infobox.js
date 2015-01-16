$(document).ready( function() {
    $('.trend').on('click', function () {
        var service_url = 'https://www.googleapis.com/freebase/v1/search';
        var params = {
            'query': $(this).html(),
            'limit': 10,
            'indent': true
        };

        var req = "http://en.wikipedia.org/wiki/" + params['query'];
        $('#content').show();
        $('#content').html('<a href=' + req + ' class="embedly-card">');

        $.getJSON(service_url + '?callback=?', params, function(response) {
            console.log(response.result[0]['mid']);
            console.log(response.result[0]);

            $.getJSON('https://www.googleapis.com/freebase/v1/topic' + response.result[0]['mid']
                + '?filter=/common/topic/description', function(response) {
                    console.log(response);
                }
            );

            //$(".infobox").html(response.result[0]['mid']);

            //$.each(response.result[0], function(i, result) {
            //  $(".infobox").html(result['mid']);
            //});
        });
    });
});
