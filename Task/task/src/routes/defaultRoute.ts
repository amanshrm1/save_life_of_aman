import { Request, Response } from 'express';
import { router } from'./registrationRoute';

router.get('/', (req: Request, res: Response) => {
  res.send(`
    <html>
       <body style="padding: 15% 35% 35% 35%">
          <h1 style="color:blue">Click Below To Login</h1>
          </br>
          <a style="padding-left: 20% " href="http://localhost:3000/registration">Register here</a>
       </body>
    </html>
  `)
})

export { router }