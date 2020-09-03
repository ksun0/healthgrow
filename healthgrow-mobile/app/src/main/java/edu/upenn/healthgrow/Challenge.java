package edu.upenn.healthgrow;


import android.util.Log;

import org.json.JSONArray;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Challenge {
    public String model;
    public String operator;
    public int condition;
    public String field;
    public int pointValue;
    public Date timeBegin;
    public Date timeExpire;

    public Challenge(String model, String operator, int condition, String field, int pointValue, Date timeBegin, Date timeExpire) {
        this.model = model;
        this.operator = operator;
        this.condition = condition;
        this.field = field;
        this.pointValue = pointValue;
        this.timeBegin = timeBegin;
        this.timeExpire = timeExpire;
    }
    public String toString() {
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        Date curr = new Date();
        if (curr.before(timeExpire)) {
            return field + " " + model + " " + operator + " " + condition + ", ending today";
        } else {
            return field + " " + model + " " + operator + " " + condition + ", ended: " + sdf.format(timeExpire);
        }

    }

    public boolean achieved(JSONArray array) {
        try {
            if (field.equals("total")) {
                int total = 0;
                for (int i = 0; i < array.length(); i++) {
                    JSONObject row = array.getJSONObject(i);
                    String dateStr = row.getString("createdAt");
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
                    Date creationDate = sdf.parse(dateStr);
                    Log.d("challenge", String.valueOf(creationDate));
                    if (creationDate.after(timeBegin) && creationDate.before(timeExpire)) {
                        total++;
                    }
                    Log.d("challenge", String.valueOf(total));
                }
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
