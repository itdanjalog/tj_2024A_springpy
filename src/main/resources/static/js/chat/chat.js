console.log('chat.js')
// --- 비회원제 , 익명 식별이름 생성
    // Math.random()                    :  0 ~ 1 사이의 난수
    // Math.random() * 끝값(미만)        :  0 ~ 끝값 사이의 난수
    // ( Math.random() * 끝값 ) + 시작값 :  시작값 ~ 끝값 사이의 난수
    // Math.floor( )                   :  소수점 제거 함수
let randomNo = Math.floor( Math.random() * 1001) + 1
let nickName = `익명${randomNo}`
console.log(nickName)

// JS 클라이언트 웹소켓 # new WebSocket("ws://localhost:8080/ws매핑주소")
let clientSocket = new WebSocket("ws://192.168.30.9:8080/chat/conn")
console.log( clientSocket );

// [1] clientSocket 의 onclose , onerror , onmessage , onopen 정의 해야한다.
    // (1) WebSocket객체내 onopen 속성은 서버소켓과 접속을 성공했을때 발동되는 함수 정의해서 대입
clientSocket.onopen = ( e ) => {
    // 1. 클라이언트 서버와 접속을 성공했을때 (알림) 메시지 구성
    let msg = {
        'type' : 'alarm' , // (알림)메시지
        'message' : `${ nickName }님이 입장 했습니다.`
    }
    // 2. 보내기
    clientSocket.send( JSON.stringify( msg ) );
}

    // (2) WebSocket객체내 onmessage 속성은 서버소켓이 메시지를 보내왔을때 발동되는 함수 정의해서 대입
clientSocket.onmessage = ( messageEvent ) => { // e : 매개변수
    console.log( messageEvent );
    console.log( messageEvent.data ) // 받은 내용물이 들어있는 속성
    // 1. 받은 메시지를 출력할 HTML 호출
    let msgBox = document.querySelector('.msgBox')
    // 2. 받은 메시지의 내용물( .data 속성) 를 HTML 에 대입
    msg = JSON.parse( messageEvent.data  )  // - JSON.parse( 문자열  ) : 문자열타입(JSON형식) --> js객체타입(JSON형식)
        // 2-1 알람 메시지
    if( msg.type == 'alarm'){
        msgBox.innerHTML += `<div class="alarmMsgBox">
                                <span>${ msg.message }</span>
                            </div>`;
        return // 알람 메시지 HTML 출력후 일반 메시지 HTML 코드가 실행되지 않도록 함수 종료
    }
        // 2-2 일반 메시지
    if( msg.from == nickName  ){ // - 내가 보낸 메시지
        msgBox.innerHTML += `<div class="fromMsgBox">
                                <div> ${ msg.from } </div>
                                <div>
                                    <span> ${ msg.date.split(' ')[4] } </span>
                                    <span> ${ msg.message } </span>
                                </div>
                            </div>`
    }else{  // - 남이 보낸 메시지
        msgBox.innerHTML += `<div class="toMsgBox">
                                <div> ${ msg.from } </div>
                                <div>
                                    <span> ${ msg.message } </span>
                                    <span> ${ msg.date.split(' ')[4] } </span>
                                </div>
                            </div>`
    }
}
// [2] 메시지 전송 이벤트
function onMsgSend(){
    //
    let msgInput = document.querySelector('.msgInput')
    // - (일반)메시지 내용 들을 객체 형식으로 구성
    let msg = {
        'type' : 'msg' ,  // (일반)메시지
        'message' : msgInput.value ,
        'from' : nickName ,
        'date' : new Date().toLocaleString()
    }
    // - 현재 클라이언트소켓과 연결 유지된 서버소켓에게 메시지 전송 # .send( ) : 서버소켓에게 메시지 전송
    clientSocket.send( JSON.stringify( msg )  );
        // msg ----> [object Object]
        // JSON.stringify( msg ) ---> {"message":"DFGDFG","from":"익명209","date":"2024. 9. 12. 오후 12:18:21"}

        // - JSON.stringify( js객체  ) : js객체타입(JSON형식) --> 문자열타입(JSON형식)
        // -  "3"(문자열타입 숫자형식) VS 3(정수타입 숫자형식)
        // -  { key : value } (객체타입 JSON형식 )  vs   "{ key : value }" ( 문자열타입 JSON형식 )
    //
    msgInput.value = "";
}
















