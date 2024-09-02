package example.mybatis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/mybatis")
public class MyController {

    @Autowired
    private MyService myService;

    // [C] 1. 등록 http://localhost:8080/mybatis/save?name=손흥민&age=31
    @PostMapping("/save")
    public int save( UserDto userDto ){
        return myService.save(userDto);
    }

    // [R] 2. 전체 출력
    @GetMapping("/findall")
    public List<UserDto> findAll(){
        return myService.findAll();
    }
}
