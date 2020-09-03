package edu.upenn.healthgrow;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;

public class JournalLogActivity extends AppCompatActivity {

    private DataSource dataSource;
    private String email;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_journal_log);
        dataSource = new DataSource();
        Intent i = getIntent();
        email = i.getStringExtra("email");
        Log.d("debug email", email);

    }

    public void onClickSave(View view) {
        String title = ((EditText)findViewById(R.id.title)).getText().toString();
        String text = ((EditText)findViewById(R.id.text)).getText().toString();
        dataSource.addJournal(email, title, text);
        Intent i = new Intent();
        setResult(RESULT_OK, i);
        finish();
    }
}
