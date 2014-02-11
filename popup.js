$(document).ready(function() {
    // Get global tree from database
//    $.get("", function(data) {
//	   
//    });
    // Fake
    var tree = {
	   'name': 'Mes Bookmarks',
	   'folders': [
		  {
			 'name': 'Sciences',
			 'folders': [
				{
				    'name': 'Biologie',
				    'folders': []
				},
				{
				    'name': 'Astrophysique',
				    'folders': []
				},
				{
				    'name': 'Mathématiques',
				    'folders': []
				}
			 ]
		  },
		  {
			 'name': 'Actualités',
			 'folders': []
		  },
		  {
			 'name': 'Bandes-dessinées',
			 'folders': []
		  }
	   ]
    };
    var currentFolder = 'Mes Bookmarks';
    $('#currentFolder').html(currentFolder);
    var folders = getChildrenFromCurrentFolder(tree, currentFolder);
    for (i = folders.length-1; i >= 0; i--)
	   $('#folderWrapper').prepend('<div class="btn folder">'+folders[i]['name']+'</div>');
});

function displayFolders() {
    
}

function getChildrenFromCurrentFolder(tree, targetFolder) {
    // Find recursivly all direct children of targeted folder
    if (targetFolder == tree['name'])
	   return tree['folders'];
    for (i = 0; i < tree['folders'].length; i++)
	   return getChildrenFromCurrentFolder(tree['folders'][i], targetFolder);
}