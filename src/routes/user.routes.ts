import  { Router } from 'express';

const  router = Router();


router.route('/').get((req, res) => {
          res.send('Hello from the user route');
          });

export default router;