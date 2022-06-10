const Invoice = require('../model/invoice.model')

exports.create = function (req, res) {
  req.body.url_invoice = req.files.invoice.name
  const newInvoice = new Invoice(req.body)
  Invoice.endpoint('verficate_token', req.body.token, function (
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
        Invoice.create(newInvoice, (err, data) => {
          if (err) {
            res.status(500).send({
              error: true,
              message: 'Fail to create the Invoice',
              err,
            })
          } else {
            const file = req.files.invoice
            file.mv('./uploads/invoices/' + file.name, function (err, result) {
              // console.log(reportUploaded);
              if (err) {
                console.log(err)
              } else {
                console.log(result)
              }

              console.log('se subio el archivo ' + file.name)
            })
            res.status(201).send({
              error: false,
              message: 'Invoice generated successfully!',
              data: data,
            })
          }
        })
      } else {
        res.status(500).send({
          error: true,
          message: 'error en token, vuelva a inciiar sesión',
        })
      }
    }
  })
}

exports.findAll = function (req, res) {
  const page = req.query.page
  const limit = req.query.limit
  Invoice.endpoint('verficate_token', req.body.token, function (
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
        Invoice.findAll({ page, limit }, (err, invoice, pagination) => {
          if (err) {
            console.log(err)
            res.status(500).send({
              error: true,
              err,
            })
          } else {
            res.status(200).send({ invoice, pagination })
          }
        })
      } else {
        res.status(500).send({
          error: true,
          message: 'error en token, vuelva a inciiar sesión',
        })
      }
    }
  })
}

exports.findInvoiceByUserId = function (req, res) {
  const page = req.query.page
  const limit = req.query.limit
  const id = req.params.id
  Invoice.endpoint('verficate_token', req.body.token, function (
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
        Invoice.findInvoiceByUserId(
          id,
          { page, limit },
          (err, invoice, pagination) => {
            if (err) {
              res.status(500).send({
                error: true,
                err,
              })
            } else {
              res.status(200).send({ invoice, pagination })
            }
          },
        )
      } else {
        res.status(500).send({
          error: true,
          message: 'error en token, vuelva a inciiar sesión',
        })
      }
    }
  })
}

exports.findInvoiceByCompanyId = function (req, res) {
  const page = req.query.page
  const limit = req.query.limit
  const id = req.params.id
  Invoice.endpoint('verficate_token', req.body.token, function (
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
        Invoice.findInvoiceByCompanyId(
          id,
          { page, limit },
          (err, invoice, pagination) => {
            if (err) {
              res.status(500).send({
                error: true,
                err,
              })
            } else {
              res.status(200).send({ invoice, pagination })
            }
          },
        )
      } else {
        res.status(500).send({
          error: true,
          message: 'error en token, vuelva a inciiar sesión',
        })
      }
    }
  })
}

exports.findById = function (req, res) {
  Invoice.endpoint('verficate_token', req.body.token, function (
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
        Invoice.findById(req.params.id, (err, data) => {
          if (err) {
            res.status(500).send({
              error: true,
              err,
            })
          } else {
            res.status(200).send(data)
          }
        })
      } else {
        res.status(500).send({
          error: true,
          message: 'error en token, vuelva a inciiar sesión',
        })
      }
    }
  })
}

exports.update = function (req, res) {
  Invoice.endpoint('verficate_token', req.body.token, function (
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
        Invoice.update(req.params.id, new Invoice(req.body), (err, data) => {
          if (err) {
            res.status(500).send({
              error: true,
              err,
            })
          } else {
            res.status(200).send({
              error: false,
              message: 'Invoice successfully updated!',
            })
          }
        })
      } else {
        res.status(500).send({
          error: true,
          message: 'error en token, vuelva a inciiar sesión',
        })
      }
    }
  })
}


