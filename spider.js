/**
 * Created by dchuan on 2016/3/19.
 */

'use strict';

// Import modules
var fs = require('fs');
var path = require('path');
var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');

var app = express();

app.get('/', function (req, res, next) {
    superagent.get('https://movie.douban.com/chart')
        .end(function(err, sres) {

            if(err) {
                return console.log(err);
            }

            var movies = [];
            var $ = cheerio.load(sres.text);

            $('.item').each(function() {
                var picUrl = $('img', this).attr('src');
                var movie = {
                    title: $('a', this).attr('title'),
                    star: $('.rating_nums', this).text(),
                    link: $('a', this).attr('href'),
                    picUrl: /^http/.test(picUrl)? picUrl : 'http://localhost:3000/' + picUrl
                };

                movies.push(movie);

                // Download images
                downloadImg('img/', movie.picUrl);
            });

            // Save all datas in data/data.json
            saveData('data/data.json', movies);

            // Shown json results on html page
            res.send(movies);
    });
});

app.listen(3000, function () {
    console.log('app is listening at port 3000');
});

/**
 * Save data in json file
 * @param path
 * @param movies
 */
function saveData(path, data) {
    fs.writeFile(path, JSON.stringify(data, null, 4), function(err) {

        if(err) {
            return console.log(err);
        }

        console.log('Data saved');
    });
}

/**
 * Download images from given url
 * @param imgDir
 * @param url
 */
function downloadImg(imgDir, url) {
    superagent.get(url)
        .end(function(err, sres) {
            var data = '';

            fs.writeFile(imgDir + path.basename(url), data, 'binary', function (err) {

                if(err) {
                    return console.log(err);
                }

                console.log('Image downloaded', path.basename(url));
            })
        });
}


