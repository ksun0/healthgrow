package edu.upenn.healthgrow;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.util.Base64;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Spinner;
import android.widget.Toast;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.List;

public class WorkoutLogActivity extends AppCompatActivity {

    private ImageView workoutImg;
    private Bitmap img;
    private DataSource dataSource;
    private String email;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Intent i = getIntent();
        email = i.getStringExtra("email");
        Log.d("debug email", email);

        setContentView(R.layout.activity_workout_log);
        dataSource = new DataSource();
        List<String> names = dataSource.getWorkoutTypes();
        Spinner spinner = (Spinner)findViewById(R.id.workout);
        ArrayAdapter<String> arrayAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_spinner_item, names);
        arrayAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner.setAdapter(arrayAdapter);

        workoutImg = findViewById(R.id.workoutimg);

        workoutImg.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                Intent intent = new Intent();
                intent.setType("image/*");
                intent.setAction(Intent.ACTION_GET_CONTENT);
                startActivityForResult(intent, 0);
            }
        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == 0) {
            if (resultCode == RESULT_OK) {
                try {
                    InputStream in = getContentResolver().openInputStream(data.getData());
                    img = BitmapFactory.decodeStream(in);
                    in.close();

                    workoutImg.setImageBitmap(img);
                } catch (Exception e) { }
            } else if (resultCode == RESULT_CANCELED) {
                Toast.makeText(this, "Cancelled Photo Selection", Toast.LENGTH_LONG).show();
            }
        }
    }

    public void onClickSave(View view) {
        //Making bitmap into base64 string (buffer see schema)
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        img.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream);
        byte[] byteArray = byteArrayOutputStream .toByteArray();
        String base64 = Base64.encodeToString(byteArray, Base64.NO_WRAP);

        String workout = ((Spinner)findViewById(R.id.workout)).getSelectedItem().toString();
        int reps = Integer.parseInt(((EditText)findViewById(R.id.reps)).getText().toString());
        int weight = Integer.parseInt(((EditText)findViewById(R.id.weight)).getText().toString());
        dataSource.addWorkout(workout, reps, weight, base64, email);
        Intent i = new Intent();
        setResult(RESULT_OK, i);
        finish();
    }

}
