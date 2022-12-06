let trolley = []

async function sendTrolley(sendResponse) {
    const tab = await getCurrentTab();
    if (tab) {
        const newTrolley = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: getTrolley,
        }).catch(console.error);

        if (newTrolley) {
            trolley = newTrolley;
        }
    }
    console.log('every day I trolley...', trolley)
    sendResponse({ trolley });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request === "getTrolley") {
        sendTrolley(sendResponse);
        return true;
    } else {
        sendResponse({});
    }
});

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }

function getTrolley() {
    const trolley = [];
    const trolleyDOM = document.getElementsByClassName('m-trolley-preview__item-body') ?? [];
    console.log('trollied', trolleyDOM)
    for (const itemDOM of trolleyDOM) {
        const item = {}
        const itemNameDOM = itemDOM.getElementsByClassName('m-trolley-preview__item-name')[0];
        const itemCountDOM = itemDOM.getElementsByClassName('fs-add-to-cart__quantity-edit')[0];
        console.log('DOMination', itemNameDOM, itemCountDOM)
        item.name = itemNameDOM?.children?.item(0)?.innerHTML ?? 'Mystery Item'
        item.count = itemCountDOM?.value ?? -1
        trolley.push(item);
    }
    console.log('troley', trolley)
    return trolley;
}