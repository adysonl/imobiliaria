const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');
const Immobile = require('../models/immobile');


router.get('/', function(req, res) {
    Immobile.findAll({
        where: req.query
    }).then(immobiles => {
        res.send(immobiles);
    })
  });

router.get('/:id', function(req, res) {
    Immobile.findOne({
        where: req.params
    }).then(immobile => {
        if(immobile) {
            res.send(immobile);
        } else {
            res.send(req);
            res.json({error: 'immobile not found'});
        }
    });
});

router.post('', function(req, res){
    try{
        const immobile = Immobile.create(req.body);
        return res.send(req.body);
    }catch (err){
        return res.status(400).send({error: 'falha no registro'});
    }
    
});

router.put('/:id', function(req,res){
    Immobile.findById(req.params.id).then(immobile => {
        if(immobile){
            immobile.update(req.body).then(() => {
                res.send(immobile);
            })
        }else{
            res.json({error: "user not found"});
        }
    });
});

router.delete('/:id', function(req,res){
    Immobile.findById(req.params.id).then(immobile => {
        if(immobile){
            immobile.destroy().then(() => {
                res.send(immobile);
            })
        }else{
            res.json({error: "user not found"});
        }
    });
});

module.exports = app => app.use('/immobile', router);