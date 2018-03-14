import mongoose from 'mongoose';
import { Router } from 'express';
import Tswa from '../model/tswa';
import bodyParser from 'body-parser';
import { authenticate } from '../middleware/authMiddleware';

export default({ config, db }) => {
  let api = Router();

  //CRUD - Create Read Update Delete

  // '/v1/twsa/add'
  api.post('/add', authenticate, (req, res) => {
    //let newT

    let newTswa = new Tswa();
    newTswa.name = req.body.name;
    newTswa.translation = req.body.translation;

    newTswa.save(function(err) {
      if (err) {
        console.log('new');
      //  res.send('new');
        res.send(err);
      }
      res.json({ message: 'New word added to lexicon' });

    });
  });

  // 'v1/tswa' - Read
  api.get('/', (req,res) => {
    Tswa.find({}, (err, tswas) => {
      if (err) {
        res.send(err);
      }
      res.json(tswas);
    })
  })

  //v1/tswa/:id - Read 1
  api.get('/:id', (req, res) => {
    Tswa.findById(req.params.id, (err, tswa) => {
      if (err) {
        res.send(err);
      }
      res.json(tswa);
    });
  });

  //v1/tswa/:id - Update
  api.put('/:id', (req, res) => {
    Tswa.findById(req.params.id, (err, tswa) => {
      if (err) {
        res.send(err);
      }
      tswa.name = req.body.name;
      tswa.save(err => {
        if (err) {
          res.send(err);
        }
        res.json({ message: "Tswa word has been updated" });
      });
    });
  });

  // 'v1/tswa/:id' - Delete
  api.delete('/:id', (req, res) =>  {
    Tswa.remove({
      _id: req.params.id
    }, (err, tswa) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Word has been deleted' });
    });
  });


  return api;

}
