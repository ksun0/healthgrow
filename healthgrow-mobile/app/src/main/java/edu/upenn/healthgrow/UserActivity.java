package edu.upenn.healthgrow;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

public class UserActivity extends AppCompatActivity {

    private DataSource dataSource;
    private boolean signedIn;
    private String email;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user);
        dataSource = new DataSource();
    }

//    protected void onSaveInstanceState(Bundle state) {
//        super.onSaveInstanceState(state);
//        state.putSerializable("isSignedIn", signedIn);
//        if (email != null) {
//            state.putSerializable("email", email);
//        }
//    }

    public void onClickSave(View view) {
        this.email = ((EditText)findViewById(R.id.email)).getText().toString();
        String password = ((EditText)findViewById(R.id.password)).getText().toString();
        String name = ((EditText)findViewById(R.id.name)).getText().toString();
        dataSource.addUser(this.email, password, name);

        Intent intent = new Intent();
        setResult(RESULT_OK, intent);
        finish();
    }
}
