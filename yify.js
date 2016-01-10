var request = require('request');
var _ = require('underscore');

var apiUrl = 'http://api.yifysubtitles.com/subs/';
var baseUrl = 'http://www.yifysubtitles.com';

function searchSubtitles(lang, query, callback) {

    lang = lang.toLowerCase();

    if (query instanceof Array) {
        query = query.join('-');
    }
    
    request({url:apiUrl+query, json: true}, function(error, response, data){

        if( lang == 'all' ) {

            var subtitles = {};

            _.each(data.subs, function(languages, index) {
                subtitles[index] = {};

                _.each(languages, function(subs, language) {
                    var subtitle = {};
                    subtitle.language = language;
                    subtitle.url = baseUrl+_.max(subs, function(s){return s.rating;}).url;
                    subtitles[index][language] = subtitle;

                });
            });
     
            callback(subtitles);

        }

        else if( lang != 'all' && lang !== '' ) {

            var subtitles = {};

            _.each(data.subs, function(languages, index) {
                subtitles[index] = {};

                if( lang in languages ) {
                    var subtitle = {};
                    var subs = languages[lang];
                    subtitle.language = lang;
                    subtitle.url = baseUrl+_.max(subs, function(s){return s.rating;}).url;
                    subtitles[index][lang] = subtitle;
                }

            });

            callback(subtitles);

        }

    });

}

exports.searchSubtitles = searchSubtitles;