package example.mybatis;

import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface MyDao {
    // [1] 추상메소드
    // [C] 1. 등록
    int save( UserDto userDto );
    // 2. 전체출력
    List<UserDto> findAll();
}
