app.factory('$users', function($http, $state, $location, $cookies){
  var $users = {};

  (function setCookie(){
    var CookieDate = new Date;
    var urlUsername = ($location.search()).username;
    var urlImage = ($location.search()).image;
    CookieDate.setFullYear(CookieDate.getFullYear()+1);
    if($cookies.get('username')){
      $users.name = $cookies.get('username');
    }
    if($cookies.get('userImage')){
      $users.userImage = $cookies.get('userImage');
    }
    if (urlUsername) {
      $cookies.put('username', urlUsername, {expires: CookieDate.toGMTString()}); //expires 1 year
      $users.name = urlUsername;
    }
    if(urlImage){
      $cookies.put('userImage', urlImage, {expires: CookieDate.toGMTString()});
      $users.userImage = urlImage;
    }
    if($cookies.get('username') === 'Merunas Grincalaitis' || $cookies.get('username') === 'Merlox' || $cookies.get('username') === 'Merlox Gr'){
      $users.adminMode = true;
    }else{
      $users.adminMode = false;
    }
  })();

  if($users.name){
    $users.loggedIn = true;
  }else{
    $users.loggedIn = false;
  }
  $users.twitter = function(){
    window.location = '/auth/twitter';
  };
  $users.facebook = function(){
    window.location ="/auth/facebook";
  };
  $users.google = function(){
    window.location = "/auth/google";
  };
  $users.signIn = function(myUsername, myPassword){
    $users.loading = true;
    return $http.post('/signin', {
      username: myUsername,
      password: myPassword
    }).success(function(response){
      $state.go('home');
      $users.name = response.username;
      $users.loading = false;
    }).error(function(error){
      console.log('Error', response);
    });
  };
  $users.signUp = function(myUsername, myPassword, myEmail){
    $users.loading = true;
    $http.post('/signup', {
      username: myUsername,
      password: myPassword,
      email: myEmail
    }).success(function(response){
      $state.go('home');
      //Show acc created msg
      console.log('Account created', response);
      $users.name = myUsername;
      $users.loading = false;
    }).catch(function(response){
      console.log('Error', response);
    });
  };
  $users.signOut = function(){
    $users.loading = true;
    $http.get('/signout').success(function(response){
      $state.go('signin');
      //Show logged out msg
      console.log('Logged out', response);
      $users.loggedIn = false;
      $users.loading = false;
      $users.name = '';
      $cookies.remove('username');
      $cookies.remove('userImage');
      $users.adminMode = false;
    }).catch(function(response){
      console.log('Error', response);
    });
  };
  return $users;
});
