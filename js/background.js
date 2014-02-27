chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo && changeInfo.status === 'complete') {
	   if (tab.url !== 'chrome://newtab/' && tab.url !== 'chrome://extensions/' && tab.url !== 'chrome://bookmarks/' && tab.url !== 'chrome://bookmarks/#1') {
		 var token = '1251c7c2c9f48e2e8ff80a77c5ec103c';
		 $.ajax({
			type: "POST",
			url: 'http://dev.pierrechanel-gauthier.com/bookmarks-ws/links?token='+token,
			data: { url: tab.url, folder_id: null }
		 }).done(function(data) {
//			alert(data);
		 });
	   }
    }
});