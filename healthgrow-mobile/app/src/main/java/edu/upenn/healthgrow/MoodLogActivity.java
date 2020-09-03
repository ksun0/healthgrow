package edu.upenn.healthgrow;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

public class MoodLogActivity extends AppCompatActivity {

    private DataSource dataSource;
    private int rating;
    private int[] temp_tags = {0,0,0,0,0,0};
    private String[] labels = {"happy", "calm", "anxious", "angry", "high-energy", "low-energy"};
    private int[] colors = {Color.LTGRAY, Color.DKGRAY};
    private String email;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_mood_log);
        dataSource = new DataSource();
        Intent i = getIntent();
        email = i.getStringExtra("email");
        Log.d("debug email", email);

    }

    public void onMoodSave(View view) {
        makeToast("clicked save");
        String text = ((EditText)findViewById(R.id.note)).getText().toString();
        String[] tags = createTags();
        dataSource.addMood(email, rating, tags, text);

        Intent i = new Intent();
        setResult(RESULT_OK, i);
        finish();
    }

    private String[] createTags() {
        int count = 0;
        for (int i = 0; i < temp_tags.length; i++) {
            if (temp_tags[i] == 1) {
                count++;
            }
        }
        String[] ret = new String[count];
        int count2 = 0;
        for (int i = 0; i < temp_tags.length; i++) {
            if (temp_tags[i] == 1) {
                ret[count2] = labels[i];
                count2++;
            }
        }
        return ret;
    }

    public void onRadioButtonClicked(View view) {
        switch(view.getId()) {
            case R.id.mood1:
                rating = 1;
                break;
            case R.id.mood2:
                rating = 2;
                break;
            case R.id.mood3:
                rating = 3;
                break;
            case R.id.mood4:
                rating = 4;
                break;
            case R.id.mood5:
                rating = 5;
                break;
        }
        makeToast("rating is" + rating);
    }

    public void onTagButtonClicked(View view) {
        int temp = 0;
        switch(view.getId()) {
            case R.id.tag1:
                temp_tags[0] = (1 + temp_tags[0]) % 2;
                view.setBackgroundColor(colors[temp_tags[0]]);
                temp = 0;
                break;
            case R.id.tag2:
                temp_tags[1] = (1 + temp_tags[1]) % 2;
                view.setBackgroundColor(colors[temp_tags[1]]);
                temp = 1;
                break;
            case R.id.tag3:
                temp_tags[2] = (1 + temp_tags[2]) % 2;
                view.setBackgroundColor(colors[temp_tags[2]]);
                temp = 2;
                break;
            case R.id.tag4:
                temp_tags[3] = (1 + temp_tags[3]) % 2;
                view.setBackgroundColor(colors[temp_tags[3]]);
                temp = 3;
                break;
            case R.id.tag5:
                temp_tags[4] = (1 + temp_tags[4]) % 2;
                view.setBackgroundColor(colors[temp_tags[4]]);
                temp = 4;
                break;
            case R.id.tag6:
                temp_tags[5] = (1 + temp_tags[5]) % 2;
                view.setBackgroundColor(colors[temp_tags[5]]);
                temp = 5;
                break;
        }
        makeToast("tag "+labels[temp]+ " set to " + temp_tags[temp]);
    }

    private void makeToast(String s) {
        String text = s;

        Toast toast = Toast.makeText(getApplicationContext(), text, Toast.LENGTH_SHORT);
        toast.show();
    }
}
