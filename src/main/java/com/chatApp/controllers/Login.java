package com.chatApp.controllers;

import com.chatApp.cachingServices.FileCaching;
import com.chatApp.utils.FileConstants;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

/**
 * Created by ankit on 19/2/18.
 */
@WebServlet("/login")
public class Login extends HttpServlet{
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        resp.getOutputStream().write(FileCaching.getFile(FileConstants.CHAT_PAGE.name()));

        String realPath = req.getSession().getServletContext().getRealPath("/");
        resp.getOutputStream().write(FileCaching.readFile(realPath + "/resources/Html/" + FileConstants.CHAT_PAGE.getValue()));

    }
}
