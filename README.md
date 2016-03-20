# Spider-Nodejs

Simple web spider in node.js. A simple spider to download information/images form this [page](https://movie.douban.com/chart).

Modules to use:

* fs
* path
* express
* cheerio
* superagent

We could get the results on [http://localhost:3000/](http://localhost:3000/). Also these results will be stored in `data/data.json`. In the meantime, it will download images in `img` folder.

Form this demo, I leart how to:

* write files by `fs`
* server side jquery to parser DOM by `cheerio`
* superagent - a powerful to do request. If with origin APIs `http.get`. We will get some small problems like "https not supported".
