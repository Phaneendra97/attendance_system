var LocalStrategy = require("passport-local").Strategy;
var date = require('date-and-time');
var mysql = require('mysql');

var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);


connection.query('USE ' + dbconfig.database);


module.exports = function(passport) {



passport.use(
  'local-cin',
  new LocalStrategy({
    
   usernameField : 'username',
   passwordField: 'password',
   passReqToCallback: true
  },
  function(req, username, password, done){
    let day = new Date();
    let time = new Date();
    
    console.log("Preauth");
    connection.query("SELECT * FROM account WHERE username = ? ", [username],
   function(err, rows){
    if(err)
     return done(err);
    if(!rows.length){
     return done(null, false, req.flash('cin-message', 'No User Found'));
    }
    if(!(password == rows[0].password))
     return done(null, false, req.flash('cin-message', 'Wrong Password'));
    console.log("end");
    console.log("pre-cin");
     var newUserMysql = {
      username: req.body.username,
               };
     date.format(day, 'YYYY/MM/DD');
     console.log(day);
     date.format(time,'HH:mm:ss'); 
     let present = 1;
     var insertQuery = "INSERT INTO emp (name, date, checkin, present) values (?, ?, ?, ?)";
     connection.query(insertQuery, [newUserMysql.username, day, time, present ],
      function(err, rows){
        if(err) throw err;
       newUserMysql.id = rows.insertId;
       return done(null, false, req.flash('cin-message', 'Success'));
       // return done(err);    
     //  return done(null, newUserMysql);
      });
    });
  })
);

passport.use(
  'local-luncho',
  new LocalStrategy({
    
   usernameField : 'username',
   passwordField: 'password',
   passReqToCallback: true
  },
  function(req, username, password, done){
    let day = new Date();
    let time = new Date();
    
    console.log("Preauth");
    connection.query("SELECT * FROM account WHERE username = ? ", [username],
   function(err, rows){
    if(err)
     return done(err);
    if(!rows.length){
     return done(null, false, req.flash('cin-message', 'No User Found'));
    }
    if(!(password == rows[0].password))
     return done(null, false, req.flash('cin-message', 'Wrong Password'));
    console.log("end");
    console.log("pre-cin");
     var newUserMysql = {
      username: req.body.username,
               };
     date.format(day, 'YYYY/MM/DD');
     console.log(day);
     date.format(time,'HH:mm:ss'); 
     let present = 1;
     var insertQuery = "INSERT INTO lunch (name, date, luncho ) values (?, ?, ?)";
     connection.query(insertQuery, [newUserMysql.username, day, time, present ],
      function(err, rows){
        if(err) throw err;
       newUserMysql.id = rows.insertId;
       return done(null, false, req.flash('cin-message', 'Success'));
       // return done(err);    
     //  return done(null, newUserMysql);
      });
    });
  })
);


passport.use(
  'local-cout',
  new LocalStrategy({
    
    
   usernameField : 'username',
   passwordField: 'password',
   passReqToCallback: true
  },
  function(req, username, password, done){
    
    var day1 = new Date();
     var time1 = new Date();
    console.log("Preauth");
    connection.query("SELECT * FROM account WHERE username = ? ", [username],
   function(err, rows){
    if(err)
     return done(err);
    if(!rows.length){
     return done(null, false, req.flash('cout-message', 'No User Found'));
    }
    if(!(password == rows[0].password))
     return done(null, false, req.flash('cout-message', 'Wrong Password'));
    console.log("end");
    console.log("pre-cout");
     var newUserMysql = {
      username: req.body.username,
               };
     
     
     date.format(day1, 'YYYY-MM-DD');
     date.format(time1, 'HH:mm:ss');
    /* console.log(time1);
     var cin = "SELECT * FROM ?? WHERE ?? = ? and date = ?";
      ctime = connection.query(cin, ['emp','name',username, day1],function(err,result){
       if(err) console.log(err);
       return result[0];
     });*/
      var day = day1.getDate();
     // console.log(ctime);
      var month = new Array();
        month[0] = 1;
        month[1] = 2;
        month[2] = 3;
        month[3] = 4;
        month[4] = 5;
        month[5] = 6;
        month[6] = 7;
        month[7] = 8;
        month[8] = 9;
        month[9] = 10;
        month[10] = 11;
        month[11] = 12;
        var n = month[day1.getMonth()];

      var year = day1.getFullYear();
      var date1 = year + "-" + n + "-" + day;
      console.log(date1); 

     console.log(day1);
     var updateQuery = "UPDATE emp SET checkout = ? WHERE name = ? and date = ?";
     connection.query(updateQuery, [time1,username,date1],
      function(err, rows){
        if(err) throw err;
       
       //return done(err);    
      return done(null, rows[0],req.flash('cout-message', 'Success'));
      });
    }
    );
  })
);

passport.use(
  'local-lunchr',
  new LocalStrategy({
    
    
   usernameField : 'username',
   passwordField: 'password',
   passReqToCallback: true
  },
  function(req, username, password, done){
    
    var day1 = new Date();
     var time1 = new Date();
    console.log("Preauth");
    connection.query("SELECT * FROM account WHERE username = ? ", [username],
   function(err, rows){
    if(err)
     return done(err);
    if(!rows.length){
     return done(null, false, req.flash('cout-message', 'No User Found'));
    }
    if(!(password == rows[0].password))
     return done(null, false, req.flash('cout-message', 'Wrong Password'));
    console.log("end");
    console.log("pre-cout");
     var newUserMysql = {
      username: req.body.username,
               };
     
     
     date.format(day1, 'YYYY-MM-DD');
     date.format(time1, 'HH:mm:ss');
    /* console.log(time1);
     var cin = "SELECT * FROM ?? WHERE ?? = ? and date = ?";
      ctime = connection.query(cin, ['emp','name',username, day1],function(err,result){
       if(err) console.log(err);
       return result[0];
     });*/
      var day = day1.getDate();
     // console.log(ctime);
      var month = new Array();
        month[0] = 1;
        month[1] = 2;
        month[2] = 3;
        month[3] = 4;
        month[4] = 5;
        month[5] = 6;
        month[6] = 7;
        month[7] = 8;
        month[8] = 9;
        month[9] = 10;
        month[10] = 11;
        month[11] = 12;
        var n = month[day1.getMonth()];

      var year = day1.getFullYear();
      var date1 = year + "-" + n + "-" + day;
      console.log(date1); 

     console.log(day1);
     var updateQuery = "UPDATE lunch SET lunchr = ? WHERE name = ? and date = ?";
     connection.query(updateQuery, [time1,username,date1],
      function(err, rows){
        if(err) throw err;
       
       //return done(err);    
      return done(null, rows[0],req.flash('cout-message', 'Success'));
      });
    }
    );
  })
);




};








