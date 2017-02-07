// listen form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

   // save Bookmark
function saveBookmark(e) {

  // prevent form from submitting
  e.preventDefault();

  // Get form values
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if(!validateForm(siteName, siteUrl)){
   return false;
 }

  var bookmark = {
    name: siteName,
    url: siteUrl
  };
/*
  // Test local Storage
  localStorage.setItem('test', 'Hey there');
  console.log(localStorage.getItem('test'));
  localStorage.removeItem('test');
  console.log(localStorage.getItem('test'));
*/
        // Test if bookmarks is null
        if(localStorage.getItem('bookmarks') === null) {
          // Init Array
          var bookmarks = [];
          // add to Array
          bookmarks.push(bookmark);
          // set to localStorage
          localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        } else {
          // Get bookmarks from localStorage
          var  bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
          // Add bookmarks to Array
          bookmarks.push(bookmark);
          // Re-set back to localStorage
          localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        }

        // clear form
        document.getElementById('myForm').reset();

        // Re-fetch bookmarks
        fetchBookmarks();

  }    // saveBookmark ends ------------------->



  // fetch Bookmarks to display
function fetchBookmarks() {
// Get bookmarks from localStorage
var  bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
// Get output id
var bookmarksResults = document.getElementById('bookmarksResults');

    // Build output
    bookmarksResults.innerHTML = '';
    for (var i = 0; i < bookmarks.length; i++) {
      var name = bookmarks[i].name;
      var url = bookmarks[i].url;

      bookmarksResults.innerHTML += '<div class="well">'+
                                  '<h3>'+name+
                                  ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                  '</h3>'+
                                  '</div>';
    }

} // ----End of fetchBookmarks------------>

  // Delete Bookmark
function deleteBookmark(url) {
  // Get bookmarks from localStorage
  var  bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // loop through the localStorage for url to delete
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      bookmarks.splice(i, 1);
    }
  }
  // Re-set back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  // Re-fetch bookmarks
  fetchBookmarks();

} // ---------------End of deleteBookmark -------->

 //  Form Validation
  function validateForm(siteName, siteUrl) {
      // if text fileds are empty
      if (!siteName || !siteUrl) {
        alert('Please fill the form with valid details');
        return false;
      }
     // if not a valid URL
      var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
      var regex = new RegExp(expression);

      if(!siteUrl.match(regex)){
       alert('Please use a valid URL');
       return false;
     }

     return true;
  } // ------ End form Validation ------>


  // ------------------------------------------End -----------------------------------------------------------//
