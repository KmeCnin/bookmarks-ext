chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo && changeInfo.status == 'complete') {
    	if (tab.url != 'chrome://newtab/' && tab.url != 'chrome://extensions/' && tab.url != 'chrome://bookmarks/' && tab.url != 'chrome://bookmarks/#1') {
    		var xhr = new XMLHttpRequest();
			xhr.open('GET', 'http://dev.aurelienpraga.com/BookmarksWS/?url=' + tab.url, true);
			xhr.onreadystatechange = function() {
				// ...
			}
			xhr.send();
    	}
    }
});