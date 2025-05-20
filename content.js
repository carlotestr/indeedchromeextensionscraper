(() => {
    "use strict";
    document.getElementsByTagName("body"), chrome.runtime.onMessage.addListener((function(e) {

        console.log("Content ");
        console.log("Type " + e.type)

        switch (console.log("Content"), e.type) {
            case "SYNC_CONTENT_STATUS":
                break;
            case "SYNC_STATUS":
                e.syncing, e.syncing;
                break;
            case "SYNC_DATA":
                e.data && (console.log("should post message"), window.postMessage(e.data, "*"))
        }
    }))
})();