window.fbAsyncInit = function() {
  FB.init({
    appId      : 715380275264110, 
    cookie     : false,
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.2'
  });

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};


function statusChangeCallback(response) {

  //theAvatar.setFacebookID(response.authResponse.userID);
  //console.log("facebook id: " + theAvatar.getFacebookID());

  if (response.status === 'connected') {
    testAPI();
  } else if (response.status === 'not_authorized') {
    document.getElementById('status').innerHTML = 'Please log into this app.';
  } else {
    document.getElementById('status').innerHTML = 'Please log into Facebook.';
  }
}

  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  function post() {
    FB.login(function(response) {
      statusChangeCallback(response);
      FB.api('/me/feed', 'post', {message: 'testing post function'});
    }, {
        scope: 'publish_actions',
        auth_type: 'rerequest'});
  }

  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/all.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log(response);
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Welcome back, ' + response.name + '!';
    });
    FB.api('/me/permissions', function(response) {
      if (response && !response.error) {
        console.log(response);
      }});
    FB.api('/me/friends', function(response) {
      if (response && !response.error) {
        console.log(response);
      }});
    FB.api('/me/taggable_friends', function(response) {
      if (response && !response.error) {
        console.log(response);
      }});
  }