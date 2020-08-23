# youtube.badfirmware.com
A youtube downloader website built in JavaScript.

## Prerequisites
This program requires a couple of programs to work:
- NodeJS and npm
- ffmpeg with libmp3lame

## Starting
Before starting the program, make sure you have your node modules installed:
```
npm install
```
To start the program, run this command within the directory of index.js:
```
npm start
```
## Hosting
If you are hosting this on your own server, change the port and serverURL in config.json accordingly. You can use nginx to reverse proxy the website to port 443 and point it to your domain. If you need an SSL certificate and key, you can use something like certbot to generate one.

## Troubleshooting
If the program is having problems downloading videos, try updating ytdl:
```
npm install ytdl-core@latest
```
