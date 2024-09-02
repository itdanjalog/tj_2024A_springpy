package example.mybatis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/mybatis")
public class MyController {

    @Autowired
    private MyService myService;

    @GetMapping("/findall")
    public List<UserDto> findAll(){
        return myService.findAll();
    }
}
