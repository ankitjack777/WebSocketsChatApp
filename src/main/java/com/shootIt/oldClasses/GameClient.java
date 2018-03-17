package com.shootIt.oldClasses;

import java.io.IOException;
import java.net.Socket;

/**
 * Created by ankit on 18/2/18.
 */
public class GameClient extends Thread{
    Socket s;
    public void createClient() {
        try {
            s = new Socket("localhost", 1234);
            s.getOutputStream().write("1st client".getBytes());
            s.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
