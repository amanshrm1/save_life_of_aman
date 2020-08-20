import { Request, Response, Router } from 'express'
import { client } from '..';
import { bcrypt, salt } from './registrationRoute';

const router = Router();

router.get('/forget',( req: Request, res: Response ) => {
  res.send(`
      <style>
      .container {
        padding:10% 45% 30% 35%;
        background-color: #A0A0A0;
      }
      </style>
      </head>
      <form action="http://localhost:3000/forget" method="POST">
        <div class="container">
        <h1>Set password</h1>
        <hr>
  
        <label><b>mobile no.</b></label>
        <input type="number" placeholder="Enter Mobile no." name="mobile" required>
        </br></br>
        <label><b>New Password</b></label>
        <input type="password" placeholder="New Password" name="newpassword" required>
        </br></br>
        <hr>
        <button type="submit">Set password</button>
    </div>
  </form>
  `)
})

router.post('/forget', (req: Request, res: Response) => {

  const {mobile, newpassword} = req.body;

  client.query(`select exists(select 1 from information where mobile='${mobile}')`,(err,result)=>{
    if(err){
      res.send(err);
    }else{
      if(result.rows[0].exists){
        bcrypt.hash(newpassword,salt,(err1,res1)=>{
          if(err1){
            res.send(err)
          }else{
            client.query(`update information set password=${res1} where mobile=${mobile}`,(err2,re2)=>{
              if(err){
                res.send(err);
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
                </br>
                <h5 style="color:green"> !! Password updated successfully !!
                <hr>
                <button type="submit">login</button>
                <a style="margin-left:35% " href="http://localhost:3000/forget">forgot password</a>
                <p>Don't have an account? <a href="http://localhost:3000/registration">Sign up</a>.</p>
              </div>
            </form>
            `)
              }
            })
          }
        })
      }
    }
  })
})

export {router}