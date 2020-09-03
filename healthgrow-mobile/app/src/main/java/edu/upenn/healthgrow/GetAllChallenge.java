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
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

public class GetAllChallenge extends AsyncTask<URL, String,  Map<Integer, List<String>>> {

    private String email;

    public GetAllChallenge(String email) {
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
    protected Map<Integer, List<String>> doInBackground(URL... urls) {
        try {

            //Workouts and Journals

            JSONArray workoutsArray = getArray(urls[0]);
            JSONArray mealsArray = getArray(urls[1]);
            JSONArray moodsArray = getArray(urls[2]);
            JSONArray journalsArray = getArray(urls[3]);

            //Achievements

            JSONArray challengeArray = getArray(new URL("http://10.0.2.2:2000/getallchallenges"));
            List<String> compChal = new ArrayList<String>();
            List<String> incompChal = new ArrayList<String>();
            List<String> points = new ArrayList<String>();
            points.add("0");


            for (int i = 0; i < challengeArray.length(); i++) {
                JSONObject row = challengeArray.getJSONObject(i);
                Log.d("hi", String.valueOf(row));
                String dateStr = row.getString("timeBegin");
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
                Date beginDate = sdf.parse(dateStr);
                dateStr = row.getString("timeExpire");
                Date endDate = sdf.parse(dateStr);

                Challenge a = new Challenge(row.getString("model"),
                        row.getString("operator"),
                        row.getInt("condition"),
                        row.getString("field"),
                        row.getInt("pointValue"),
                        beginDate,
                        endDate);

                Log.d("challenge", a.toString());

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
                    compChal.add(a.toString());
                    String point = points.get(0);
                    int pointInt = Integer.valueOf(point);
                    pointInt += a.pointValue;
                    points.set(0, pointInt + "");
                    Log.d("challenge", "achieved"+a.toString());
                } else {
                    incompChal.add(a.toString());
                    Log.d("challenge", "not achieved"+a.toString());
                }
            }

            Map<Integer, List<String>> map = new HashMap<>();
            map.put(0, incompChal);
            map.put(1, compChal);
            map.put(2, points);

            return map;


        } catch (Exception e) {
            return null;
        }
    }


}
