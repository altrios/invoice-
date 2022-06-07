const CompanyRef = require('../models/companyRef.model')

exports.create = function (req, res) {
  const new_company = new CompanyRef(req.body)
  const tokenIsOk = testToken(req.body.token)
  if (tokenIsOk == true) {
    CompanyRef.create(new_company, function (err, companyRef) {
      if (err) {
        res.status(500).json(err)
      } else {
        res.status(200).json({
          error: false,
          message: 'User added to the company successfully!',
          data: companyRef,
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

exports.findById = function (req, res) {
  const tokenIsOk = testToken(req.body.token)
  if (tokenIsOk == true) {
    CompanyRef.findById(req.params.id, function (err, refer) {
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(200).send(refer)
      }
    })
  } else {
    res.status(500).send({
      error: true,
      message: 'Error en token, vuelva a iniciar sesión',
    })
  }
}

exports.findCompaniesByUserId = function (req, res) {
  const tokenIsOk = testToken(req.body.token)
  if (tokenIsOk == true) {
    CompanyRef.findCompaniesByUserId(req.params.id, function (err, companies) {
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(200).send(companies)
      }
    })
  } else {
    res.status(500).send({
      error: true,
      message: 'Error en token, vuelva a iniciar sesión',
    })
  }
}

exports.findUsersByCompanyId = function (req, res) {
  const tokenIsOk = testToken(req.body.token)
  if (tokenIsOk == true) {
    CompanyRef.findUsersByCompanyId(req.params.id, function (err, users) {
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(200).send(users)
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
    CompanyRef.update(req.params.id, new CompanyRef(req.body), function (
      err,
      user,
    ) {
      if (err) res.status(500).send(err)
      res.status(200).json({
        error: false,
        message: 'Company successfully updated',
      })
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
    CompanyRef.delete(req.params.id, function (err, user) {
      if (err) res.status(500).send(err)
      res.status(200).json({
        error: false,
        message: 'Company successfully deleted',
      })
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
