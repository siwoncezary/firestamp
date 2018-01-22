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
    console.log("START");
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
      database = firebase.database();
    }
    read();
  });

  function save(data) {
    var newPostKey = firebase.database().ref().child('posts').push().key;
    var updates = {};
    if (validate(data)){
      updates['/posts/' + newPostKey] = data;
      firebase.database().ref().update(updates);
      console.log("SEND");
      read();
    }
  }

  function read() {
    console.log("READ");
    var query = firebase.database().ref('posts').orderByChild('author');
    query.once("value").then(function (snapshot) {
      snapshot.forEach(renderSingleSnapshot);
    }).then(function () {
      //$(document).find('#list').html(markup);
    });
  }

  function validate(post){
    return post.body.lenght === 0 || post.author.length === 0 ? false:true;
  }

  function renderSingleSnapshot(postref) {
    console.log(postref.val() + " "+ postref.key);
    listHandler.addRow(postref.val(), postref.key);
  }
})(window);
