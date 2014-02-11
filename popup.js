var tree = null;
var currentFolder = null;
$(document).ready(function() {
    // Get global tree from database
//    $.get("", function(data) {
//	   
//    });
    // Fake
    tree = {
	   'id': 1,
	   'name': 'Mes Bookmarks',
	   'folders': [
		  {
			 'id': 2,
			 'name': 'Sciences',
			 'folders': [
				{
				    'id': 3,
				    'name': 'Biologie',
				    'folders': []
				},
				{
				    'id': 4,
				    'name': 'Astrophysique',
				    'folders': [
					   {
						  'id': 8,
						  'name': 'Cosmologie',
						  'folders': []
					   }
				    ]
				},
				{
				    'id': 5,
				    'name': 'Mathématiques',
				    'folders': []
				}
			 ]
		  },
		  {
			 'id': 6,
			 'name': 'Actualités',
			 'folders': []
		  },
		  {
			 'id': 7,
			 'name': 'Bandes-dessinées',
			 'folders': []
		  }
	   ]
    };
    currentFolder = {'id': 1, 'name': 'Mes Bookmarks'};
    displayFolders();
    
    $(document).on("click", "#folderWrapper .folder", function() {
	   currentFolder = {'id': parseInt($(this).attr('data-id')), 'name': $(this).html()};
	   displayFolders();
    });
});

function displayFolders() {
    $('.folder').remove();
    var folders = getChildrenFromCurrentFolder(tree, currentFolder.id);
    $('#currentFolder').html(currentFolder.name);
    for (i = folders.length-1; i >= 0; i--)
	   $('#folderWrapper').prepend('<div data-id="'+folders[i]['id']+'" class="btn folder">'+folders[i]['name']+'</div>');
}

function getChildrenFromCurrentFolder(tree, targetFolder) {
    // Find recursivly all direct children of targeted folder
    if (targetFolder == tree['id'])
	   return tree['folders'];
    for (i = 0; i < tree['folders'].length; i++)
	   return getChildrenFromCurrentFolder(tree['folders'][i], targetFolder);
}