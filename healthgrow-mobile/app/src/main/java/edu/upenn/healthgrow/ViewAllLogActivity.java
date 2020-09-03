package edu.upenn.healthgrow;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import java.util.ArrayList;

public class ViewAllLogActivity extends AppCompatActivity {

    private DataSource dataSource;
    private ArrayList<String> logs;
    private ArrayAdapter adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_view_all_log);
        dataSource = new DataSource();

        Intent i = getIntent();
        String email = i.getStringExtra("email");
        Log.d("debug email", email);
        //populate listview
        logs = dataSource.getAllLogs(email);
        adapter = new ArrayAdapter(this, android.R.layout.simple_list_item_1, logs);
        ListView listview = (ListView) findViewById(R.id.loglist) ;
        listview.setAdapter(adapter) ;
    }
}
