const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config({ path: '.env' });

const app = express();
const path = require('path');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const challengesRouter = require('./routes/challenges');
const workoutsRouter = require('./routes/workouts');
const journalsRouter = require('./routes/journals');
const usersRouter = require('./routes/users');
const achievementsRouter = require('./routes/achievements');
const gardensRouter = require('./routes/gardens');
const moodsRouter = require('./routes/moods');
const mealsRouter = require('./routes/meals');

app.use('/api/challenges', challengesRouter);
app.use('/api/workouts', workoutsRouter);
app.use('/api/journals', journalsRouter);
app.use('/api/users', usersRouter);
app.use('/api/achievements', achievementsRouter);
app.use('/api/gardens', gardensRouter);
app.use('/api/moods', moodsRouter);
app.use('/api/meals', mealsRouter);

// other app.use middleware : Static file declaration
app.use(express.static(path.join(__dirname, "client", "build")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
