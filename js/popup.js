var tree = null;
var currentFolder = null;
var url = null;
var token = false;
//token = '1251c7c2c9f48e2e8ff80a77c5ec103c';
if (!localStorage.getItem('token')) { // Redirect to Login
    window.location.href = 'login.html';
}
$(document).ready(function() {
    
    // Initialize
    init();
    
    // Change folder
    $(document).on("click", ".goFolder", function() { 
	   currentFolder = {'id': parseInt($(this).attr('data-id')), 'name': $(this).html()};
	   var data = { url: url };	// Root
           if (currentFolder.id !== 0)	// Other than Root
               data = { url: url, folder_id: currentFolder.id };
	   $.ajax({
		  type: "POST",
		  url: 'http://dev.pierrechanel-gauthier.com/bookmarks-ws/links/move?token='+token,
		  data: data
	   });
	   displayFolders();
	   displayBreadcrumb(getBreadcrumb(tree, currentFolder.id, []));
    });
    
    // Add Folder
    $(document).on("keypress", "#addFolder", function(e) { 
	   if(e.which === 13) {
		  var name = $(this).val();
		  $(this).val('');
		  // Creating new folder
		  $.ajax({
			 type: "POST",
			 url: 'http://dev.pierrechanel-gauthier.com/bookmarks-ws/folders?token='+token,
			 data: { name: name, parent_id: currentFolder.id }
		  }).done(function(lastInsertId) {
			 // Setting link to the new folder created
			 $.ajax({
				type: "POST",
				url: 'http://dev.pierrechanel-gauthier.com/bookmarks-ws/links/move?token='+token,
				data: { url: url, folder_id: lastInsertId }
			 }).done(function() {
				// Displaying changes
				init();
			 });
		  });
	   }
    });
    
    // Logout
    $(document).on('click', '#logout', function() {
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    });
});

function init() {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
	   token = localStorage.getItem('token');
	   url = tabs[0].url;
	   // Get global tree from database
	   $.when(

		  $.ajax({
			 type: "GET",
			 url: 'http://dev.pierrechanel-gauthier.com/bookmarks-ws/folders?last=&token='+token
		  }).done(function(data) {
			 tree = {'id': 0, 'name': '<i class="fa fa-home"></i>', 'folders': data.folders};
		  }),

		  $.ajax({
			 type: "GET",
			 url: 'http://dev.pierrechanel-gauthier.com/bookmarks-ws/links/folder?url='+encodeURIComponent(url)+'&token='+token
		  }).done(function(data) {
			 if (data.id === null)
				currentFolder = {'id': 0, 'name': '<i class="fa fa-home"></i>'};
			 else
				currentFolder = data;
		  })

	   ).then(function() {
		  displayFolders();
		  displayBreadcrumb(getBreadcrumb(tree, parseInt(currentFolder.id), []));
	   });
    });
}

function cleanFolders(folders) {
    var foldersCleaned = [];
    $.each(folders, function(i, folder) {
	foldersCleaned.push({'id': folder.id, 'name': folder.name});
    });
    return foldersCleaned.reverse();
}

function displayFolders() {
    var folders = cleanFolders(getChildrenFromCurrentFolder(tree, parseInt(currentFolder.id)));
    var animIn = 'slideInDown';
    var animOut = 'slideOutUp';
    if ($('.folder').length > 0) { // If some folders are already displayed
	$('.folder').removeClass(animIn).addClass(animOut); // Old folders leave
	$('.folder').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() { // On end of animation
	    $('.folder').remove();
	    if (folders.length > 0) {
		$.each(folders, function(i, folder) {
		    $('#folderWrapper').prepend('<li data-id="'+folder['id']+'" class="folder goFolder animated '+animIn+'"><a>'+folder['name']+'</a></li>');
		});
	    }
	});
    } else if (folders.length > 0) {
	$.each(folders, function(i, folder) {
	    $('#folderWrapper').prepend('<li data-id="'+folder['id']+'" class="folder goFolder animated '+animIn+'"><a>'+folder['name']+'</a></li>');
	});
    }
}

function displayBreadcrumb(breadcrumb) {
    // Display the breadcrumb from root to current folder
    $('#breadcrumb').html('Page saved in ');
    for (var i = 0; i < breadcrumb.length; i++) {
	   if (i === breadcrumb.length-1)
		  $('#breadcrumb').append(''+breadcrumb[i].name+'');
	   else
		  $('#breadcrumb').append('<a data-id="'+breadcrumb[i].id+'" class="goFolder">'+breadcrumb[i].name+'</a> / ');
    }
//    $('#breadcrumb').append(' <i style="color:#2ecc71;" class="fa fa-check"></i>');
}

function getChildrenFromCurrentFolder(tree, targetFolder) { 
    // Find recursivly all direct children of targeted folder
    if (targetFolder === tree.id) {
	   return tree.folders;
    } else if (tree.folders.length > 0) {
	   var folders = [];
	   for (var i = 0; folders.length === 0 && i < tree.folders.length; i++) {
		  folders = getChildrenFromCurrentFolder(tree.folders[i], targetFolder);
	   }
	   return folders;
    }
    return [];
}

function getBreadcrumb(tree, targetFolder, breadcrumb) {
    // Get the breadcrumb from root to current folder
    if (targetFolder === tree.id) {
	   breadcrumb.unshift({'id': tree['id'], 'name': tree['name']});
	   return breadcrumb;
    } else if (tree.folders.length > 0) {
	   var tmp = [];
	   for (var i = 0; i < tree.folders.length; i++) {
		  tmp = getBreadcrumb(tree.folders[i], targetFolder, breadcrumb);
		  if (tmp.length > 0) {
			 breadcrumb.unshift({'id': tree['id'], 'name': tree['name']});
			 return breadcrumb;
		  }
	   }
    }
    return [];
}