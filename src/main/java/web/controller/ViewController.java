package web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

    @GetMapping("")
    public String index(){
        return "index.html";   // templates 폴더내 반환할 경로와 파일명
    }

    @GetMapping("/chat")
    public String chat(){
        return "/chat/chat.html";   // templates 폴더내 반환할 경로와 파일명
    }
    @GetMapping("/chat/openai")
    public String openai(){
        return "/chat/openai.html";   // templates 폴더내 반환할 경로와 파일명
    }

}
