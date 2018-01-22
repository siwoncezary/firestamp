"use strict";

(function (window) {
  var FORM = '[data-post="form"]';
  var Aplikacja = window.App;
  var FormHandler = Aplikacja.FormHandler;
  var formHandler = new FormHandler(FORM);
  formHandler.addListener(save);
  console.log(formHandler);

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
      database: firebase.database();
    }
  });

  function save(data) {
    var newPostKey = firebase.database().ref().child('posts').push().key;
    var updates = {};
    updates['/posts/' + newPostKey] = data;
    firebase.database().ref().update(updates);
    console.log("SEND");
  }

  /*
  var postData = {
    author: "CEZ",
    body: "Monia is the best",
    title: "tribute"
    };
    var newPostKey = firebase.database().ref().child('posts').push().key;
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    firebase.database().ref().update(updates);
    console.log("SEND");
    */

  function read() {
    console.log("READ AND SUMA");
    var query = firebase.database().ref('posts').orderByChild('author');
    query.once("value").then(function (snapshot) {
      snapshot.forEach(renderSingleSnapshot);
    }).then(function () {
      //$(document).find('#list').html(markup);
    });
  }

  function renderSingleSnapshot(postref) {
    var post = postref.val();
    console.log(post.body + " " + post.author);
  }
})(window);