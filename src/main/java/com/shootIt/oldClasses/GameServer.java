package com.shootIt.oldClasses;

import java.io.IOException;
import java.io.InputStream;
import java.net.ServerSocket;
import java.net.Socket;

/**
 * Created by ankit on 18/2/18.
 */
public class GameServer extends Thread{

    private static GameServer gameServer;
    private static ServerSocket serverSocket;

    public static GameServer getGameServerInstance() {
        if (gameServer == null) {
            gameServer = new GameServer();
            Thread t = new Thread(gameServer);
            t.start();
            //gameServer.createServer();
        }
        return gameServer;
    }

    public void run() {
        createServer();
    }

    private void createServer() {
        try {
            serverSocket = new ServerSocket(1234);
            Socket st;
            while ((st = serverSocket.accept()) != null) {
                System.out.println(st);
                InputStream is = st.getInputStream();
                byte[] b = new byte[1];

                while (is.read(b) != -1) {

                    System.out.println((char)b[0]);
                }
                is.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
