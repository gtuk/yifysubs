yifysubs
=================

yifysubs is a node module for searching and downloading subtitles from yifysubtitles.

## Installation

From npm:

	npm install yifysubs

From source:

	git clone https://github.com/gtuk/yifysubs.git
	npm link


## Usage

``` javascript
var yifysubs = require("yifysubs");
yifysubs.searchSubtitles('All', 'tt0481499', function(result){
    console.log(result);
});
```

For more examples see examples folder