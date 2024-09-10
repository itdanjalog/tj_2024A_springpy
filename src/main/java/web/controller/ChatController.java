package web.controller;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.ArrayList;
import java.util.List;
import java.util.Vector;

@Component // 해당 클래스를 스프링 컨테이너 빈 등록
public class ChatController extends TextWebSocketHandler {

    // - 클라이언소켓들의 접속명단을 저장하는 컬렉션 프레임워크 // ArrayList(비동기)  vs Vector(동기)
    private List< WebSocketSession > 접속된클라이언트소켓 = new Vector<>();

    // 1. 클라이언트가 서버 웹소켓에 접속 성공 했을때 # Established
    @Override // 재정의
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("session = " + session);
        System.out.println("[서버웹소켓 측] JS 클라이언트 웹소켓 이 들어옴");
        // - 접속된 클라이언트소켓을 접속명단에 저장
        접속된클라이언트소켓.add( session );
        // - 현재 접속된 인원수
        System.out.println( "서버소켓의 접속 인원 : " + 접속된클라이언트소켓.size() );
    }

    // 2. 클라이언트가 서버 웹소켓에 접속 끊었을때. # Closed
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        System.out.println("session = " + session);
        System.out.println("[서버웹소켓 측] JS 클라이언트 웹소켓 이 나감");
        // - 접속된 클라이언소켓을 접속명단에서 제외
        접속된클라이언트소켓.remove( session );
        // - 현재 접속된 인원수
        System.out.println( "서버소켓의 접속 인원 : " + 접속된클라이언트소켓.size() );
    }

}
