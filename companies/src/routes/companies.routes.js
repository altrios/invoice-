const express = require('express');
const router = express.Router();
const companyController = require('../controller/company.controller');
const { celebrate, Joi } = require('celebrate');    

// Retrieve all comapnies
router.get('/', celebrate({
    query: Joi.object().keys({
        limit: Joi.number().integer().positive().required(),
        page: Joi.number().integer().positive().required(),
        token: Joi.string().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(400).send({ status: false, message: 'Faltan datos por enviar' });
}, companyController.findAll);

router.post('/', celebrate({
    body: Joi.object().keys({
        business_name: Joi.string().required(),
        address: Joi.string().required(),
        email: Joi.string().email().required(),
        rut_pdf: Joi.string().required(),
        chamber_commerce_pdf: Joi.string().required(),
        // user_id: Joi.number().integer().positive().required(),
        phone: Joi.string().required(),
        id_company_state: Joi.number().integer().positive().required(),
        token:Joi.string().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(400).send({ status: false, message: 'Faltan datos por enviar o no son correctos' });
}, companyController.create);

router.post('/:id', celebrate({
    params: Joi.object().keys({
        id: Joi.number().integer().positive().required(),
        token: Joi.string().required(),
    }).unknown()
}), (err, req, res, next) => {
    res.status(400).send({ status: false, message: 'Faltan datos por enviar o no son correctos' });
}, companyController.findById);

router.put('/:id', celebrate({
    params: Joi.object().keys({
        id: Joi.number().integer().positive().required(),
        
    }).unknown(),
    body: Joi.object().keys({
        business_name: Joi.string().required(),
        address: Joi.string().required(),
        email: Joi.string().email().required(),
        rut_pdf: Joi.string().required(),
        chamber_commerce_pdf: Joi.string().required(),
        user_id: Joi.number().integer().positive().required(),
        phone: Joi.string().required(),
        id_company_state: Joi.number().integer().positive().required(),
        token:Joi.string().required(),
    }).unknown()
}), (err, req, res, next) => {
    console.log(err )
    res.status(400).send({ status: false, message: 'Faltan datos por enviar o no son correctossss' });
}, companyController.update);

router.delete('/:id', celebrate({
    params: Joi.object().keys({
        id: Joi.number().integer().positive().required(),
        token: Joi.string().required(),
    }).unknown()
}), (err, req, res, next) => {
    
    res.status(400).send({ status: false, message: 'Faltan datos por enviar o no son correctos' });
}, companyController.delete);

module.exports = router
