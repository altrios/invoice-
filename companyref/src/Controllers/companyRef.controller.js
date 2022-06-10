const CompanyRef = require('../model/companyRef.model')
okToken = false

exports.create = function (req, res) {
  const new_company = new CompanyRef(req.body)
  CompanyRef.endpoint('verficate_token', req.body.token, function (
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
  })
}

exports.findById = function (req, res) {
  CompanyRef.endpoint('verficate_token', req.body.token, function (
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
  })
}

exports.findCompaniesByUserId = function (req, res) {
  CompanyRef.endpoint('verficate_token', req.body.token, function (
    err,
    ResultToken,
  ) {
    if (err) {
      console.log('no token')
    } else {
      okToken = ResultToken
      if (okToken == true) {
        CompanyRef.findCompaniesByUserId(req.params.id, function (
          err,
          companies,
        ) {
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
      console.log('si token', okToken)
    }
  })
}

exports.findUsersByCompanyId = function (req, res) {
  CompanyRef.endpoint('verficate_token', req.body.token, function (
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
  })
}

exports.update = function (req, res) {
  CompanyRef.endpoint('verficate_token', req.body.token, function (
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
  })
}

exports.delete = function (req, res) {
  CompanyRef.endpoint('verficate_token', req.body.token, function (
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
  })
}
