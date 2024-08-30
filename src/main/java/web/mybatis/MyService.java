package web.mybatis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MyService {

    @Autowired
    private MyDao myDao;

    public int addUser(User user) {   return myDao.addUser(user); }
    public List<User> findAll() { return myDao.findAll();}
    public User findById( int id ) {
        return myDao.findById( id );
    }
    public int updateUser( User User  ) {return myDao.updateUser( User );}
    public int deleteUser( int id ) {
        return myDao.deleteUser( id );
    }

}
