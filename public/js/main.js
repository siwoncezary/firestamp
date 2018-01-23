"use strict";

(function (window) {
  var FORM = '[data-post = "form"]';
  var LIST = '[data-list-post = "list"]';
  var App = window.App;
  var database;
  var FormHandler = App.FormHandler;
  var ListHandler = App.ListHandler;
  var formHandler = new FormHandler(FORM);
  var listHandler = new ListHandler(LIST);
  var provider = new firebase.auth.GoogleAuthProvider;
  var user;

    formHandler.addListener(save);
  $(document).ready(function () {
    var config = {
      apiKey: "AIzaSyBo02_aVQdCMASZBnYO41lTzWbIoF8pagk",
      authDomain: "kratka-95546340.firebaseapp.com",
      databaseURL: "https://kratka-95546340.firebaseio.com",
      projectId: "kratka-95546340",
      storageBucket: "kratka-95546340.appspot.com",
      messagingSenderId: "467575575173"
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
      database = firebase.database();
    }

    firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
      user = result.user;
      $('#user').text(user.displayName);
      $('#logout').text('Wyloguj');
    }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
    });

    readAll();

    $('#delete').click(function(){
      var delist = listHandler.getChecked();
      delist.forEach(function(item){
        del(item);
      });
      readAll();
    });

    $('#check-all').click(function(){
      console.log($('#check-all').attr('value'));
      if ($('#check-all').attr('value') === 'on') {
        $('#check-all').attr('value','off');
        listHandler.checkAll();
        $('#check-all').text('Usuń zaznaczenia');
      } else {
        listHandler.uncheckAll();
        $('#check-all').attr('value', 'on');
        $('#check-all').text('Zaznacz wszystko');
      }
    })

    $('#logout').click(function(){
      firebase.auth().signOut().then(function() {
        $('#user').text('wylogowany');
        $('#logout').text('zaloguj');
      }).catch(function(error) {
        // An error happened.
      });
    });
  });

  function save(data) {
    var newPostKey = firebase.database().ref().child('posts').push().key;
    var updates = {};
    if (validate(data)){
      updates['/posts/' + newPostKey] = data;
      firebase.database().ref().update(updates);
      listHandler.addRow(data, newPostKey);
      console.log("SEND");
      //read();
    }
  }

  function del(key){
    firebase.database().ref("posts").child(key).remove();
  }

  function readAll() {
    console.log("READ");
    var query = firebase.database().ref('posts').orderByChild('author');
    listHandler.clear();
    query.once("value").then(function (snapshot) {
      snapshot.forEach(renderSingleSnapshot);
    }).then(function () {
    //
    });
  }

  function validate(post){
    return !(post.body.length === 0 || post.author.length === 0);
  }

  function renderSingleSnapshot(postref) {
    console.log(postref.val() + " "+ postref.key);
    listHandler.addRow(postref.val(), postref.key);
  }

})(window);
