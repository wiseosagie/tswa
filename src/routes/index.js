import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initializeDb from '../db';
import tswa from '../controller/tswa';
import account from '../controller/account';

let router = express();

initializeDb(db => {

  // internal middleware
  router.use(middleware({ config, db }));

  // api routes v1 (/v1)
  router.use('/tswa', tswa({ config, db }));
  router.use('/account', account({ config, db }));

});

export default router;
