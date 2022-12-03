chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;
    if (url.startsWith("https://www.newworld.co.nz")) {
        document.getElementById("URL").textContent = "New World!";
    } else {
        document.getElementById("URL").textContent = "Old World :(";
    }
});