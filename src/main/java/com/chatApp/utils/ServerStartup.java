package com.chatApp.utils;

import com.chatApp.cachingServices.FileCaching;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

/**
 * Created by ankit on 19/2/18.
 */
@WebListener
public class ServerStartup implements ServletContextListener{

    public void contextInitialized(ServletContextEvent servletContextEvent) {
//        OnlineUsers.init();
        FileCaching.cacheFiles(servletContextEvent.getServletContext().getRealPath("/"));
    }

    public void contextDestroyed(ServletContextEvent servletContextEvent) {

    }
}
