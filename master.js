const socket = io();

// サーバーに接続時に 'connected' イベントを送信
socket.on('eventsAnimationConnected', function() {
    const faderElement = document.getElementById("fader");
    const handleftElement = document.getElementById("handleft");
    const handrightElement = document.getElementById("handright");
    const formboxElement = document.getElementById("formbox");

    if (faderElement) {
        faderElement.className = "";
        faderElement.classList.add("fader-eventsAnimationConnected");
    }

    if (handleftElement) {
        handleftElement.className = "";
        handleftElement.classList.add("handleft-eventsAnimationConnected");
    }

    if (handrightElement) {
        handrightElement.className = "";
        handrightElement.classList.add("handright-eventsAnimationConnected");
    }

    if (formboxElement) {
        formboxElement.className = "";
        formboxElement.classList.add("formbox-eventsAnimationConnected");
    }

    // 1秒後に 'Callback' イベントを送信
    setTimeout(function() {
        socket.emit('eventsAnimationConnected-Callback');
    }, 1000);
});

//
socket.on('eventsAnimationPull', function() {
    const handleftElement = document.getElementById("handleft");
    const handrightElement = document.getElementById("handright");
    const formboxElement = document.getElementById("formbox");

    if (handleftElement) {
        handleftElement.className = "";
        handleftElement.classList.add("handleft-eventsAnimationPull");
    }

    if (handrightElement) {
        handrightElement.className = "";
        handrightElement.classList.add("handright-eventsAnimationPull");
    }

    if (formboxElement) {
        formboxElement.className = "";
        formboxElement.classList.add("formbox-eventsAnimationPull");
    }
    console.log('pulled');

    // 0.6秒後に 'Callback' イベントを送信
    setTimeout(function() {
        socket.emit('eventsAnimationPull-Callback');
    }, 600);
});

socket.on('eventsAnimationThrow', function() {
    const handleftElement = document.getElementById("handleft");
    const handrightElement = document.getElementById("handright");
    const formboxElement = document.getElementById("formbox");

    if (handleftElement) {
        handleftElement.className = "";
        handleftElement.classList.add("handleft-eventsAnimationThrow");
    }

    if (handrightElement) {
        handrightElement.className = "";
        handrightElement.classList.add("handright-eventsAnimationThrow");
    }

    if (formboxElement) {
        formboxElement.className = "";
        formboxElement.classList.add("formbox-eventsAnimationThrow");
    }
    console.log('throwed');

    // 1.5秒後に 'Callback' イベントを送信
    setTimeout(function() {
        socket.emit('eventsAnimationThrow-Callback');
    }, 1500);
});

socket.on('eventsAnimationEnd', function() {
    const faderElement = document.getElementById("fader");
    const handleftElement = document.getElementById("handleft");
    const handrightElement = document.getElementById("handright");

    if (faderElement) {
        faderElement.className = "";
        faderElement.classList.add("fader-eventsAnimationEnd");
    }

    if (handleftElement) {
        handleftElement.className = "";
        handleftElement.classList.add("handleft-eventsAnimationEnd");
    }

    if (handrightElement) {
        handrightElement.className = "";
        handrightElement.classList.add("handright-eventsAnimationEnd");
    }

    console.log('ended');

    // 1秒後に 'Callback' イベントを送信
    setTimeout(function() {
        socket.emit('eventsAnimationEnd-Callback');
    }, 1000);
});

socket.on('eventsAnimationReset', function() {
    const handleftElement = document.getElementById("handleft");
    const handrightElement = document.getElementById("handright");
    const formboxElement = document.getElementById("formbox");

    if (handleftElement) {
        handleftElement.className = "";
        handleftElement.classList.add("handleft-eventsAnimationReset");
    }

    if (handrightElement) {
        handrightElement.className = "";
        handrightElement.classList.add("handright-eventsAnimationReset");
    }

    if (formboxElement) {
        formboxElement.className = "";
        formboxElement.classList.add("formbox-eventsAnimationReset");
    }

    console.log('reseted');
});

// サーバーからの 'greeting' メッセージを受け取る
socket.on('greeting', function(data, callback) {
    console.log('Greeting from server:', data.message);
    callback('Acknowledged');
});