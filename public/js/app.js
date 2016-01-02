var app = angular.module('myApp',
[
  'ui.router',
  'ngMaterial',
  'ngFileUpload',
  'ngImgCrop',
  'ngSanitize',
  'ngCookies',
  'angularUtils.directives.dirDisqus',
]);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider){
  $locationProvider.html5Mode(true);

  $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

  $stateProvider
    .state('home', {
      url: '/',
      views: {
        'mainToolbar': {
          templateUrl: 'views/mainToolbar.html'
        },
        '': {
          templateUrl: 'views/thumbnails.html'
        }
      }
    })
    .state('signin', {
      url: '/signin',
      views: {
        'mainToolbar': {
          templateUrl: 'views/mainToolbar.html'
        },
        '': {
          templateUrl: 'views/signin.html'
        }
      }
    })
    .state('admin', {
      url: '/admin/add',
      views: {
        'mainToolbar': {
          templateUrl: 'views/mainToolbar.html'
        },
        '': {
          templateUrl: 'views/añadirArticulo.html'
        }
      },
      onEnter: function(){
        thumbnailCtrl.expandFlex = true;
      },
      onExit: function(){
        thumbnailCtrl.expandFlex = false;
      }
    })
    .state('article', {
      url: '/article?id',
      views: {
        'mainToolbar': {
          templateUrl: 'views/mainToolbar.html'
        },
        '': {
          templateUrl: 'views/article.html'
        }
      },
      onEnter: function(){
        thumbnailCtrl.getThumbnails();
      }
    })
    .state('contacto', {
      url: '/contacto',
      views: {
        'mainToolbar': {
          templateUrl: 'views/mainToolbar.html'
        },
        '': {
          templateUrl: 'views/contacto.html'
        }
      }
    });


  $urlRouterProvider.otherwise('/');
});

app.config(function($mdThemingProvider){
  $mdThemingProvider.theme('default')
    .primaryPalette('purple')
    .accentPalette('deep-purple');
});
