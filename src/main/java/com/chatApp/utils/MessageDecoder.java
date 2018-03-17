package com.chatApp.utils;

import com.chatApp.entities.UserMessage;
import com.google.gson.Gson;

import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;

/**
 * Created by ankit on 19/2/18.
 */
public class MessageDecoder implements Decoder.Text<UserMessage>{

    private static Gson gson = new Gson();

    public UserMessage decode(String s) throws DecodeException {
        System.out.println("incomin string to decode ---"+s);
        UserMessage userMessage =  gson.fromJson(s, UserMessage.class);
        return userMessage;
    }

    public boolean willDecode(String s) {
        return (s != null);
    }

    public void init(EndpointConfig endpointConfig) {

    }

    public void destroy() {

    }
}
