package edu.upenn.healthgrow;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.PopupWindow;
import android.widget.TextView;
import android.widget.Toast;

public class AlarmReceiver extends BroadcastReceiver {

    private DataSource dataSource;

    PopupWindow popUp;
    LinearLayout layout;
    TextView tv;
    Button but;
    LinearLayout.LayoutParams params;

    @Override
    public void onReceive(final Context context, Intent intent) {

        dataSource = new DataSource();
        //String email = intent.getStringExtra("email");
        final String email = MainActivity.email;
        if (email == null) {
            Log.d("Notification", "null email");
        }

        if (dataSource.isMood(email)) {
            Log.d("Notification", "yes mood");
        } else {
            Log.d("Notification", "no mood");
            Toast.makeText(context, "You haven't logged your mood today!", Toast.LENGTH_LONG).show();
        }

        popUp = new PopupWindow(context);
        layout = new LinearLayout(context);

        tv = new TextView(context);
        tv.setText("You haven't entered your mood yet today!");

        params = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT,
                LinearLayout.LayoutParams.WRAP_CONTENT);
        layout.setOrientation(LinearLayout.VERTICAL);

        but = new Button(context);
        but.setText("Enter Mood");
        but.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent moodIntent = new Intent(context, MoodLogActivity.class);
                moodIntent.putExtra("email", email);
                context.startActivity(moodIntent);
            }
        });

        layout.addView(tv, params);
        layout.addView(but, params);

        popUp.setContentView(layout);
        popUp.showAtLocation(layout, Gravity.BOTTOM, 10, 10);
        popUp.update(50, 50, 300, 80);

    }
}
