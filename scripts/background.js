let trolley = []

// Gets the trolley, and sends it to the popup.
// Requires sendResponse, the callback that will send the trolley to the popup
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
    sendResponse({ trolley });
}

// Listens for getTrolley, then sends the trolley if it is provided
chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
    if (request === "getTrolley") {
        sendTrolley(sendResponse);
        return true; // Returning true tells chrome we expect an async response (as sendTrolley is async)
    } else {
        sendResponse({});
    }
});

// Returns the current tab (tabs.Tab or undefined)
async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

// Returns trolley contents if trolley is open on a New World page.
// Trolley is an array of items with a name (e.g. 'Anchor Blue Milk') and count (e.g. 2). 
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