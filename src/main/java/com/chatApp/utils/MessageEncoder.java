package com.chatApp.utils;

import com.chatApp.entities.UserMessage;
import com.google.gson.Gson;

import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

/**
 * Created by ankit on 19/2/18.
 */
public class MessageEncoder implements Encoder.Text<UserMessage> {

    private static Gson gson = new Gson();

    public String encode(UserMessage userMessage) throws EncodeException {
        String s =  gson.toJson(userMessage);
        System.out.println("message encoded to --" + s);
        return s;
    }

    public void init(EndpointConfig endpointConfig) {

    }

    public void destroy() {

    }
}
