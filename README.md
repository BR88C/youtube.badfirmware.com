# youtube.badfirmware.ocm
This is a youtube downloader website built in JavaScript and is hosted at youtube.badfirmware.com:4000

## Prerequisites
This program requires a couple of programs to work:
- Node JS / npm
- ffmpeg with libmp3lame

## Starting
To start the program, run this command within the directory of index.js:
```
node index.js
```
## Hosting
If you are hosting this on your own domain, install Nginx for changing express.js's port to port 80

## Troubleshooting
If the program is having problems downloading videos, try updating ytdl:
```
npm install ytdl-core@latest
```
