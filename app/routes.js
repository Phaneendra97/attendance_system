var mysql = require('mysql');
const cryptr = require('cryptr');

 
var connection = mysql.createConnection(
    {
      host     : 'localhost',
      user     : 'root',
      password : 'root',
      database : 'attendance',
    }
);
connection.connect();

module.exports = function(app, passport) {
 app.get('/', function(req, res){
  res.render('index.ejs');
 });

 app.get('/login', function(req, res){
  res.render('login.ejs', {message:req.flash('loginMessage')});
 });

 app.post('/login', passport.authenticate('local-login', {
  successRedirect: '/tab',
  failureRedirect: '/login',
  failureFlash: true ,
  //session: false
 }),
  function(req, res){
   if(req.body.remember){
    req.session.cookie.maxAge = 1000 * 60 * 3;
   }else{
    req.session.cookie.expires = false;
   }
   res.redirect('/');
  });

  app.get('/signup', function(req, res){
    res.render('signup.ejs', {message: req.flash('signupMessage')});
   });
  
   app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/login',
    failureRedirect: '/signup',
    failureFlash: true
   }));
  
 app.get('/cin', function(req, res){
  res.render('cin.ejs', {message: req.flash('cin-message')});
 });

 app.get('/cinT', function(req, res){
  res.render('cinT.ejs', {message: req.flash('cin-message')});
 });

 app.post('/cin', passport.authenticate('local-cin', {
  successRedirect: '/cin',
  failureRedirect: '/cin',
  failureFlash: true
 }));
 app.get('/cout', function(req, res){
  res.render('cout.ejs', {message: req.flash('cout-message')});
 });

 app.post('/cout', passport.authenticate('local-cout', {
  successRedirect: '/cout',
  failureRedirect: '/cout',
  failureFlash: true
 }));


 app.get('/addEntry', function(req, res){
  res.render('addEntry.ejs', {message: req.flash('signupMessage')});
 }); 

 app.post('/addEntry',  passport.authenticate('local-add', {
  successRedirect: '/tab',
  failureRedirect: '/tab',
  failureFlash: true
 }));

 app.get('/profile', isLoggedIn, function(req, res){
  res.render('profile.ejs', {
   user:req.user
  });
 });

 app.get('/pass',  function(req, res){
     console.log("enroute");
    res.render('pass.ejs', {
      });
   });
 app.get('/tab',  function(req, res){
    console.log("enroute tab");
    if(req.isAuthenticated()){
    var queryString = 'SELECT name, date, checkin, checkout, present, hours FROM emp';
    //let connection = mysql.createConnection(dbaccconfig.connection);
    connection.query(queryString, 
    function(err, rows){
    if(err)    
    throw (err);
    console.log("success");
    res.render('tab.ejs',{page_title:"Test Table",data:rows,cryptr:cryptr});
    });
   // connection.end();
   // res.render('tab.ejs', {
    // user:req.user
    // });
  }
  else
  res.redirect('/');
  });

 app.get('/addEntry',  function(req, res){
    console.log("enroute");
   res.render('addEntry.ejs', {
      });
  }); 
 app.get('/logout', function(req,res){
  req.logout();
  res.redirect('/');
     })
  };
 
function isLoggedIn(req, res, next){
 if(req.isAuthenticated())
  return next();

 res.redirect('/');
}