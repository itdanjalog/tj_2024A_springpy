
// 3. 서버에게 메시지 전송
function onSend(){
	// 3-1 textarea 입력값 호출
	let msaValue = document.querySelector('.msg').value;
	if( msaValue == '' || msaValue == '\n' ){
		document.querySelector('.msg').value = ``;
		return;
	}

    $.ajax({
        async : false , method : 'get' , url : '/api/chat' ,
        data : { message : msaValue } ,
        success : r => { console.log(r);

                document.querySelector('.msg').value = ``;
                	let msg = r.response

                	// 2. msg속성내 content 속성의  \n -> <br> 치환후 결과를 content속성에 대입
                		// - replace( ) 문자열 교체/치환/바꾸기 함수
                	msg = msg.replace(/\n/g, '<br>') // 줄바꿈을 <br>로 변경
                	msg = msg.replace(/\*\*([^*]+)\*\*/g, '<h6>$1</h6>'); // **제목**을 <strong>제목</strong>으로 변경
                    msg = msg.replace('*', '');

                	// 1. 어디에 출력할껀지
                	let chatcont = document.querySelector('.chatcont')
                	// 2. 무엇을
                	let html = ``;

                    html += `<div class="rcont">
                                <div class="subcont">
                                    ${  msg  }
                                </div>
                            </div>`;

                	chatcont.innerHTML += html;

        }
    })


}
