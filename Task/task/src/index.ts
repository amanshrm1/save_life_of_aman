/* 
  command to run - npm start 
  server runnig at localhost : 3000
  Database :- postgres from Elephant SQL
  working:-
        1.  Default            'http:localhost:3000/' ->
        2.  registration       'http:localhost:3000/registration' ->
        3. if(registration == sucessful){    //validators on email and mobile no.
            information saved to db  AND  page redirects to the login page. 
          }else{
            Error will be thrown
          } 
        4. login                'http:localhost:3000/login' ->
        5. if(login == successful){
            Welcome msg will be displayed 
            logout at any time
          }else{
            Error for invalid inputs
          }
  Security:- used bcrypt to store and check with encrytpion and decryption 
  also used Token checking.

*/
import express from 'express';
import { router } from './routes/defaultRoute'
import bodyParser from 'body-parser'
import pg from 'pg';
import * as dotenv from "dotenv"
import { error } from 'console';

const app = express();
dotenv.config();

const client = new pg.Client(process.env.database_URL);
client.connect(( err ) => {
  if(err){
    return console.error('could not connect to postgres', err);
  }else{
    console.log('database is connected');
  }
})

app.use(bodyParser.urlencoded({extended:true}))
app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`listning on ${process.env.PORT}`);
})

export { client ,dotenv}