package com.koreait.community.board;

import com.koreait.community.UserUtils;
import com.koreait.community.model.BoardEntity;
import com.koreait.community.model.BoardVo;
import com.koreait.community.model.BoardDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardService {

    @Autowired
    private BoardMapper mapper;

    @Autowired
    private UserUtils userUtils;

    public List<BoardVo> selBoardList(BoardDto dto){
        return mapper.selBoardList(dto);
    }

    public int insBoard(BoardEntity entity){
        entity.setIuser(userUtils.getLoginUserPK());
        return mapper.insBoard(entity);
    }
}
