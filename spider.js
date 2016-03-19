/**
 * Created by dchuan on 2016/3/19.
 */

'use strict';

// Import modules
var http = require('http');
var fs = require('fs');
var path = require('path');
var cheerio = require('cheerio');

// Target to spider
var opt = {
    hostname: 'localhost',
    path: '/douban.html',
    port: 3000
};

http.get(opt, function(res) {
    var html ='';
    var movies = [];

    res.setEncoding('utf-8');

    res.on('data', function(chunk) {
        html += chunk;
    });

    res.on('end', function() {
        var $ = cheerio.load(html);

        $('.item').each(function() {
            var picUrl = $('.pic img', this).attr('src');
            var movie = {
                title: $('.title', this).text(),
                star: $('.info .star em', this).text(),
                link: $('a', this).attr('href'),
                picUrl: /^http/.test(picUrl)? picUrl : 'http://localhost:3000/' + picUrl
            };

            movies.push(movie);
        });

        console.log(movies);
    });
}).on('error', function(err) {
    console.log(err);
});


