package example.mybatis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Service
public class MyService {

    @Autowired private MyDao myDao;
    // [C] 1. 등록
    public int save( UserDto userDto ){
        return myDao.save(userDto);
    }

    public List<UserDto> findAll(){
        return myDao.findAll();
    }
}
