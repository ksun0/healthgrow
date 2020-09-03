package edu.upenn.healthgrow;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class ChallengeActivity extends AppCompatActivity {

    private DataSource dataSource;
    private Map<Integer, List<String>> challenges;
    private List<String> complete;
    private List<String> incomplete;
    private ArrayAdapter adapter1;
    private ArrayAdapter adapter2;
    private String points;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_challenge);
        dataSource = new DataSource();

        Intent i = getIntent();
        String email = i.getStringExtra("email");
        Log.d("debug email", email);
        //populate listview
        challenges = dataSource.getAllChallenges(email);
        complete = challenges.get(1);
        adapter1 = new ArrayAdapter(this, android.R.layout.simple_list_item_1, complete);
        ListView listview1 = (ListView) findViewById(R.id.completelist) ;
        listview1.setAdapter(adapter1);
        points = challenges.get(2).get(0);

        incomplete = challenges.get(0);
        adapter2 = new ArrayAdapter(this, android.R.layout.simple_list_item_1, incomplete);
        ListView listview2 = (ListView) findViewById(R.id.incompletelist) ;
        listview2.setAdapter(adapter2);

        ((TextView) findViewById(R.id.points)).setText(points);
    }
}
