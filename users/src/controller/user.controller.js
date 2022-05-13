const User = require('../model/user.model')
var jwt = require('jsonwebtoken')

exports.findAll = function (req, res) {
  const page = req.query.page
  const limit = req.query.limit

  User.findAll({ page, limit }, (err, users, pagination) => {
    if (err) {
      res.status(500).send({
        error: true,
        err,
      })
    } else {
      jwt.verify(req.body.token.replace('"', ''), Toeknkey, function (
        err,
        data,
      ) {
        if (err) {
          console.log('error')
          console.log(err)
          res.status(500).send({
            error: true,
            message: 'Bad Token',
            err,
          })
        } else {
          res.status(200).send({ users, pagination })
        }
      })
    }
  })
}

exports.create = function (req, res) {
  //req.body.password;
  const newUser = new User(req.body)
  User.create(newUser, (err, user) => {
    if (err) {
      res.status(500).send({
        error: true,
        message: 'Fail to add the user',
        err,
      })
    } else {
      res.status(201).send({
        error: false,
        message: 'User added successfully!',
        data: user,
      })
    }
  })
}
exports.findById = function (req, res) {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.status(500).send({
        error: true,
        err,
      })
    } else {
      let date_ob = new Date()
      let Toeknkey =
        date_ob.getFullYear() +
        '/' +
        date_ob.getMonth() +
        '/' +
        date_ob.getDate()
      jwt.verify(req.body.token.replace('"', ''), Toeknkey, function (
        err,
        data,
      ) {
        if (err) {
          console.log('error')
          console.log(err)
          res.status(500).send({
            error: true,
            message: 'Bad Token',
            err,
          })
        } else {
          res.status(200).send(user)
        }
      })
    }
  })
}

exports.findByDocument = function (req, res) {
  User.findByDocument(req.params.id, (err, user) => {
    if (err) {
      res.status(500).send({
        error: true,
        err,
      })
    } else {
      res.status(200).send(user)
    }
  })
}

exports.update = function (req, res) {
  let date_ob = new Date()
  let Toeknkey =
    date_ob.getFullYear() + '/' + date_ob.getMonth() + '/' + date_ob.getDate()
  jwt.verify(req.body.token.replace('"', ''), Toeknkey, function (err, data) {//verificamos token
    if (err) {
      res.status(400).send({
        error: true,
        message: 'User not deleted',
      })
    } else {
      User.findById(data.data[0]['id'], (err, userData) => {//ubicamos usuario
        if (err) {
          res.status(500).send({
            error: true,
            err,
          })
        } else {
          console.log(userData[0]['id'])
          console.log(data.data[0]['id'])
          if (userData[0]['id'] != data.data[0]['id']) {//si el ususario no coincide con el usuario en sesion negamos el cambio
            res.status(400).send({
              error: true,
              message: 'you are not autorized to do this',
            })
          } else {//si hay coinsidencia procedemos con hacer el cambio
            User.update(req.params.id, new User(req.body), (err, user) => {
              if (err) {
                res.status(500).send({
                  error: true,
                  err,
                })
              } else {
                // console.log(user)
                if (user == 'no match') {//si intentamos cambiar un usuario que no existe negamos el cambio (redundamos en la validacion anterior)
                  res.status(404).send({
                    error: true,
                    message: 'No matched user',
                  })
                } else {
                  res.status(200).send({
                    error: false,
                    message: 'User successfully updated',
                  })
                }
              }
            })
          }
        }
      })
    }
  })
}

exports.delete = function (req, res) {
  let date_ob = new Date()
  let Toeknkey =
    date_ob.getFullYear() + '/' + date_ob.getMonth() + '/' + date_ob.getDate()
  jwt.verify(req.body.token.replace('"', ''), Toeknkey, function (err, data) {
    if (err) {
      res.status(400).send({
        error: true,
        message: 'User not deleted',
      })
    } else {
      if (//comparamos si el id del token y el id del usuario que queremos "eliminar" coinciden
        req.params.id == data['data'][0]['user_type'] ||
        data['data'][0]['user_type'] == 3
      ) {
        User.delete(req.params.id, (err, user) => {
          if (err) {
            res.status(500).send({
              error: true,
              err,
            })
          } else {
            User.findById(req.params.id, (err, user) => {//revisamos si el usuario que queremos eliminar existe
              if (err) {
                res.status(500).send({
                  error: true,
                  err,
                })
              } else {
                if (user == '') {
                  res.status(404).send({
                    error: true,
                    message: "User dosn't exist",
                  })
                } else {
                  res.status(200).send({
                    error: false,
                    message: 'User successfully deleted',
                  })
                }
              }
            })
          }
        })
      } else {
        res.status(400).send({
          error: true,
          message: 'Unautorized action',
        })
      }
    }
  })
}

exports.login = function (req, res) {
  User.login(req.body, (err, data) => {
    if (err) {
      res.status(500).send({
        error: true,
        err,
      })
    } else {
      let date_ob = new Date()
      let Toeknkey =
        date_ob.getFullYear() +
        '/' +
        date_ob.getMonth() +
        '/' +
        date_ob.getDate()

      res.status(200).send({
        status: false,
        data: data,
        token: jwt.sign({ data }, Toeknkey),//al iniciar sesion creamos un token que sera el que usaremos para cada api
      })
    }
  })
}
