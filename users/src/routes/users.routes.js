const express = require('express')
const router = express.Router()
const userController = require('../controller/user.controller');
const { celebrate, Joi } = require('celebrate');

router.get('/', celebrate({
    query: Joi.object().keys({
        limit: Joi.number().integer().positive().required(),
        page: Joi.number().integer().positive().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(400).send({ status: false, message: 'Faltan datos por enviar' });
}, userController.findAll);

router.post('/', celebrate({
    body: Joi.object().keys({
        
        name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().email().required(),
        country:Joi.number().integer().positive().required(),
        documentation_type: Joi.number().integer().positive().required(),
        documentation: Joi.string().required(),
        password: Joi.string().required(),
        nickname: Joi.string().required(),
        id_user_state: Joi.number().integer().positive().required(),
        user_type: Joi.number().integer().positive().required(),
        phone: Joi.string().required()
        
    }).unknown()
}), (err, req, res, next) => {
     console.log(err)
    res.status(400).send({ status: false, message: 'Faltan datos por enviarrr' });
}, userController.create);



router.get('/document/:id', celebrate({
    params: Joi.object().keys({
        id: Joi.number().integer().positive().required(),
    }).unknown()
}), (err, req, res, next) => {
    res.status(400).send({ status: false, message: 'Faltan datos por enviar' });
}, userController.findByDocument);

router.put('/:id', celebrate({
    params: Joi.object().keys({
        id: Joi.number().integer().positive().required(),
    }).unknown(),
    body: Joi.object().keys({
        documentation_type: Joi.number().integer().positive().required(),
        documentation: Joi.string().required(),
        name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        id_user_state: Joi.string().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(400).send({ status: false, message: w });
}, userController.update);


router.delete('/:id', celebrate({
    params: Joi.object().keys({
        id: Joi.number().integer().positive().required(),
        token:JSON.stringify(Joi.string().min(5).max(255).required()),
    }).unknown()
}), (err, req, res, next) => {
    res.status(400).send({ status: false, message: 'Faltan datos por enviar' });
}, userController.delete);

router.post('/login/', celebrate({
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }).unknown()
}), (err, req, res, next) => {
    res.status(400).send({ status: false, message: 'Faltan datos por enviar' });
}, userController.login);

router.post('/:id', celebrate({
    params: Joi.object().keys({
        id: Joi.number().integer().positive().required(),
        token:JSON.stringify(Joi.string().min(5).max(255).required()),
    }).unknown()
}), (err, req, res, next) => {
    res.status(400).send({ status: false, message:"no se encontro usuario" });
}, userController.findById);

module.exports = router