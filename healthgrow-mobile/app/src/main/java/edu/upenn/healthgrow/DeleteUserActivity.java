package edu.upenn.healthgrow;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

public class DeleteUserActivity extends AppCompatActivity {

    private DataSource dataSource;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_delete_user);
        dataSource = new DataSource();
    }

    public void onClickDelete(View view) {
        String email = ((EditText)findViewById(R.id.email)).getText().toString();
        String password = ((EditText)findViewById(R.id.password)).getText().toString();
        //String name = ((EditText)findViewById(R.id.name)).getText().toString();
        dataSource.deleteUser(email, password);
        Intent i = new Intent(this, SignInActivity.class);
        startActivity(i);
    }
}
