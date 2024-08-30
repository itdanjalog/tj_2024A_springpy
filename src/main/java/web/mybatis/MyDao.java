package web.mybatis;

import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
public interface MyDao {

    int addUser( User User);

    List<User> findAll();

    User findById( int id);

    int updateUser(  User User );

    int deleteUser( int id);

}
