const express = require('express')
const router = express.Router()
const relationsController = require('../controller/relations.controller');
const { celebrate, Joi } = require('celebrate');



router.get('/countries', celebrate({
    body: Joi.object().keys({
        id_user: Joi.number().integer().positive(),
    }).unknown()
}), (err, req, res, next) => {
    res.status(400).send({ status: false, message: 'Faltan datos por enviar' });
}, relationsController.findAll);

module.exports = router