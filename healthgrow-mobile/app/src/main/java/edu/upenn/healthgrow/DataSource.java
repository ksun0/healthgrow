package edu.upenn.healthgrow;

import android.graphics.Bitmap;
import android.os.Build;
import android.util.Log;

import androidx.annotation.RequiresApi;

import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class DataSource {

    public void deleteUser(String email, String password) {
        try {
            URL url = new URL("http://10.0.2.2:2000/deleteuser");
            SetUserTask task = new SetUserTask(email, password, "");
            task.execute(url);
        }
        catch (Exception e) {

        }
    }

    public void editUser(String email, String password, String name) {
        try {
            URL url = new URL("http://10.0.2.2:2000/edituser");
            SetUserTask task = new SetUserTask(email, password, name);
            task.execute(url);
        }
        catch (Exception e) {

        }
    }

    public void addUser(String email, String password, String name) {
        try {
            URL url = new URL("http://10.0.2.2:2000/createuser");
            SetUserTask task = new SetUserTask(email, password, name);
            task.execute(url);
        }
        catch (Exception e) {

        }
    }

    public void addWorkout(String workout, int reps, int weight, String img, String email) {
        try {
            URL url = new URL("http://10.0.2.2:2000/createworkout");
            SetWorkoutTask task = new SetWorkoutTask(workout, reps, weight, img, email);
            task.execute(url);
        }
        catch (Exception e) {

        }
    }

    public void addJournal(String email, String title, String text) {
        try {
            URL url = new URL("http://10.0.2.2:2000/createjournal");
            SetJournalTask task = new SetJournalTask(email, title, text);
            task.execute(url);
        }
        catch (Exception e) {

        }
    }

    public void addMood(String email, int rating, String[] tags, String text) {
        try {
            URL url = new URL("http://10.0.2.2:2000/createmood");
            SetMoodTask task = new SetMoodTask(email, rating, tags, text);
            task.execute(url);
        }
        catch (Exception e) {

        }
    }


    public boolean signIn(String email, String password) {
        try {
            URL url = new URL("http://10.0.2.2:2000/signin");
            SignIn task = new SignIn(email, password);
            task.execute(url);
            boolean worked = task.get();
            return worked;
        }
        catch (Exception e) {
            return false;
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.CUPCAKE)
    public List<String> getWorkoutTypes() {
        try {
            URL url = new URL("http://10.0.2.2:2000/allworkouttype");
            GetWorkoutList task = new GetWorkoutList();
            task.execute(url);
            List<String> names = task.get();
            return names;
        }
        catch (Exception e) {
            return null;
        }
    }

    public ArrayList<String> getAllMealTypes() {
        try {
            URL url = new URL("http://10.0.2.2:2000/allmealtype");
            GetMealList task = new GetMealList();
            task.execute(url);
            ArrayList<String> types = task.get();
            return types;
        }
        catch (Exception e) {
            return null;
        }
    }

    public void addMealType(String name, int calories, String macro) {
        try {
            URL url = new URL("http://10.0.2.2:2000/createmealtype");
            AddMealTask task = new AddMealTask(name, calories, macro);
            task.execute(url);
        }
        catch (Exception e) {

        }
    }

    public void addMeal(String email, String type, String mealStr) {
        try {
            URL url = new URL("http://10.0.2.2:2000/createmeal");
            CreateMealTask task = new CreateMealTask(email, type, mealStr);
            task.execute(url);
        }
        catch (Exception e) {

        }
    }

    public List<String> getAchievements(String email) {
        try {
            URL[] urls = new URL[4];
            urls[0] = new URL("http://10.0.2.2:2000/getalllogsworkout");
            urls[1] = new URL("http://10.0.2.2:2000/getalllogsmeal");
            urls[2] = new URL("http://10.0.2.2:2000/getalllogsmood");
            urls[3] = new URL("http://10.0.2.2:2000/getalllogsjournal");
            GetAchievements task = new GetAchievements(email);
            task.execute(urls);
            return task.get();
        }
        catch (Exception e) {
            return null;
        }
    }

    public ArrayList<String> getAllLogs(String email) {
        try {
            URL[] urls = new URL[4];
            urls[0] = new URL("http://10.0.2.2:2000/getalllogsworkout");
            urls[1] = new URL("http://10.0.2.2:2000/getalllogsmeal");
            urls[2] = new URL("http://10.0.2.2:2000/getalllogsmood");
            urls[3] = new URL("http://10.0.2.2:2000/getalllogsjournal");
            GetAllLog task = new GetAllLog(email);
            task.execute(urls);
            return task.get();
        }
        catch (Exception e) {
            return null;
        }
    }

    public boolean isMood(String email) {
        try {
            IsMood task = new IsMood(email);
            URL moodLink = new URL("http://10.0.2.2:2000/ismood");
            task.execute(moodLink);
            return task.get();
        } catch (Exception e) {
            Log.d("Notification", "error in DataSource");
            return false;
        }
    }

    public Map<Integer, List<String>> getAllChallenges(String email) {
        try {
            URL[] urls = new URL[4];
            urls[0] = new URL("http://10.0.2.2:2000/getalllogsworkout2");
            urls[1] = new URL("http://10.0.2.2:2000/getalllogsmeal2");
            urls[2] = new URL("http://10.0.2.2:2000/getalllogsmood2");
            urls[3] = new URL("http://10.0.2.2:2000/getalllogsjournal2");
            GetAllChallenge task = new GetAllChallenge(email);
            task.execute(urls);
            return task.get();
        }
        catch (Exception e) {
            return null;
        }
    }
}
