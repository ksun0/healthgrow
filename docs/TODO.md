# To Do
Features to implement
* Travis, codecov integration for PR
* Sessions for users
* Make modal for crud stuff
* d3 smooth transitions when data react state changes
* Abstract out admin CRUD (like Django admin automatically create CRUD for models)
* Live updating of browser/dashboard when database changes (e.g. from mobile)
* Transfer ownership of repository

Known Bugs
* Let android use react routes instead of express
* Filter search bar resets window location
* Achievements: allow for no model selection (not required), have fixed selections for field
* Add image to workout and gardens on react side (base 64 encoding/decoding)
* edit achievement logic has to be dynamic on the mobile end (gautam logic) -- currently only support "total" (AVG, COUNT, SUM)

Kevin
* different dashboard whether admin/user logged in (either react +redux or react outh)
* Logout button
* Delete user also delete associated workouts/journals (or maybe not if option to save user data)
* Add datepicker to workouts (create time series viz) -- edit is changes updatedAt but chart does not change
* react bootstrap invalid Hook Call Warning (multiple react?)