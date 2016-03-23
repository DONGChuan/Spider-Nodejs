# Spider-Nodejs

Simple web spider in node.js. A simple spider to catch/download information/images from this [page](https://movie.douban.com/chart).

Modules to use:

* fs
* path
* express
* cheerio
* superagent

Results will be shown directly on [http://localhost:3000/](http://localhost:3000/). Also these results will be stored in `data/data.json`. In the meantime, it will also download images in `img` folder.

From this demo, I learnt how to:

* write files by `fs`
* server side jquery to parser DOM by `cheerio`
* superagent - powerful to do request. If with origin APIs `http.get`. We will get some small problems like "https not supported".
