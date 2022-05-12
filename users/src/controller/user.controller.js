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
  User.update(req.params.id, new User(req.body), (err, user) => {
    if (err) {
      res.status(500).send({
        error: true,
        err,
      })
    } else {
      console.log(user)
      if(user=='no match'){
        res.status(404).send({
          error: true,
          message: 'No matched user',
        })
      }else{
        res.status(200).send({
        error: false,
        message: 'User successfully updated',
      })
      }
      
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
      if (
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
        token: jwt.sign({ data }, Toeknkey),
      })
    }
  })
}
