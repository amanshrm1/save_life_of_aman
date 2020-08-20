import {Router, Request, Response } from 'express';
import { client } from '../index'
import jwt from 'jsonwebtoken'
import * as dotenv1 from 'dotenv'
import { verify } from 'crypto';
import { decode } from 'punycode';
import { router } from './forget';
import bcrypt from 'bcrypt'

dotenv1.config();

router.get('/login',(req: Request, res:Response ) => {
  
    res.send(`
      <style>
      .container {
        padding:10% 45% 30% 35%;
        background-color: #A0A0A0;
      }
      </style>
    </head>
    <form action="http://localhost:3000/login" method="POST">
    <div class="container">
      <h1>Login</h1>
      <hr>
  
      <label><b>Username</b></label>
      <input type="text" placeholder="Enter Username" name="usernameLogin" required>
      </br></br>
      <label><b>Password</b></label>
      <input type="password" placeholder="Password" name="passwordlogin" required>
      </br></br>
      <hr>
      <button type="submit">login</button>
      <a style="margin-left:35% " href="http://localhost:3000/forget">forgot password</a>
      <p>Don't have an account? <a href="http://localhost:3000/registration">Sign up</a>.</p>
    </div>
  </form>
  `)
  
})

router.post('/login', ( req: Request, res: Response) => {
  const { usernameLogin, passwordlogin } = req.body
  const Secret:string = process.env.secret!;
  let token = jwt.sign(req.body, Secret, {
    expiresIn: 86400 // expires in 24 hours
  });

  jwt.verify(token,Secret,( err,decoded )=>{
    if(err){
      res.send({message:'something went wrong'})
    }else{
      if(decoded){
        client.query(`select exists(select 1 from information where username='${usernameLogin}')`,( err, result)=>{
          if(err){
            return res.send(err);
          }else{
            if(result.rows[0].exists == true){
              client.query(`select password from information where username='${usernameLogin}'`,( err1, result1)=>{
                let consumedPassword = result1.rows[0].password;
                if(err1){
                  return console.error(err1);
                }else{
                  bcrypt.compare(passwordlogin,consumedPassword,(err2,result2)=>{
                    console.log(result2)
                    if(err2){
                      res.send(err2)
                    }else{
                      if(result2){
                        res.send(`
                        <html>
                          <div>
                            <h1>Hello! Hope You are enjoying the index page</h1>
                          </div>
                          </br></br>
                          <a href="http://localhost:3000/login">logout</a>
                        </html>
                      `)
                      }else{
                        res.send(`
                        <style>
                        .container {
                          padding:10% 45% 30% 35%;
                          background-color: #A0A0A0;
                        }
                        </style>
                      </head>
                      <form action="http://localhost:3000/login" method="POST">
                      <div class="container">
                        <h1>Login</h1>
                        <hr>
                    
                        <label><b>Username</b></label>
                        <input type="text" placeholder="Enter Username" name="usernameLogin" required>
                        </br></br>
                        <label><b>Password</b></label>
                        <input type="password" placeholder="Password" name="passwordlogin" required>
                        <h5 style="color:red">Please check the passowrd</h5>
                        <hr>
                        <button type="submit">login</button>
                        <a style="margin-left:35% " href="http://localhost:3000/forget">forgot password</a>
                        <p>Don't have an account? <a href="http://localhost:3000/registration">Sign up</a>.</p>
                      </div>
                    </form>
                    `)
                      }
                    }
                  })
                }
              });
            }else{
              res.send(`
              <style>
              .container {
                padding:10% 45% 30% 35%;
                background-color: #A0A0A0;
              }
              </style>
            </head>
            <form action="http://localhost:3000/login" method="POST">
            <div class="container">
              <h1>Login</h1>
              <hr>
          
              <label><b>Username</b></label>
              <input type="text" placeholder="Enter Username" required>
              </br></br>
              <label><b>Password</b></label>
              <input type="password" placeholder="Password" required>
              <h5 style="color:red">Please check the input</h5>
              <hr>
              <button type="submit">login</button>
              <a style="margin-left:35% " href="http://localhost:3000/forget">forgot password</a>
              <p>Don't have an account? <a href="http://localhost:3000/registration">Sign up</a>.</p>
            </div>
          </form>
          `)
            }
          }
      });
      }else{
        res.send({message: 'Not a valid user'})
      }
    }
  })
})

export {router}