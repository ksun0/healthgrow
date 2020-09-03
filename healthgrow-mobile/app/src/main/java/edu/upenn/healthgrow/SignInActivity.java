package edu.upenn.healthgrow;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

public class SignInActivity extends AppCompatActivity {

    private DataSource dataSource;
    private boolean worked;
    private String email;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        worked = false;
        email = null;
        setContentView(R.layout.activity_sign_in);
        dataSource = new DataSource();
    }

//    protected void onSaveInstanceState(Bundle state) {
//        super.onSaveInstanceState(state);
//        Log.d("debug", "osis sign in activity");
//        state.putSerializable("isSignedIn", worked);
//        if (email != null) {
//            state.putSerializable("email", email);
//        }
//    }

    public void onSignIn(View view) {
        String email = ((EditText)findViewById(R.id.email)).getText().toString();
        String password = ((EditText)findViewById(R.id.password)).getText().toString();
        worked = dataSource.signIn(email, password);

        if (worked) {
            this.email = email;

            Intent intent = new Intent(this, MainActivity.class);
            intent.putExtra("signedIn", true);
            intent.putExtra("email", email);
            intent.putExtra("emailChanged", true);
            startActivity(intent);
        } else {
            Toast.makeText(this, "Incorrect Username or Password", Toast.LENGTH_LONG).show();
        }

    }

    public void onSignUp(View view) {
        Intent i = new Intent(this, UserActivity.class);
        startActivityForResult(i, 1);
    }
}
