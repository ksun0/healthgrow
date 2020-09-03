package edu.upenn.healthgrow;

import android.os.AsyncTask;
import android.os.Build;
import android.util.Log;

import androidx.annotation.RequiresApi;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Scanner;

public class CreateMealTask extends AsyncTask<URL, String, String> {

    private String type;
    private String mealStr;
    private String email;


    public CreateMealTask (String email, String type, String mealStr) {
        this.email = email;
        this.type = type;
        this.mealStr = mealStr;
    }

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    protected String doInBackground(URL... urls) {
        try {
            URL url = urls[0];
            HttpURLConnection conn = (HttpURLConnection)url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json;charset=utf-8");
            conn.setRequestProperty("Accept", "application/json");
            conn.setDoOutput(true);

            String jsonInputString = "{\"type\": \"" + type + "\", \"email\": \"" + email +  "\", \"mealStr\": \"" + mealStr + "\"}";
            try(OutputStream os = conn.getOutputStream()) {
                byte[] input = jsonInputString.getBytes("utf-8");
                os.write(input, 0, input.length);
            } catch (Exception e) {
                Log.d("complete", e.toString());
            }


            try(BufferedReader br = new BufferedReader(
                    new InputStreamReader(conn.getInputStream(), "utf-8"))) {
                StringBuilder response = new StringBuilder();
                String responseLine = null;
                while ((responseLine = br.readLine()) != null) {
                    response.append(responseLine.trim());
                }
                System.out.println(response.toString());
                conn.disconnect();
                return response.toString();
            }


        } catch (Exception e) {
            return e.toString();
        }
    }

    protected void onPostExecute(String msg) {

    }
}
