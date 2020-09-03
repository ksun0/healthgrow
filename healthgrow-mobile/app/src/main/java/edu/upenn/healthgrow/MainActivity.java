package edu.upenn.healthgrow;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.PopupWindow;
import android.widget.TextView;
import android.widget.Toast;

import java.util.Calendar;
import java.util.TimeZone;


public class MainActivity extends AppCompatActivity {

    private boolean isSignedIn;
    protected static String email;

    private DataSource dataSource;

    PopupWindow popUp;
    LinearLayout layout;
    TextView tv;
    Button but;
    LinearLayout.LayoutParams params;

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Intent intent = getIntent();
        isSignedIn = intent.getBooleanExtra("signedIn", false);
        email = intent.getStringExtra("email");

        Log.d("Notification", "onCreate");

        if (isSignedIn) {
            Log.d("Notification", "isSignedIn");

            String newText = "Signed In as " + email;
            ((TextView) findViewById(R.id.textView)).setText(newText);

            Calendar calendar = Calendar.getInstance();
            Log.d("Notification", "hi" + String.valueOf(calendar.get(Calendar.HOUR_OF_DAY)));
            if (calendar.get(Calendar.HOUR_OF_DAY) > 12) {
                popUp = new PopupWindow(MainActivity.this);

                dataSource = new DataSource();
                //String email = intent.getStringExtra("email");

                if (email == null) {
                    Log.d("Notification", "null email");
                }

                if (dataSource.isMood(email)) {
                    Log.d("Notification", "yes mood");
                } else {
                    Log.d("Notification", "no mood");
                    showPopUp();
                }
            } else {
                Log.d("Notification", "not time");
            }

            //start();
        }
    }

    private void showPopUp() {

        layout = new LinearLayout(MainActivity.this);

        tv = new TextView(MainActivity.this);
        tv.setText("You haven't entered your mood yet today!");

        params = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT,
                LinearLayout.LayoutParams.WRAP_CONTENT);
        layout.setOrientation(LinearLayout.VERTICAL);

        but = new Button(MainActivity.this);
        but.setText("Enter Mood");
        but.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                popUp.dismiss();

                Intent moodIntent = new Intent(MainActivity.this, MoodLogActivity.class);
                moodIntent.putExtra("email", email);
                startActivity(moodIntent);
            }
        });

        layout.addView(tv, params);
        layout.addView(but, params);

        popUp.setContentView(layout);

        findViewById(R.id.main_page_layout).post(new Runnable() {
            public void run() {
                popUp.showAtLocation(layout, Gravity.BOTTOM, 10, 10);
                popUp.update(50, 50, 600, 300);
            }
        });

    }

//    @Override
//    public void onAttachedToWindow() {
//        super.onAttachedToWindow();
//        popUp.showAtLocation(layout, Gravity.BOTTOM, 10, 10);
//        popUp.update(50, 50, 600, 300);
//    }

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    private void start() {
        Log.d("Notification", "start method");

        AlarmManager manager = (AlarmManager) getSystemService(Context.ALARM_SERVICE);
        Intent alarmIntent = new Intent(this, AlarmReceiver.class);
        if (this.email == null) {
            Log.d("Notification", "MainActivity null email");
        }
        alarmIntent.putExtra("email", this.email);
        PendingIntent pendingIntent = PendingIntent.getBroadcast(this, 1, alarmIntent, 0);

        long interval = 1000 * 60 * 60 * 24;

        Calendar calendar = Calendar.getInstance();
        int minutes = calendar.get(Calendar.MINUTE);
        calendar.set(Calendar.MINUTE, minutes + 1);
//        calendar.set(Calendar.HOUR_OF_DAY, 21);
//        calendar.set(Calendar.MINUTE, 21);
//        calendar.set(Calendar.SECOND, 0);
//        calendar.set(Calendar.MILLISECOND, 0);
//        calendar.set(Calendar.HOUR_OF_DAY, 20);
//        calendar.set(Calendar.MINUTE, 2);
//        calendar.set(Calendar.SECOND, 0);


        if (calendar.get(Calendar.HOUR_OF_DAY) > 18) {
            manager.setExact(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), pendingIntent);
        }
//        manager.setRepeating(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), interval, pendingIntent);
    }

//    protected void onSaveInstanceState(Bundle state) {
//        super.onSaveInstanceState(state);
//        Log.d("debug", "osis main activity");
//        state.putSerializable("email", email);
//        state.putSerializable("isSignedIn", isSignedIn);
//    }

    public void onClickGeneral(View view) {
        Intent intent = new Intent(this, NewGeneralLogActivity.class);
        intent.putExtra("signedIn", true);
        intent.putExtra("email", email);
        startActivity(intent);
    }

    public void onLogOut(View view) {
        String newText = "Not Signed In";
        ((TextView) findViewById(R.id.textView)).setText(newText);
        Intent i = new Intent(this, SignInActivity.class);
        startActivity(i);
    }

    public void onAchievements(View view) {
        Intent i = new Intent(this, AchievementsActivity.class);
        i.putExtra("email", email);
        startActivityForResult(i, 1);
    }

    public void onDeleteUser(View view) {
        Intent i = new Intent(this, DeleteUserActivity.class);
        i.putExtra("email", email);
        startActivity(i);
    }

    public void onEditUser(View view) {
        Intent i = new Intent(this, EditUserActivity.class);
        i.putExtra("email", email);
        startActivity(i);
    }

    public void onClickContact(View view) {
        Intent i = new Intent(this, ContactActivity.class);
        i.putExtra("email", email);
        startActivityForResult(i, 1);
    }

    public void onClickLog(View view) {
        Intent i = new Intent(this, ViewAllLogActivity.class);
        i.putExtra("email", email);
        startActivityForResult(i, 1);
    }

    public void onChallenge(View view) {
        Intent i = new Intent(this, ChallengeActivity.class);
        i.putExtra("email", email);
        startActivity(i);
    }

}
