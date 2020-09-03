package edu.upenn.healthgrow;

import android.os.AsyncTask;
import android.os.Build;
import android.util.Log;

import androidx.annotation.RequiresApi;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Scanner;

public class GetMealList extends AsyncTask<URL, String, ArrayList<String>> {

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    protected ArrayList<String> doInBackground(URL... urls) {
        try {
            URL url = urls[0];
            HttpURLConnection conn = (HttpURLConnection)url.openConnection();
            conn.setRequestMethod("GET");
            conn.connect();
            ArrayList<String> names = new ArrayList<>();
            Scanner in = new Scanner(url.openStream());
            JSONArray array = new JSONArray(in.nextLine());
            for (int i = 0; i < array.length(); i++) {
                JSONObject row = array.getJSONObject(i);
                Log.d("hi", String.valueOf(row));
                names.add(row.getString("types"));
            }
            conn.disconnect();
            return names;
        } catch (Exception e) {
            return null;
        }
    }

    protected void onPostExecute(String msg) {

    }
}
