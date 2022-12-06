chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    console.log('going 1')
    let url = tabs[0].url;
    if (url.startsWith("https://www.newworld.co.nz")) {
        document.getElementById("title").textContent = "You're shopping at New World, add some items to cart";
        chrome.runtime.sendMessage("getTrolley", function (response) {
            console.log('trolley', response.trolley);
            for (const item of response.trolley[0].result)
            document.getElementById("title").textContent += `\n${item.name} x ${item.count}`;
        });
    } else {
        document.getElementById("title").textContent = "Navigate to New World to see this extension working";
    }
});