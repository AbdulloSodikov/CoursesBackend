expressPackage = require('express');
webModule = expressPackage();
webModule.listen(500);

mySqlPackage = require('mysql');

dBModule = mySqlPackage.createConnection({
    host     : '94.199.18.141',
    port     : 3325,
    user     : 'ilmhona',
    password : 'Android3',
    database : 'courses_a_sodikov'
   });
   dBModule.connect();
  
   
   jwtModule = require('jsonwebtoken');
   webModule.get('/auth', function(httpRequest, httpRespose){
       console.log('SELECT login FROM users WHERE login = "' + httpRequest.query.login + '" AND password ="' 
       + httpRequest.query.password +'"');
           dBModule.query('SELECT login FROM users WHERE login = "' + httpRequest.query.login + '" AND password ="' 
                + httpRequest.query.password +'"', function(dbError,dbRespose) {
                    if (dbRespose.length == 0) {
                    httpRespose.send(dbRespose);
                    
                } else {
                      httpRespose.send('400');
                   }
                  
                }); 
            }) 
  
   webModule.get('/courses', function(httpRequest, httpRespose){
    
    dBModule.query('select title from courses', function(dbError,dbRespose) {
        httpRespose.send(dbRespose)
        }); 
    }) 

    webModule.get('/mentors', function(httpRequest, httpRespose){
            dBModule.query('select fio from mentors' , function(dbError,dbRespose) {
            httpRespose.send(dbRespose)
            }); 
        }) 

    webModule.get('/lectures', function(httpRequest, httpRespose){
        
    dBModule.query('SELECT title, published FROM lectures' , function(dbError,dbRespose) {
        httpRespose.send(dbRespose)
        }); 
    }) 
    
