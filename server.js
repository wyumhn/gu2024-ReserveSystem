const fs = require('fs');
const https = require('https');
const url = require('url');
const express = require('express');
const app = express();
const session = require('express-session');
//const csrf = require('csurf');
//const bodyParser = require('body-parser');

const generatedUuid = `21e7fc77-d480-485b-a9a1-c422ba8b364f`;

// HTTP -> HTTPSにリダイレクトする
// 検索エンジンによるインデックス登録を拒否
app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect('https://' + req.headers.host + req.url);
    }
    res.set('X-Robots-Tag', 'noindex, nofollow');
    next();
});

const server = https.createServer(options);

server.on('request', function(req, res) {
    let filePath = '';

    // サブディレクトリからUUID部分を抽出
    const urlParts = req.url.split('/');
    const uuid = urlParts[1];

    // UUIDの形式が正しいかを確認
    if (uuid !== generatedUuid) {
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.end('<h1>400 Bad Request: Invalid UUID</h1>');
        return;
    }

    // リクエストされたURLに基づいてファイルパスを設定
    if (urlParts[2] === 'client.html') {
        filePath = 'client.html';
    } else if (urlParts[2] === 'client.css') {
        filePath = 'client.css';
    } else if (urlParts[2] === 'client.js') {
        filePath = 'client.js';
    } else if (urlParts[2] === 'master.html') {
        filePath = 'master.html';
    } else if (urlParts[2] === 'master.css') {
        filePath = 'master.css';
    } else if (urlParts[2] === 'master.js') {
        filePath = 'master.js';
    } else if (urlParts[2] === 'spinner.gif') {
        filePath = 'spinner.gif';
    } else {
        // それ以外のURLは404エラーページを返す
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('<h1>404 Not Found</h1>');
        return;
    }

    // ファイルをストリームで読み込み、レスポンスとして返す
    const stream = fs.createReadStream(filePath);
    res.writeHead(200, {'Content-Type': 'text/html'});
    stream.pipe(res);

});

// コマンドプロンプトで "ipconfig" と入力。IPv4アドレスを出力

// http://192.168.64.37:8000
// http://192.168.64.37:8000/master.html

const io = require('socket.io')(server);

server.listen(8000, '0.0.0.0', () => {
    console.log(`Server running`);
});


// 'connection' イベントが起きたとき
// 'greeting' として {message: 'hello'} を クライアントに渡す

// クライアントが このイベントを受け取って処理を実行したとき data 引数が帰ってきて コールバック関数が実行される
// サーバーは console.log で結果をログに出力

io.on('connection', function(socket) {
    console.log('A client connected');

    // どこかのクライアントで 'connect' イベントが発生した場合
    socket.on('eventsClientConnect', function (data) {
        // すべてのクライアントに 'connected' イベントを送信
        io.sockets.emit('eventsAnimationConnected');
    });

    socket.on('eventsAnimationConnected-Callback', function (data) {
        io.sockets.emit('eventsAnimationPull');
    });

    socket.on('eventsAnimationPull-Callback', function (data) {
        io.sockets.emit('eventsAnimationThrow');
    });

    socket.on('eventsAnimationThrow-Callback', function (data) {
        io.sockets.emit('eventsAnimationEnd');
    });

    socket.on('eventsAnimationEnd-Callback', function (data) {
        io.sockets.emit('eventsAnimationReset');
    });

    socket.emit('greeting', {message: 'アクセスしました！'}, function (data) {
        console.log('result: ' + data);
    });
});