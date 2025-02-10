This is a personal project  where  you have to register in order to  access  the mini games

There is a registration page  that was done with  google auth  and bycrpt   for authorithation
data will be  stores in postgres database 

register->  menu page ->  select_game

**Set up**
you need to  install all  node modules  with npm i 
next  set up  postgres 

table creation query
<!-- 
CREATE TABLE user3 ( 
    id SERIAL PRIMARY KEY,
    username VARCHAR(40) NOT NULL,
    password VARCHAR(100) NOT NULL,
    secret TEXT
); -->

also  need to set  .env file. fill your data with 

<!-- GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
SESSION_SECRET=""
PG_USER=""
PG_HOST=""
PG_DATABASE=""
PG_PASSWORD=""
PG_PORT="" -->


Demo in  