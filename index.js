// Defining Modules
const express = require('express');
const ejs = require('ejs');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const sanitize = require("sanitize-filename");
const emojiStrip = require('emoji-strip');
const pjson = require('./package.json');
const config = require('./config.json');



// Configuring app with express
const app = express()
  , server = require('http').createServer(app);

// Stes view engine and changes default views folder to site
app.set('view engine', 'ejs');
app.set("views","./site");

// Sets up the site with ejs
app.get('/', (req, res)=>{ 
	// Passes variables from config.json to index.ejs
	res.render('index.ejs', { config: config }); 
});
app.use(express.static(__dirname + '/site'));

// Listen on specified port in config.json
server.listen(config.port, () => {
	console.log('');
	console.log('\x1b[32m', 'Server online at port ' + config.port);
	console.log('\x1b[32m', 'Running version ' + pjson.version);
	console.log('\x1b[37m', '');
});



// If "Convert mp3" selected
app.get('/downloadmp3', (req,res) => {
	var url = req.query.url; // Gets URL
	var queryid = Math.random().toString(36).substr(2, 5); // Creates ID for query
	// Gets name of video
	ytdl.getInfo(url).then(info => {
		// Removes emojis and invalid charactors
		var emojiTitle = sanitize(info.videoDetails.title);
		var title = emojiStrip(emojiTitle);
		// Logs the name of the Video
		console.log('\x1b[33m', `Converting to mp3: ${title}\n`);
		// Sets header for the download
		res.header("Content-Disposition", "attachment; filename=\"" + title + " queryID=" + queryid + ".mp3\"");
	});
	// Sets stream for ffmpeg
	var stream = ytdl(url, {
		filter: 'audioonly',
		quality: 'highestaudio'
	});
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
	ytdl.getInfo(url).then(info => {
		// Removes emojis and invalid charactors
		var emojiTitle = sanitize(info.videoDetails.title);
		var title = emojiStrip(emojiTitle);
		// Logs the name of the Video
		console.log('\x1b[33m', `Converting to mp4: ${title}\n`);
		// Sets header for the download
		res.header("Content-Disposition", "attachment; filename=\"" + title + " queryID=" + queryid + ".mp4\"");
	});
	// Downloads the video
	ytdl(url, {
		format: 'mp4'
	}).pipe(res);
});