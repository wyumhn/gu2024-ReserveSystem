const socket = io();

window.onload = function() {

    // ブラウザのリロード対策。
    // ハッシュ値によって予約フォーム送信済みの端末かを判別し、アクセスした際の処理を分ける。

    // URL直書きでアクセスした（※NFCタグ、QRコードから）場合 -> アニメーションを表示
    // ブラウザの戻るボタン・履歴からアクセスした 場合 -> アニメーションせず、すぐにフォームへ移行

    // PerformanceNavigationTiming を取得
    const navEntries = performance.getEntriesByType("navigation");

    if (navEntries.length > 0) {
        const navigationType = navEntries[0].type;

        if (navigationType === "reload") {
            // ページがリロードされた場合
            console.log("ページがリロードされました");
            const formboxElement = document.getElementById("formbox");

            if (formboxElement) {
                formboxElement.className = "";
                formboxElement.classList.add("formbox-Reload");
            }

        } else if (navigationType === "navigate") {
            // URLを直接入力してアクセスされた場合、もしくは通常のリンクからのアクセス
            console.log("URL直入力または通常のリンクからのアクセスです");
            // const newUrl = currentUrl.split('#')[0] + '#connected';
            // history.replaceState(null, null, newUrl);

            console.log('Connected to server');
            socket.emit('eventsClientConnect'); // 'eventsClientConnect' イベントをサーバーに送信

        } else if (navigationType === "back_forward") {
            // ブラウザの履歴（戻る・進む）ボタンでアクセスされた場合
            console.log("履歴（戻る・進む）ボタンでのアクセスです");
            const formboxElement = document.getElementById("formbox");

            if (formboxElement) {
                formboxElement.className = "";
                formboxElement.classList.add("formbox-Reload");
            }
        } else {
            console.log("その他のアクセス方法");
            const formboxElement = document.getElementById("formbox");

            if (formboxElement) {
                formboxElement.className = "";
                formboxElement.classList.add("formbox-Reload");
            }
        }

    } else {
        console.log("ナビゲーション情報が取得できませんでした");
        // Formbox を正しい位置にセットする
        const formboxElement = document.getElementById("formbox");

        if (formboxElement) {
            formboxElement.className = "";
            formboxElement.classList.add("formbox-Reload");
        }
    }

};


// イベント 'eventsAnimationThrow' が送信されるまでアニメーションが再生されたとき、フォームが出現する
socket.on('eventsAnimationThrow', function() {
    const formboxElement = document.getElementById("formbox");

    if (formboxElement) {
        formboxElement.className = "";
        formboxElement.classList.add("formbox-eventsAnimationThrow");
    }
});

