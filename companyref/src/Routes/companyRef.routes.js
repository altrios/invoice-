const express = require('express');
const router = express.Router();
const companyRefController = require('../controllers/companyRef.controller');
const { celebrate, Joi } = require('celebrate');

router.post('/', celebrate({ 
    body: Joi.object().keys({
        id_user: Joi.number().integer().positive().required(),
        id_company: Joi.number().integer().positive().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(400).send({ status: false, message: 'Faltan datos por enviar o no son correctos' });
}, companyRefController.create);

router.get('/:id', celebrate({
    params: Joi.object().keys({
        id: Joi.number().integer().positive().required(),
    }).unknown()
}), (err, req, res, next) => {
    res.status(400).send({ status: false, message: 'Faltan datos por enviar o no son correctos' });
}, companyRefController.findById);

router.get('/user/:id', celebrate({
    params: Joi.object().keys({
        id: Joi.number().integer().positive().required(),
    }).unknown()
}), (err, req, res, next) => {
    res.status(400).send({ status: false, message: 'Faltan datos por enviar o no son correctos' });
}, companyRefController.findCompaniesByUserId);

router.get('/company/:id', celebrate({
    params: Joi.object().keys({
        id: Joi.number().integer().positive().required(),
    }).unknown()
}), (err, req, res, next) => {
    res.status(400).send({ status: false, message: 'Faltan datos por enviar o no son correctos' });
}, companyRefController.findUsersByCompanyId);

router.put('/:id', celebrate({                                                                                     
    params: Joi.object().keys({
        id: Joi.number().integer().positive().required(),
    }).unknown(),
    body: Joi.object().keys({
        id_user: Joi.number().integer().positive().required(),
        id_company: Joi.number().integer().positive().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(400).send({ status: false, message: 'Faltan datos por enviar o no son correctos' });
}, companyRefController.update);

router.delete('/:id', celebrate({
    params: Joi.object().keys({
        id: Joi.number().integer().positive().required(),
    }).unknown()
}), (err, req, res, next) => {
    res.status(400).send({ status: false, message: 'Faltan datos por enviar o no son correctos' });
}, companyRefController.delete);

module.exports = router
