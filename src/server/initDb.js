var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : ''
});

connection.connect();

connection.query("CREATE  TABLE `serenity`.`users` (`userId` INT NOT NULL AUTO_INCREMENT ,`username` VARCHAR(45) NOT NULL ,`password` VARCHAR(45) NULL ,`email` VARCHAR(45) NULL ,PRIMARY KEY (`userId`) ,UNIQUE INDEX `username_UNIQUE` (`username` ASC) ,UNIQUE INDEX `email_UNIQUE` (`email` ASC) );");

connection.end();