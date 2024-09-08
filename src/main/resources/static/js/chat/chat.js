
// new WebSocket(`ws://localhost:8080/chatConnect`);
let clientSocket = new WebSocket(`ws://localhost:8080/chatConnect`);

clientSocket.onopen = ( e ) => { console.log(e) }
clientSocket.onclose = ( e ) => { console.log(e) }
clientSocket.onerror = e => { console.log('서버와 오류발생:'+e ); };
clientSocket.onmessage = e => onMsg( e );

// 3. 서버에게 메시지 전송
function onSend(){
	// 3-1 textarea 입력값 호출
	let msaValue = document.querySelector('.msg').value;
	if( msaValue == '' || msaValue == '\n' ){
		document.querySelector('.msg').value = ``;
		return;
	}
	// 3-2 메시지 전송 .. .

	let msg = { type : 'message' , content : msaValue }

	clientSocket.send( JSON.stringify( msg ) );
	// 클라이언트소켓과 연결된 서버소켓에게 메시지 전송 ----> 서버소켓의 @OnMessage 으로 이동
	// 3-3 메시지 전송 성공시 입력상자 초기화
	document.querySelector('.msg').value = ``;
}

// 4. 메시지를 받았을때 후추 행동(메소드) 선언
function onMsg( e ){
    console.log( e )
	// 1. 전달받은 내용물을 JSON타입으로 형변환
	// let msgBox = JSON.parse( e.data );		//  e.data : 서버로 부터 전달받은 내용물 e.data 속성에 있는 상태
	// console.log( msgBox )
	let msg = JSON.parse( e.data );

	// 2. msg속성내 content 속성의  \n -> <br> 치환후 결과를 content속성에 대입
		// - replace( ) 문자열 교체/치환/바꾸기 함수
	msg.content = msg.content.replace( /\n/g , '<br>' );

	// 1. 어디에 출력할껀지
	let chatcont = document.querySelector('.chatcont')
	// 2. 무엇을
	let html = ``;

    html += `<div class="rcont">
                <div class="subcont">
                    ${  msg.content  }
                </div>
            </div>`;

	chatcont.innerHTML += html;
} // f end

// 5. textarea 입력창에서 입력할때마다 이벤트 발생 함수
function onEnterKey(){
	// 2. 만약에 ctrl + 엔터 이면 줄바꿈.
	if( window.event.keyCode == 13 && window.event.ctrlKey ){ // 조합키 : 한번에 두개 이상 입력 가능한 키 [ ctrl.shift+alt 등]
		document.querySelector('.msg').value += `\n`; return;
	}
	// 1. 만약에 입력한 키 가 [엔터] 이면 메시지 전송
	if( window.event.keyCode == 13 ){ onSend(); return; }
}