package web.mybatis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mybatis")
public class MyController {

    @Autowired private MyService myService;

    @PostMapping("/add")
    public int addUser(User user) {
        return myService.addUser(user);
    }

    @GetMapping("/find/all")
    public List<User> findAll() {
        return myService.findAll();
    }
    @GetMapping("/find")
    public User findById( int id ) {
        return myService.findById( id );
    }
    @PutMapping("/update")
    public int updateUser( User User  ) {
        return myService.updateUser( User );
    }
    @DeleteMapping("/delete")
    public int deleteUser( int id ) {
        return myService.deleteUser( id );
    }

}
