const express = require('express')
const router = express.Router()
const invoiceController = require('../controller/invoice.controller');
const { celebrate, Joi } = require('celebrate');

router.post('/', celebrate({
    body: Joi.object().keys({
        id_user: Joi.number().integer().positive().required(),
        id_company: Joi.number().integer().positive().required(),
        url_invoice: Joi.string(),
        id_invoice_state: Joi.number().integer().positive().required(),
        email_to_send: Joi.string().email().required(),
        id_type_invoice: Joi.number().integer().positive().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(400).send({ status: false, message: 'Faltan datos por enviar' });
}, invoiceController.create);

router.get('/', celebrate({
    query: Joi.object().keys({
        limit: Joi.number().integer().positive().required(),
        page: Joi.number().integer().positive().required()
    }).unknown()
}), (err, req, res, next) => {
    console.log(err)
    res.status(400).send({ status: false, message: 'Faltan datos por enviar' });
}, invoiceController.findAll);

router.get('/:id', celebrate({
    params: Joi.object().keys({
        id: Joi.number().integer().positive().required(),
    }).unknown()
}), (err, req, res, next) => {
    res.status(400).send({ status: false, message: 'Faltan datos por enviar' });
}, invoiceController.findById);

router.post('/user/:id/', celebrate({
    params: Joi.object().keys({
        id: Joi.number().integer().positive().required(),
    }).unknown(),
    query: Joi.object().keys({
        limit: Joi.number().integer().positive().required(),
        page: Joi.number().integer().positive().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(400).send({ status: false, message: 'Faltan datos por enviar' });
}, invoiceController.findInvoiceByUserId);


router.get('/company/:id/', celebrate({
    params: Joi.object().keys({
        id: Joi.number().integer().positive().required(),
    }).unknown(),
    query: Joi.object().keys({
        limit: Joi.number().integer().positive().required(),
        page: Joi.number().integer().positive().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(400).send({ status: false, message: 'Faltan datos por enviar' });
}, invoiceController.findInvoiceByCompanyId);

router.put('/:id', celebrate({
    params: Joi.object().keys({
        id: Joi.number().integer().positive().required(),
    }).unknown(),
    body: Joi.object().keys({
        id_user: Joi.number().integer().positive().required(),
        id_company: Joi.number().integer().positive().required(),
        url_invoice: Joi.string().required(),
        id_invoice_state: Joi.number().integer().positive().required(),
        email_to_send: Joi.string().email().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(400).send({ status: false, message: 'Faltan datos por enviar' });
}, invoiceController.create);

module.exports = router;