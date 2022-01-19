package com.koreait.community.board.fav;

import com.koreait.community.UserUtils;
import com.koreait.community.model.BoardFavEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FavService {
    @Autowired
    private FavMapper mapper;
    @Autowired
    private UserUtils userUtils;

    public int insBoardFav(BoardFavEntity entity){
        entity.setIuser(userUtils.getLoginUserPk());
        return mapper.insBoardFav(entity);
    }
    
    public int delBoardFav(int iboard){
        return mapper.delBoardFav(setBoardFavEntity(iboard));
    }

    public BoardFavEntity selBoardFav(int iboard){
        return mapper.selBoardFav(setBoardFavEntity(iboard));
    }
    
    private BoardFavEntity setBoardFavEntity (int iboard){
        BoardFavEntity entity = new BoardFavEntity();
        entity.setIboard(iboard);
        entity.setIuser(userUtils.getLoginUserPk());
        return entity;
    }
}
