chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    //here we get the new 
    console.log("URL CHANGED: " + request.data.url);
});