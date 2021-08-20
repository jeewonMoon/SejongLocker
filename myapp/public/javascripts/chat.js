let socket = io();

/* 접속 되었을 때 실행 */
socket.on('connect', function() {
//   /* 이름을 입력받고 */
  let name = document.getElementById('infoId').textContent;

  //   /* 서버에 새로운 유저가 왔다고 알림 */
  socket.emit('newUserConnect', name);
});


/* 서버로부터 데이터 받은 경우 */
socket.on('updateMessage', function(data) {
  let chat = document.getElementById('chatWindow');

  if(data.name === "SERVER"){
    let chatMessageEl = drawChatMessageServer(data);
    chat.appendChild(chatMessageEl);
  }else{
    let chatMessageEl = drawChatMessage(data);
    chat.insertBefore(chatMessageEl, chat.firstChild);
  }
});


// 메세지 만들기
function drawChatMessage(data){
  let wrap = document.createElement('p');
  let message = document.createElement('span');
  let name = document.createElement('span');

  name.innerText = data.name;
  message.innerText = data.message;

  name.classList.add('output__user__name');
  message.classList.add('output__user__message');

  wrap.classList.add('output__user');
  wrap.dataset.id = socket.id;

  wrap.appendChild(name);
  wrap.appendChild(message);

  return wrap;
}

// 서버 메세지 만들기
function drawChatMessageServer(data){
  let wrap = document.createElement('p');
  let message = document.createElement('span');

  message.innerText = data.message;

  message.classList.add('output__server__message');

  wrap.classList.add('output__server');
  wrap.dataset.id = socket.id;

  wrap.appendChild(message);

  return wrap;
}


/* 메시지 전송 함수 */
function send() {
  // 입력되어있는 데이터 가져오기
  let message = document.getElementById('chatText').value;
  
  // 가져왔으니 데이터 빈칸으로 변경
  document.getElementById('chatText').value = '';
  document.getElementById('chatText').focus();

  if(!message) return false;

  socket.emit('sendMessage', {
    message
  });
};
