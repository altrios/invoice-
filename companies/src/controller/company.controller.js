const Company = require('../model/company.model')


exports.findAll = function (req, res) {
  const page = req.query.page
  const limit = req.query.limit

  const token = req.query.token

  Company.endpoint('verficate_token', req.body.token, function (
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
        const id = parseInt(data.data[0]['id'])
        Company.findAll({ id, page, limit }, (err, companies, pagination) => {
          if (err) {
            res.status(500).send(err)
          } else {
            res.status(200).send({ companies, pagination })
          }
        })
      }
    }
  })
}

exports.create = function (req, res) {
  Company.endpoint('verficate_token', req.body.token, function (
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
  })
}

exports.findById = function (req, res) {
  Company.endpoint('verficate_token', req.body.token, function (
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
  })
}

exports.update = function (req, res) {
  Company.endpoint('verficate_token', req.body.token, function (
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
        Company.update(req.params.id, new Company(req.body), function (
          err,
          user,
        ) {
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
  })
}

exports.delete = function (req, res) {
  Company.endpoint('verficate_token', req.body.token, function (
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
  })
}

