function changeFollowStatus(){
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/profile/follow',
    contentType: false
  }).done(changeFollowButtonContent).fail(function(jqXHR, textStatus, err) {
    console.log('AJAX ERROR RESPONSE', textStatus);
  });


}
function changeFollowButtonContent(){
  $("followmeButton").on("click", function() {
    alert("Following");
    var content = document.getElementById("followmeButton");
    if(content.innerText == "Follow Me") content.innerText = "Following";
    else content.innerText == "Follow Me";
});

}
function likePost(url){
  $.ajax({
    type: 'GET',
    url: url,
    contentType: false
  });
}
//function shareFacebook( url, text, image) {
  //console.log(url);
  //open('http://facebook.com/sharer.php?s=100&p[url]=' + url + '&p[images][0]=' + image + '&p[title]=' + text, 'fbshare', 'height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0');
//}
//
//Social Sharing
function shareTwitter(url, text) {
  open('http://twitter.com/share?url=' + url + '&text=' + text, 'tshare', 'height=400,width=550,resizable=1,toolbar=0,menubar=0,status=0,location=0');
}

function shareFacebook(url, text, image) {
  open('http://facebook.com/sharer.php?s=100&p[url]=' + url + '&p[images][0]=' + image + '&p[title]=' + text, 'fbshare', 'height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0');
}

function shareGooglePlus(url) {
  open('https://plus.google.com/share?url=' + url, 'gshare', 'height=270,width=630,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0');
}
