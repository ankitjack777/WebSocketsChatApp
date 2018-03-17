package com.chatApp.utils;

import java.util.ArrayList;

/**
 * Created by ankit on 23/2/18.
 */
public class Util {

    public static boolean isEmpty(String str) {
        if (str == null)
            return true;
        if (str.length() == 0)
            return true;

        return false;
    }

    public static <T> boolean isEmpty(ArrayList<T> obj) {
        if (obj == null)
            return true;
        if (obj.size() == 0)
            return true;

        return false;
    }


    public static <T> boolean isEmpty(T obj[]) {
        if (obj == null)
            return true;
        if (obj.length == 0)
            return true;

        return false;
    }


    public static <T> boolean isSet(T obj) {
        if (obj == null)
            return false;
        return true;
    }


}
