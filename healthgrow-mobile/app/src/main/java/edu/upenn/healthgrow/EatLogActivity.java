package edu.upenn.healthgrow;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.util.SparseBooleanArray;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Spinner;

import java.util.ArrayList;
import java.util.List;

public class EatLogActivity extends AppCompatActivity {

    private DataSource dataSource;
    private ArrayList<String> meals;
    private ArrayAdapter adapter;
    private String email;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_eat_log);
        Intent i = getIntent();
        email = i.getStringExtra("email");
        Log.d("debug email", email);


        dataSource = new DataSource();
        List<String> names = new ArrayList<>();
        names.add("Breakfast");
        names.add("Lunch");
        names.add("Dinner");
        Spinner spinner = (Spinner)findViewById(R.id.mealtype);
        ArrayAdapter<String> arrayAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_spinner_item, names);
        arrayAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner.setAdapter(arrayAdapter);

        //populate listview
        meals = dataSource.getAllMealTypes();
        Log.d("mealcount", String.valueOf(meals.size()));
        adapter = new ArrayAdapter(this, android.R.layout.simple_list_item_multiple_choice, meals);
        ListView listview = (ListView) findViewById(R.id.foodlist) ;
        listview.setAdapter(adapter) ;
    }

    public void onClickAdd(View view) {
        Intent i = new Intent(this, AddMealActivity.class);
        i.putStringArrayListExtra("meals", meals);
        startActivityForResult(i, 1);
    }

    public void onActivityResult(int requestCode, int resultCode, Intent data) {

        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == 1) {

            if (resultCode == RESULT_OK) {
                meals.clear();
                meals.addAll(data.getStringArrayListExtra("meals"));
                Log.d("mealcount", String.valueOf(meals.size()));
                adapter.notifyDataSetChanged();
            }
            if (resultCode == RESULT_CANCELED) {
                //Write your code if there's no result
            }
        }
    }//onActivityResult

    @RequiresApi(api = Build.VERSION_CODES.O)
    public void onClickSave(View view) {
        String type = ((Spinner)findViewById(R.id.mealtype)).getSelectedItem().toString();
        ArrayList<String> meals = new ArrayList<>();
        ListView list = findViewById(R.id.foodlist);
        SparseBooleanArray selected = list.getCheckedItemPositions();
        for (int i = 0; i < selected.size(); i++) {
            int key = selected.keyAt(i);
            if (selected.get(key))
                meals.add((String) adapter.getItem(selected.keyAt(i)));
        }

        String mealStr = String.join(", ", meals);
        Log.d("type", type);
        Log.d("mealStr", mealStr);
        dataSource.addMeal(email, type, mealStr);
        Intent i = new Intent();
        setResult(RESULT_OK, i);
        finish();
    }
}
