package web.controller;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import javax.swing.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("/api")
@RestController
public class SpringAiController {

    private RestTemplate restTemplate = new RestTemplate();

    @Value("AIzaSyAGH_PFfJojOBYYCPAed5JFwY75UKX1Sy4")
    private String apiKey;

    @Value("https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent")
    private String apiUrl;

    @GetMapping("/chat")
    public Map<String, String> chat( String message) {
        // API 호출을 위한 URL 설정
        String requestUrl = apiUrl + "?key=" + apiKey;

        // HTTP 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // 요청 본문 생성 (필드 이름 수정)
        //String requestBody = "{ message : \"너는누구야\" }"; // 'input' 대신 'message' 사용

        String requestBody = String.format( "{\"contents\":[{\"parts\":[{\"text\":\"%s\"}]}]}" , message );  // 'messages' 구조 사용
        System.out.println("requestBody = " + requestBody);

        // 요청 엔티티 생성
        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        // API 요청 보내기
        ResponseEntity<Map> response = restTemplate.exchange(requestUrl, HttpMethod.POST, entity, Map.class);

        // 응답 처리
        List<Map> candidates = (List<Map>) response.getBody().get("candidates");

        String vertexAiResponse = "";
        if (candidates != null && !candidates.isEmpty()) {
            Map content = (Map) candidates.get(0).get("content");
            List<Map> parts = (List<Map>) content.get("parts");
            if (parts != null && !parts.isEmpty()) {
                vertexAiResponse = (String) parts.get(0).get("text");
            }
        }

        Map<String, String> responses = new HashMap<>();
        responses.put("response", vertexAiResponse);
        return responses;
    }
}
