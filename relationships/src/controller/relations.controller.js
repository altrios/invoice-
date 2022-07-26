const Relations = require('../model/relations.model')


exports.findAll = function (req, res) {


        Relations.findAll({  }, (err, data) => {
          if (err) {
            res.status(500).send({
              error: true,
              err,
            })
          } else {

              res.status(200).send({ data })
            }
          }
        )
        }
   










