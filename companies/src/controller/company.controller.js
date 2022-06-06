const Company = require('../model/company.model')
var jwt = require('jsonwebtoken')
var fileupload = require('express-fileupload')

exports.findAll = function (req, res) {
  const page = req.query.page
  const limit = req.query.limit

  const token = req.query.token

  let date_ob = new Date()
  let tokenkey =
    date_ob.getFullYear() + '/' + date_ob.getMonth() + '/' + date_ob.getDate()
  jwt.verify(req.query.token.replace('"', ''), tokenkey, function (err, data) {
    if (err) {
      console.log('error')
      console.log(err)
      res.status(500).send({
        error: true,
        message: 'Bad Token',
        err,
      })
    } else {
      const id = parseInt(data.data[0]['id'])
      Company.findAll({ id, page, limit }, (err, companies, pagination) => {
        if (err) {
          res.status(500).send(err)
        } else {
          res.status(200).send({ companies, pagination })
        }
      })
    }
  })
}

exports.create = function (req, res) {
  const tokenIsOk = testToken(req.body.token)
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
    console.log(data.data[0]['id'])
    req.body.user_id = data.data[0]['id']
    console.log(data)
    console.log(req.files)
    req.body.rut_pdf = req.files.rut.name
    req.body.chamber_commerce_pdf = req.files.chamber.name
    const new_company = new Company(req.body)
    Company.create(new_company, (err, user) => {
      if (err) {
        res.status(500).send({
          error: true,
          err,
        })
      } else {
        const filerut = req.files.rut
        filerut.mv('./uploads/rut/' + filerut.name, function (err, result) {
          if (err) {
            console.log(err)
          } else {
            console.log(result)
          }

          console.log('se subio el archivo ' + filerut.name)
        })

        const filechamber = req.files.chamber
        filechamber.mv(
          './uploads/chambercomerce/' + filechamber.name,
          function (err, result) {
            // console.log(reportUploaded);
            if (err) {
              console.log(err)
            } else {
              console.log(result)
            }

            console.log('se subio el archivo ' + filechamber.name)
          },
        )
        res.status(200).send({
          error: false,
          message: 'Company added successfully!',
          data: user,
        })
      }
    })
  }
}

exports.findById = function (req, res) {
  const tokenIsOk = testToken(req.body.token)
  if (tokenIsOk == true) {
    Company.findById(req.params.id, function (err, user) {
      if (err) {
        res.status(500).send({
          error: true,
          err,
        })
      } else {
        res.status(200).send(user)
      }
    })
  } else {
    res.status(500).send({
      error: true,
      message: 'Error en token, vuelva a iniciar sesión',
    })
  }
}

exports.update = function (req, res) {
  const tokenIsOk = testToken(req.body.token)
  if (tokenIsOk == true) {
    Company.update(req.params.id, new Company(req.body), function (err, user) {
      if (err) {
        console.log(err)
        res.status(500).send({
          error: true,
          err,
        })
      } else {
        res.status(200).send({
          error: false,
          message: 'Company successfully updated',
        })
      }
    })
  } else {
    res.status(500).send({
      error: true,
      message: 'Error en token, vuelva a iniciar sesión',
    })
  }
}

exports.delete = function (req, res) {
  const tokenIsOk = testToken(req.body.token)
  if (tokenIsOk == true) {
    Company.delete(req.params.id, function (err, user) {
      if (err) {
        console.log(err)
        res.status(500).send({
          error: true,
          err,
        })
      } else {
        console.log(saludo)
        res.status(200).send({
          error: false,
          message: 'Company successfully deleted',
        })
      }
    })
  } else {
    res.status(500).send({
      error: true,
      message: 'Error en token, vuelva a iniciar sesión',
    })
  }
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
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  })

  return result
}
