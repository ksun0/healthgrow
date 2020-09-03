package edu.upenn.healthgrow;

import android.os.AsyncTask;
import android.os.Build;
import android.util.Log;

import androidx.annotation.RequiresApi;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class GetAchievements extends AsyncTask<URL, String, List<String>> {

    private String email;

    public GetAchievements(String email) {
        this.email = email;
    }

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    private JSONArray getArray(URL url) throws Exception {
        Log.d("url", String.valueOf(url));
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/json;charset=utf-8");
        conn.setRequestProperty("Accept", "application/json");
        conn.setDoOutput(true);

        String jsonInputString = "{\"email\": \"" + email + "\"}";
        Log.d("hi", jsonInputString);
        try (OutputStream os = conn.getOutputStream()) {
            byte[] input = jsonInputString.getBytes("utf-8");
            os.write(input, 0, input.length);
        } catch (Exception e) {
            Log.d("complete", e.toString());
        }

        String res = "";

        try (BufferedReader br = new BufferedReader(
                new InputStreamReader(conn.getInputStream(), "utf-8"))) {
            StringBuilder response = new StringBuilder();
            String responseLine = null;
            try {
                while ((responseLine = br.readLine()) != null) {
                    response.append(responseLine + "\n");
                }
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                try {
                    conn.getInputStream().close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            res = response.toString();
            Log.d("res", res);
        }

        conn.disconnect();

        return new JSONArray(res);
    }

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    protected List<String> doInBackground(URL... urls) {
        try {

            //Workouts and Journals

            JSONArray workoutsArray = getArray(urls[0]);
            JSONArray mealsArray = getArray(urls[1]);
            JSONArray moodsArray = getArray(urls[2]);
            JSONArray journalsArray = getArray(urls[3]);
//            Log.d("hi", "workout"+String.valueOf(workoutsArray.length()));
//            Log.d("hi", "meals"+String.valueOf(mealsArray.length()));
//            Log.d("hi", "moods"+String.valueOf(moodsArray.length()));
//            Log.d("hi", "journals"+String.valueOf(journalsArray.length()));

            //Achievements

            JSONArray achievementsArray = getArray(new URL("http://10.0.2.2:2000/getallachievements"));
            List<String> allAch = new ArrayList<String>();
//            Log.d("hi", String.valueOf(achievementsArray.length()));

            for (int i = 0; i < achievementsArray.length(); i++) {
                JSONObject row = achievementsArray.getJSONObject(i);
                Log.d("hi", String.valueOf(row));
                Achievement a = new Achievement(row.getString("model"),
                        row.getString("operator"),
                        row.getInt("condition"),
                        row.getString("field"));

                JSONArray correctArray;
                switch (a.model) {
                    case "Workout": correctArray = workoutsArray;
                    break;
                    case "Meal": correctArray = mealsArray;
                    break;
                    case "Mood": correctArray = moodsArray;
                    break;
                    default: correctArray = journalsArray;
                    break;
                }

                if (a.achieved(correctArray)) {
                    allAch.add(a.toString());
                    Log.d("hi", "achieved"+a.toString());
                }
            }

            return allAch;


        } catch (Exception e) {
            return null;
        }
    }


}
