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
  
   
   loginToken = 'a';
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
    
