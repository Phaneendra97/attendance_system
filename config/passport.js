var LocalStrategy = require("passport-local").Strategy;

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);


module.exports = function(passport) {
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

 passport.use(
  'local-signup',
  new LocalStrategy({
    
   usernameField : 'username',
   passwordField: 'password',
   passReqToCallback: true
  },
  function(req, username, password, done){
    console.log("I/m at signup");
   connection.query("SELECT * FROM admin WHERE username = ? ", 
   [username], function(err, rows){
    if(err)
     return done(err);
    if(rows.length){
     return done(null, false, req.flash('signupMessage', 'That is already taken'));
    }else{
     var newUserMysql = {
      username: username,
      password: bcrypt.hashSync(password, null, null)
     };

     var insertQuery = "INSERT INTO admin (username, password) values (?, ?)";

     connection.query(insertQuery, [newUserMysql.username, newUserMysql.password],
      function(err, rows){
        if(err) throw err;
       newUserMysql.id = rows.insertId;

       return done(null, newUserMysql);
      });
    }
   });
  })
 );

 passport.use(
  'local-login',
  new LocalStrategy({
   usernameField : 'username',
   passwordField: 'password',
   passReqToCallback: true
  },
  function(req, username, password, done){
    console.log("I/m at login");
   connection.query("SELECT * FROM admin WHERE username = ? ", [username],
   function(err, rows){
    if(err)
     return done(err);
    if(!rows.length){
     return done(null, false, req.flash('loginMessage', 'No User Found'));
    }
    if(!bcrypt.compareSync(password, rows[0].password))
     return done(null, false, req.flash('loginMessage', 'Wrong Password'));
    console.log("end");
    return done(null, rows[0]);
    
   });
  })
 );

 



 
};
