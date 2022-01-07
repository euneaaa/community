package com.koreait.community.user;

import com.koreait.community.UserUtils;
import com.koreait.community.model.UserEntity;
import org.springframework.beans.BeanUtils;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserMapper mapper;

    @Autowired
    private UserUtils userUtils;

    public int login(UserEntity entity) {
        UserEntity dbUser = null;
        try {
            dbUser = mapper.selUser(entity);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }

        if(dbUser == null) {
            return 2;
        } else if(!BCrypt.checkpw(entity.getUpw(), dbUser.getUpw())) {
            return 3;
        }
        dbUser.setUpw(null);
        dbUser.setRdt(null);
        dbUser.setMdt(null);
        userUtils.setLoginUser(dbUser);
        return 1;
    }

    public int join(UserEntity entity) {
        UserEntity copyEntity = new UserEntity();

        BeanUtils.copyProperties(entity, copyEntity);


        String hashedPw = BCrypt.hashpw(copyEntity.getUpw(), BCrypt.gensalt());
        copyEntity.setUpw(hashedPw);
        return mapper.insUser(copyEntity);
    }


    public int idChk(String uid) {
        UserEntity entity = new UserEntity();
        entity.setUid(uid);
        UserEntity result = mapper.selUser(entity);
        return result == null ? 1 : 0;
    }
}