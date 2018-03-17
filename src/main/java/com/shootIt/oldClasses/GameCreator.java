package com.shootIt.oldClasses;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by ankit on 18/2/18.
 */

@WebServlet("/newGame")
public class GameCreator extends HttpServlet{
//    public static void main(String[] args) {
//        System.out.println("hey ");
//    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //super.doGet(req, resp);
        resp.getWriter().write("ur got it server");
        GameServer.getGameServerInstance();
    }

}
