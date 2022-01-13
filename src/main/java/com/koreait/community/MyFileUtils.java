package com.koreait.community;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.UUID;

@Component
public class MyFileUtils {

    public void makeFolders(String path){
        File folder = new File(path);
        if(!folder.exists()){
            folder.mkdirs();
        }
    }

    public void delFolderFiles(String path, boolean isDelFolder){
        File file = new File(path);
        if(file.exists()&&file.isDirectory()){
            File[] fileArr = file.listFiles();
            for(File f:fileArr){
                if(f.isDirectory()){
                    delFolderFiles(f.getPath(),true);
                }else {
                    f.delete();
                }
            }
        }
        if(isDelFolder){
            file.delete();
        }
    }

    public void delFile(String path){
        File f = new File(path);
        if(f.exists()){
            f.delete();
        }
    }

    //랜덤파일명 만들기
    public String getRandomFilNm(){
        return UUID.randomUUID().toString();
    }

    public String getRandomFilNm(String fileNm){
        return getRandomFilNm()+getExt(fileNm);
    }

    public String getExt(String fileNm){
        int lastIdx = fileNm.lastIndexOf(".");
        return fileNm.substring(lastIdx);
    }

    public String savefile(String path, MultipartFile mf){
        makeFolders(path);
        String randomFileNm = getRandomFilNm(mf.getOriginalFilename());
        File targetFile = new File(path, randomFileNm);
        try {
            mf.transferTo(targetFile);
        }catch (Exception e){e.printStackTrace();}
        return randomFileNm;
    }
}
