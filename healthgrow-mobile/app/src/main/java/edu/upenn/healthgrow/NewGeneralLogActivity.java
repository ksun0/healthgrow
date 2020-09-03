package edu.upenn.healthgrow;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

public class NewGeneralLogActivity extends AppCompatActivity {

    private boolean isSignedIn;
    private String email;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_new_general_log);
        Intent intent = getIntent();
        isSignedIn = intent.getBooleanExtra("signedIn", false);
        email = intent.getStringExtra("email");

        if (isSignedIn) {
            String newText = "Signed In as " + email;
            ((TextView) findViewById(R.id.textView)).setText(newText);
        }
    }

    public void onClickWorkout(View view) {
        Intent i = new Intent(this, WorkoutLogActivity.class);
        i.putExtra("email", email);
        startActivityForResult(i, 1);
    }

    public void onClickJournal(View view) {
        Intent i = new Intent(this, JournalLogActivity.class);
        i.putExtra("email", email);
        startActivityForResult(i, 1);
    }

    //log mental health
    public void onClickMood(View view) {
        Intent i = new Intent(this, MoodLogActivity.class);
        i.putExtra("email", email);
        startActivityForResult(i, 1);
    }

    public void onClickMeal(View view) {
        Intent i = new Intent(this, EatLogActivity.class);
        i.putExtra("email", email);
        startActivityForResult(i, 1);
    }
}
