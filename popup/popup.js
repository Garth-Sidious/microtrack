// Whenever the popup is opened, this code will run
chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    let url = tabs[0].url;
    if (url.startsWith("https://www.newworld.co.nz")) {
        document.getElementById("title").textContent = "You're shopping at New World, add some items to cart, then open cart";
        chrome.runtime.sendMessage("getPageContent", (pageContent) => {
            const trolley = pageContent.trolley[0].result;
            const nutritionInfo = {}
            // Should put a call to some function to get nutrition information once we decide how to do that.
            // For now just modify the nutritionInfo object to simulate it.
            for (const item of trolley) {
                document.getElementById("trolley").textContent += `\n${item.name} x ${item.count}`;
            }
        });
    } else {
        document.getElementById("title").textContent = "Navigate to New World to see this extension working";
    }
});