package edu.upenn.healthgrow;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.Spinner;

import java.util.ArrayList;
import java.util.List;

public class AddMealActivity extends AppCompatActivity {

    private DataSource dataSource;
    private ArrayList<String> meals;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_meal);
        Intent i = getIntent();
        meals = i.getStringArrayListExtra("meals");
        dataSource = new DataSource();
        List<String> names = new ArrayList<>();
        names.add("Carbohydrate");
        names.add("Protein");
        names.add("Fat");
        Spinner spinner = (Spinner)findViewById(R.id.macro);
        ArrayAdapter<String> arrayAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_spinner_item, names);
        arrayAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner.setAdapter(arrayAdapter);
    }

    public void onClickSave(View view) {
        String name = ((EditText)findViewById(R.id.name)).getText().toString();
        int calories = Integer.parseInt(((EditText)findViewById(R.id.calories)).getText().toString());
        String macro = ((Spinner)findViewById(R.id.macro)).getSelectedItem().toString();
        dataSource.addMealType(name, calories, macro);
        meals.add(name);
        Intent i = new Intent();
        i.putStringArrayListExtra("meals", meals);
        setResult(RESULT_OK, i);
        finish();
    }
}
