// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/*
'use strict';
let page = document.getElementById('buttonDiv');
const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];

function constructOptions(kButtonColors) {
  for (let item of kButtonColors) {
    let button = document.createElement('button');
    button.style.backgroundColor = item;
    button.addEventListener('click', function() {
      chrome.storage.sync.set({color: item}, function() {
        console.log('color is ' + item);
      })
    });
    page.appendChild(button);
  }
}
constructOptions(kButtonColors);

function handleUserForm() {

  let submitBtn = document.getElementById('submitBtn');
  submitBtn.addEventListener('click', function() {

    let userName = document.getElementById('userName').value;
    chrome.storage.sync.set({userName: userName}, function() {
      console.log('userName is ' + userName);
    })
  });
}


handleUserForm();

function retrieveUsers() {
  let retrieveBtn = document.getElementById('retrieveBtn');
  retrieveBtn.addEventListener('click', function() {
    let usersList = document.getElementById('usersList');
    chrome.storage.sync.get('userName', function(data) {
      console.log('Data retrieved from storage:' + data.userName);
      usersList.innerHTML = data.userName;
    })
  });
}

retrieveUsers();
*/