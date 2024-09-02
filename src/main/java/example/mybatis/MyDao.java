package example.mybatis;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MyDao {

    // [1] 추상메소드
    List<UserDto> findAll();

}
