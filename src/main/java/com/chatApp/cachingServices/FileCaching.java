package com.chatApp.cachingServices;

import com.chatApp.utils.FileConstants;

import java.io.*;
import java.util.HashMap;
import java.util.Map;


/**
 * Created by ankit on 19/2/18.
 */
public class FileCaching {
    private static Map<String, byte[]> filesMap = new HashMap();

    public static byte[] getFile(String fileKey) {
        return filesMap.get(fileKey);
    }

    public static void cacheFiles(String realPath) {
        try {
            addFile(FileConstants.LOGIN_PAGE.name(), realPath + "/resources/Html/" + FileConstants.LOGIN_PAGE.getValue());
            addFile(FileConstants.CHAT_PAGE.name(), realPath + "/resources/Html/" + FileConstants.CHAT_PAGE.getValue());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void addFile(String fileKey, String filePath) throws IOException {
        File file = new File(filePath);
        if (file.exists()) {
            filesMap.put(fileKey, readFile(file));
        }
    }


    public static byte[] readFile(String filePath) throws IOException {
        File file = new File(filePath);
        return readFile(file);
    }

    public static byte[] readFile(File file) throws IOException {
        byte[] b = new byte[(int) file.length()];
        FileReader fileReader = new FileReader(file);


        FileInputStream fileInputStream = new FileInputStream(file);
        fileInputStream.read(b, 0, (int)file.length());
        return b;
    }

}
