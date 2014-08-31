var request = require('request');
var _ = require('underscore');

var url = 'http://api.yifysubtitles.com/subs/';

function searchSubtitles(lang, query, callback) {
    lang = lang.toLowerCase();
    if (query instanceof Array) {
        query = query.join('-');
    }
    request({url:url+query, json: true}, function(error, response, data){
        if( lang == 'all' ) {
            _.each(data.subs, function(languages) {
                var subtitles = {};
                _.each(languages, function(subs, language) {
                    var subtitle = {};
                    subtitle.language = language;
                    subtitle.url = 'http://www.yifysubtitles.com'+_.max(subs, function(s){return s.rating;}).url;
                    subtitles[language] = subtitle;

                });
                callback(subtitles);
            });
        }
        else if( lang != 'all' && lang !== '' ) {
            _.each(data.subs, function(languages) {
                if( lang in languages ) {
                    var subtitles = {};
                    var subtitle = {};
                    var subs = languages[lang];
                    subtitle.language = lang;
                    subtitle.url = 'http://www.yifysubtitles.com'+_.max(subs, function(s){return s.rating;}).url;
                    subtitles[lang] = subtitle;
                    callback(subtitles);
                }
            });
        }
    });
}

exports.searchSubtitles = searchSubtitles;