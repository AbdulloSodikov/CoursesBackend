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
         dBModule.query('SELECT login FROM users WHERE login = "' + httpRequest.query.login + '" AND password ="' 
                     + httpRequest.query.password+'"', function(dbError,dbRespose) {
                         if (dbRespose.length == 1){
                             token = jwtModule.sign({'login': httpRequest.query.login }, 'super-puper-secret', {expiresIn: '1d'});
                             httpRespose.send(token);
                             
                         }
                         else {
                             httpRespose.send('400');
                         }
             
                    });
             
         })
          
   webModule.get('/courses', function(httpRequest, httpRespose){
    
    data = jwtModule.verify(httpRequest.query.loginToken, 'super-puper-secret', { expiresIn: '1d' });
    login = data.login;
    dBModule.query('select courses.title, mentors.fio from  courses, mentors where courses.id in (select id_course from users where login = "'+login+'") and mentors.id in (select id_mentors from  courses where id in (select id_course from users where login = "'+login+'"))', function(dbError,dbRespose) {
        httpRespose.send(dbRespose);
        }); 
    }) 

    webModule.get('/lectures', function(httpRequest, httpRespose){
        data = jwtModule.verify(httpRequest.query.loginToken, 'super-puper-secret', { expiresIn: '1d' });
        login = data.login;
        dBModule.query('SELECT title, published, photo, video, shownotes  FROM lectures where id_course in (select id_course from users where login = "'+login+'")' , function(dbError,dbRespose) {
        httpRespose.send(dbRespose);
        }); 
    }) 
    
