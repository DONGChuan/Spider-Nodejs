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
            downloadImg('img/', movie.picUrl);
        });

        saveData('data/data.json', movies);
    });
}).on('error', function(err) {
    console.log(err);
});

function saveData(path, movies) {
    fs.writeFile(path, JSON.stringify(movies, null, 4), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log('Data saved');
    });
}

function downloadImg(imgDir, url) {
    http.get(url, function(res) {
        var data = '';

        res.setEncoding('binary');

        res.on('data', function(chunk) {
            data += chunk;
        });

        res.on('end', function() {
            fs.writeFile(imgDir + path.basename(url), data, 'binary', function (err) {
                if(err) {
                    return console.log(err);
                }
                console.log('Image downloaded', path.basename(url));
            })
        });
    }).on('error', function(err) {
        console.log(err);
    });
}


