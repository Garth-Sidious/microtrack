// Whenever the popup is opened, this code will run
chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    let url = tabs[0].url;
    if (url.startsWith("https://www.newworld.co.nz")) {
        document.getElementById("title").textContent = "You're shopping at New World, add some items to cart, then open cart";
        chrome.runtime.sendMessage("getTrolley", (response) => {
            const trolley = response.trolley[0].result;
            for (const item of trolley) {
                document.getElementById("trolley").textContent += `\n${item.name} x ${item.count}`;
            }
        });
    } else {
        document.getElementById("title").textContent = "Navigate to New World to see this extension working";
    }
});