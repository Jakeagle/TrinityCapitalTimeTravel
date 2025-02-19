'use strict';

const lessonRow = 'https://trinitycapitaltestserver-2.azurewebsites.net/lessonArrays';
const lessonModalURL = 'https://trinitycapitaltestserver-2.azurewebsites.net/lessonModals';
const activityModalURL = 'https://trinitycapitaltestserver-2.azurewebsites.net/activityModals';

export const socket = io('https://trinitycapitaltestserver-2.azurewebsites.net');

console.log('Running');

/********************VARIABLES***************************/

const loginBTN = document.querySelector('.login__btn');
const lessonModal = document.querySelector('.lessonModal');
const activityModal = document.querySelector('.activityModal');

/********************SERVER CALLS************************/
async function requestLessons() {
  const res = await fetch(lessonRow, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      parcel: [1],
    }),
  });
}

async function requestLessonModal(lessonName) {
  const res = await fetch(lessonModalURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      parcel: [lessonName],
    }),
  });
}

async function requestActivityModal(activityName) {
  const res = await fetch(activityModalURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      parcel: [activityName],
    }),
  });
}

requestLessons();

/*******************************SOCKET.IO*************************/
socket.on('lessonHtml', htmlCode => {
  const lessonRow = document.querySelector('.lessonRow');

  lessonRow.innerHTML = htmlCode;
});

socket.on('lessonModalHtml', ([htmlCode, lessonName]) => {
  const lessonModal = document.querySelector('.lessonModal');

  console.log(lessonName);
  lessonModal.innerHTML = htmlCode;

  const activityBTN = document.querySelector('.acBTN');
  activityBTN.addEventListener('click', function () {
    lessonModal.close();
    activityModal.showModal();
    requestActivityModal(lessonName);
    socket.on('activityModalhtml', ([htmlCode, Q1]) => {
      const activityModal = document.querySelector('.activityModal');

      activityModal.innerHTML = [htmlCode, Q1];
    });
  });
});
/******************************EVENT LISTENERS********************/
if (loginBTN) {
  loginBTN.addEventListener('click', function () {
    const lesson1BTN = document.querySelector('.lesson1Div');
    lesson1BTN.addEventListener('click', function () {
      lessonModal.showModal();
      const lessonNameDoc = document.querySelector('.lessonName');
      const lessonName = lessonNameDoc.textContent;
      requestLessonModal(lessonName);
    });
  });
}
