const User = require('../model/user.model')
var jwt = require('jsonwebtoken')

exports.findAll = function (req, res) {
  const page = req.query.page
  const limit = req.query.limit
  User.endpoint('verficate_token', req.body.token, function (
    err,
    ResultToken,
  ) {
    if (err) {
      console.log('no token')
      res.status(500).send({
        error: true,
        message: 'Error en token, vuelva a iniciar sesión',
      })
    } else {
      okToken = ResultToken
      if (okToken == true) {
        User.findAll({ page, limit }, (err, users, pagination) => {
          if (err) {
            res.status(500).send({
              error: true,
              err,
            })
          } else {
            const tokenIsOk = testToken(req.body.token.replace('"', ''))
            //verificamos token
            if (tokenIsOk == true) {
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
          }
        })
      }
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
  User.endpoint('verficate_token', req.body.token, function (
    err,
    ResultToken,
  ) {
    if (err) {
      console.log('no token')
      res.status(500).send({
        error: true,
        message: 'Error en token, vuelva a iniciar sesión',
      })
    } else {
      okToken = ResultToken
      if (okToken == true) {
        User.findById(req.params.id, (err, user) => {
          if (err) {
            res.status(500).send({
              error: true,
              err,
            })
          } else {
            const tokenIsOk = testToken(req.body.token.replace('"', ''))
            //verificamos token
            if (tokenIsOk == true) {
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
          }
        })
      }
    }
  })
}

exports.findByDocument = function (req, res) {
  User.endpoint('verficate_token', req.body.token, function (
    err,
    ResultToken,
  ) {
    if (err) {
      console.log('no token')
      res.status(500).send({
        error: true,
        message: 'Error en token, vuelva a iniciar sesión',
      })
    } else {
      okToken = ResultToken
      if (okToken == true) {
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
    }
  })
}
exports.update = function (req, res) {
  User.endpoint('verficate_token', req.body.token, function (
    err,
    ResultToken,
  ) {
    if (err) {
      console.log('no token')
      res.status(500).send({
        error: true,
        message: 'Error en token, vuelva a iniciar sesión',
      })
    } else {
      okToken = ResultToken
      if (okToken == true) {
        res.status(400).send({
          error: true,
          message: 'User not Updated',
        })
      } else {
        User.findById(data.data[0]['id'], (err, userData) => {
          //ubicamos usuario
          if (err) {
            res.status(500).send({
              error: true,
              err,
            })
          } else {
            console.log(userData[0]['id'])
            console.log(data.data[0]['id'])
            if (userData[0]['id'] != data.data[0]['id']) {
              //si el ususario no coincide con el usuario en sesion negamos el cambio
              res.status(400).send({
                error: true,
                message: 'you are not autorized to do this',
              })
            } else {
              //si hay coinsidencia procedemos con hacer el cambio
              User.update(req.params.id, new User(req.body), (err, user) => {
                if (err) {
                  res.status(500).send({
                    error: true,
                    err,
                  })
                } else {
                  // console.log(user)
                  if (user == 'no match') {
                    //si intentamos cambiar un usuario que no existe negamos el cambio (redundamos en la validacion anterior)
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
    }
  })
}

exports.delete = function (req, res) {
  User.endpoint('verficate_token', req.body.token, function (
    err,
    ResultToken,
  ) {
    if (err) {
      console.log('no token')
      res.status(500).send({
        error: true,
        message: 'Error en token, vuelva a iniciar sesión',
      })
    } else {
      okToken = ResultToken
      if (okToken == true) {
        res.status(400).send({
          error: true,
          message: 'User not deleted',
        })
      } else {
        if (
          //comparamos si el id del token y el id del usuario que queremos "eliminar" coinciden
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
              User.findById(req.params.id, (err, user) => {
                //revisamos si el usuario que queremos eliminar existe
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
    }
  })
}
exports.login = function (req, res) {
  User.login(req.body, (error, data) => {
    if (error) {
      res.status(505).send({
        // error: true,
        error,
      })
    } else {
      var axios = require('axios')
      User.createToken('create_token', (err, db) => {
        if (err) {
          console.log(err)
          result = err
        } else {
          url = JSON.parse(db[0]['url'])
          var config = {
            method: 'post',
            url: url.endpoint,
            headers: {
              'Content-Type': 'application/json',
            },
            data: data,
          }

          axios(config)
            .then(function (response) {
              // console.log(response)
              res.status(200).send({
                status: true,
                data: data,
                token: response.data.token,
              })
            })
            .catch(function (error) {
              // console.log(error)
              // console.log(data)
            })
        }
      })
    }
  })
}

function testToken(token) {
  var axios = require('axios')
  var result = ''
  User.endpoint('verficate_token', (err, data) => {
    if (err) {
      console.log(err)
      result = err
    } else {
      url = JSON.parse(data[0]['url'])

      var data = JSON.stringify({
        token: token,
      })

      var config = {
        method: 'post',
        url: url.endpoint,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      }

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data))
          result = true
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  })

  return result
}
