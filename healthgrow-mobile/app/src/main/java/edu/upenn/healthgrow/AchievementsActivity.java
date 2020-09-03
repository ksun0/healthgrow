package edu.upenn.healthgrow;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import java.util.ArrayList;
import java.util.List;

public class AchievementsActivity extends AppCompatActivity {

    private DataSource dataSource;
    private List<String> achievements;
    private ArrayAdapter adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_achievements);
        dataSource = new DataSource();

        Intent i = getIntent();
        String email = i.getStringExtra("email");
        //populate listview
        achievements = dataSource.getAchievements(email);
        adapter = new ArrayAdapter(this, android.R.layout.simple_list_item_1, achievements);
        ListView listview = (ListView) findViewById(R.id.achlist) ;
        listview.setAdapter(adapter) ;
    }
}
