import { Request, Response } from 'express';
import {router} from './loginRoutes';
import { client } from '../index';
import validator from 'validator';
import bcrypt from 'bcrypt';
const salt = 10;

router.get('/registration',(req: Request, res: Response)=>{
  
  res.send(`
    <head>
      <style>
      .container {
        padding:10% 45% 30% 35%;
        background-color: #A0A0A0;
      }
      </style>
    </head>
    <form action="http://localhost:3000/registration" method="POST">
    <div class="container">
      <h1>Register</h1>
      <hr>
  
      <label><b>Username</b></label>
      <input type="text" placeholder="Enter Username" name="username" required>
      </br></br>
      <label><b> email </b></label>
      <input type="email" placeholder="Enter email" name="email" required>
      </br></br>
      <label><b>Password</b></label>
      <input type="password" placeholder="Password" name="password" required>
      </br></br>
      <label><b>Mobile No.</b></label>
      <input type="number" placeholder="Enter mobile No." name="mobile" required>
      <hr>
      <button type="submit" >Register</button>
      <p>Already have an account? <a href="http://localhost:3000/login">Sign in</a>.</p>
    </div>
  </form>
  
  `);
})

router.post('/registration',( req: Request, res: Response ) => { 

  const { username, email, password, mobile } = req.body;

  if(validator.isEmail(email) && validator.isMobilePhone(mobile)){
    bcrypt.hash(password, salt, function(err, hash) {
      if(err){
        res.send(err)
      }else{
        client.query(`INSERT INTO INFORMATION(username, email, password, mobile, created_on) VALUES('${username}','${email}','${hash}','${mobile}',now() )`, ( err ) => {
          if(err){
            res.send(err)
          }else{
            res.redirect('http://localhost:3000/login')
          }
        })
      }
    });
  }else{
    res.send(`
    <head>
      <style>
      .container {
        padding:10% 45% 30% 35%;
        background-color: #A0A0A0;
      }
      </style>
    </head>
    <form action="http://localhost:3000/registration" method="POST">
    <div class="container">
      <h1>Register</h1>
      <hr>
  
      <label><b>Username</b></label>
      <input type="text" placeholder="Enter Username" required>
      </br></br>
      <label><b> email </b></label>
      <input type="email" placeholder="Enter email" required>
      <h5>Please check the email input type. Eg:-'something@something</h5>
      </br>
      <label><b>Password</b></label>
      <input type="password" placeholder="Password" required>
      </br></br>
      <label><b>Mobile No.</b></label>
      <input type="string" placeholder="Enter mobile No." required>
      <h5>Please check the phone no</h5>
      <hr>
      <button type="submit" >Register</button>
      <p>Already have an account? <a href="http://localhost:3000/login">Sign in</a>.</p>
    </div>
  </form>
  
  `)
  }
})

export { router, salt, bcrypt }