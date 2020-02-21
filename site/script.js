var mp3Btn = document.getElementById('mp3');
var	mp4Btn = document.getElementById('mp4');
var URLinput = document.querySelector('.URL-input');

var defaultURL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'

var serverURL = 'http://youtube.badfirmware.com:4000';


mp3Btn.addEventListener('click', () => {
	if (typeof URLinput.value !== 'undefined' && URLinput.value) {
		console.log(`URL: ${URLinput.value}`);	
		redirectMp3(URLinput.value)
	} else {
		console.log(`URL: ${defaultURL}`);
		redirectMp3(defaultURL)
	}
});


mp4Btn.addEventListener('click', () => {
	if (typeof URLinput.value !== 'undefined' && URLinput.value) {
		console.log(`URL: ${URLinput.value}`);	
		redirectMp4(URLinput.value)
	} else {
		console.log(`URL: ${defaultURL}`);
		redirectMp4(defaultURL)
	}
});

function redirectMp3(query) {
	window.location.href = `${serverURL}/downloadmp3?url=${query}`;
}

function redirectMp4(query) {
	window.location.href = `${serverURL}/downloadmp4?url=${query}`;
}
