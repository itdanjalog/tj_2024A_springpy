console.log('chat.js')
// JS 클라이언트 웹소켓 # new WebSocket("ws://localhost:8080/ws매핑주소")
let clientSocket = new WebSocket("ws://localhost:8080/chat/conn")
console.log( clientSocket );

// [1] clientSocket 의 onclose , onerror , onmessage , onopen 정의 해야한다.
// (1) WebSocket객체내 onopen 속성은 서버소켓과 접속을 성공했을때 발동되는 함수 정의해서 대입
clientSocket.onopen = ( e ) => {
    console.log("서버소켓과 연결 성공");
}
// (2) WebSocket객체내 onmessage 속성은 서버소켓이 메시지를 보내왔을때 발동되는 함수 정의해서 대입
clientSocket.onmessage = ( e ) => { // e : 매개변수
    console.log( e );
}

// [2] 메시지 전송 이벤트
function onMsgSend(){
    console.log( 'onMsgSend() called')
    // - 현재 클라이언트소켓과 연결 유지된 서버소켓에게 메시지 전송
    clientSocket.send('Hello, ServerSocket!')
}
