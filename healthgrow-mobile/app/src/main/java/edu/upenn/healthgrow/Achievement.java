package edu.upenn.healthgrow;

import android.util.Log;

import org.json.JSONArray;
import org.json.JSONObject;

public class Achievement {
    protected String model;
    protected String operator;
    protected int condition;
    protected String field;

    public Achievement(String model, String operator, int condition, String field) {
        this.model = model;
        this.operator = operator;
        this.condition = condition;
        this.field = field;
    }

    public String toString() {
        return field + " " + model + " " + operator + " " + condition;
    }

    public boolean achieved(JSONArray array) {
        try {
            if (field.equals("total")) {
                int total = array.length();
                if (operator.equals("<")) {
                    return total < condition;
                } else if (operator.equals("=")) {
                    return total == condition;
                } else {
                    return total > condition;
                }
            }
        } catch (Exception e) {
            return false;
        }

        return false;
    }
}
