const express = require('express');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const pjson = require('./package.json');
const config = require('./config.json')
const app = express()
  , server = require('http').createServer(app)

// Specify website directory
app.use(express.static(__dirname + '/site'));

// Listen on specified port in config.json
server.listen(config.port, () => {
	console.log('');
	console.log('\x1b[32m', 'Server online at port ' + config.port);
	console.log('\x1b[32m', 'Running version ' + pjson.version)
	console.log('\x1b[37m', '');
});



// If "Convert mp3" selected
app.get('/downloadmp3', (req,res) => {
	var url = req.query.url; // Gets URL
	var queryid = Math.random().toString(36).substr(2, 5); // Creates ID for query
	// Gets name of video
	ytdl.getInfo(url, function(err, info) {
		// If error
		if (err) {
			console.log('\x1b[31m', 'ERROR: Ytdl-core has encountered an error.')
			console.log('\x1b[37m', '')
			return;
		}
		console.log('\x1b[33m', 'Converting to mp3: ' + info.title)
		console.log('\x1b[37m', '');
		// Sets header for the download
		res.header("Content-Disposition", "attachment; filename=\"" + info.title + " queryID=" + queryid + ".mp3\"");
	});
	// Sets stream for ffmpeg
	var stream = ytdl(url, {
		filter: 'audioonly',
		quality: 'highestaudio'
	})
	// Downloads and converts to mp3
	ffmpeg(stream)
		// Sets file properties
		.audioCodec('libmp3lame')
		.audioBitrate(128)
		.format('mp3')
    	// Error message
    	.on('error', function(err) {
			  console.log('\x1b[31m', 'ffmpeg ERROR: ' + err.message);
			  console.log('\x1b[37m', '')
    	})
    	// Pipe to download
    	.pipe(res, {end:true});
});



// If "Convert mp4" selected
app.get('/downloadmp4', (req,res) => {
	var url = req.query.url; // Gets URL
	var queryid = Math.random().toString(36).substr(2, 5); // Creates ID for query
	// Gets name of video
	ytdl.getInfo(url, function(err, info) {
		// If error
		if (err) {
			console.log('\x1b[31m', 'ERROR: Ytdl-core has encountered an error.')
			console.log('\x1b[37m', '')
			return;
		}
		console.log('\x1b[33m', 'Converting to mp4: ' + info.title)
		console.log('\x1b[37m', '');
		// Sets header for the download
		res.header("Content-Disposition", "attachment; filename=\"" + info.title + " queryID=" + queryid + " .mp4\"");
	});
	// Downloads the video
	ytdl(url, {
		format: 'mp4'
	}).pipe(res);
});