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
				    'folders': [
					   {
						  'id': 12,
						  'name': 'Neurologie',
						  'folders': []
					   }
				    ]
				},
				{
				    'id': 4,
				    'name': 'Astrophysique',
				    'folders': [
					   {
						  'id': 8,
						  'name': 'Cosmologie',
						  'folders': [
							 {
								'id': 10,
								'name': 'Système solaire',
								'folders': []
							 }
						  ]
					   },
					   {
						  'id': 9,
						  'name': 'Trous noirs',
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
			 'folders': [
				{
				    'id': 11,
				    'name': 'Monde',
				    'folders': []
				}
			 ]
		  },
		  {
			 'id': 7,
			 'name': 'Bandes-dessinées',
			 'folders': [
				{
				    'id': 13,
				    'name': 'Comics',
				    'folders': []
				}
			 ]
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
    if (folders != null)
	   for (i = folders.length-1; i >= 0; i--)
		  $('#folderWrapper').prepend('<div data-id="'+folders[i]['id']+'" class="btn folder">'+folders[i]['name']+'</div>');
//    console.log(getBreadcrumb(tree, currentFolder.id, []));
}

function getChildrenFromCurrentFolder(tree, targetFolder) {
    console.log(tree); // caca
    // Find recursivly all direct children of targeted folder
    if (targetFolder == tree.id) {
	   return tree.folders;
    } else if (tree.folders != null) {
	   var folders = null;
	   for (i = 0; folders == null && i < tree.folders.length; i++) {
		  folders = getChildrenFromCurrentFolder(tree.folders[i], targetFolder);
	   }
	   return folders;
    }
    return null;
}

function getBreadcrumb(tree, targetFolder, breadcrumb) {
    // Display the breadcrumb from root to current folder
    breadcrumb.push({'id': tree['id'], 'name': tree['name']})
    if (targetFolder == tree['id'])
	   return breadcrumb;
    for (i = 0; i < tree['folders'].length; i++)
	   return getBreadcrumb(tree['folders'][i], targetFolder, breadcrumb);
}