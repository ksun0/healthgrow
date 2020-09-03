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

public class SetMoodTask extends AsyncTask<URL, String, String> {

    private int rating;
    private String[] tags;
    private String text;
    private String email;


    public SetMoodTask (String email, int rating, String[] tags, String text) {
        this.rating = rating;
        this.tags = tags;
        this.text = text;
        this.email = email;
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

            String jsonInputString = "{\"rating\": " + rating + tagsToUrl() + ", \"email\": \"" + email + "\", \"text\": \"" + text + "\"}";
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

    private String tagsToUrl() {

        if (tags.length == 0) {
            return "";
        } else if (tags.length == 1) {
            return  ", \"tags\":  [\"" + tags[0] + "\"]";
        } else {
            String temp = "";
            for (String t : this.tags) {
                temp = temp + "\"" + t + "\",";
            }
            temp = temp.substring(0, temp.length() - 1);
            return ", \"tags\":  [" + temp + "]";
        }
    }

    protected void onPostExecute(String msg) {

    }
}

