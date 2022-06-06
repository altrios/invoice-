const express = require('express')
var jwt = require('jsonwebtoken')
var session = require('express-session')

// Setup server port
const port = process.env.PORT || 4999
// create express app
const app = express()
const cors = require('cors')
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(express.json())
app.use(cors())
app.use(
  session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
  }),
)

//creamos el token
app.post('/', (req, res) => {
  let date_ob = new Date()
  let Toeknkey =
    date_ob.getFullYear() + '/' + date_ob.getMonth() + '/' + date_ob.getDate()

  var data = req.body

  var now = Math.floor(Date.now() / 1000) + 60 * 60
  // console.log(data)
  var token = jwt.sign({ data: data, exp: now }, Toeknkey)
  
  res.status(200).send({ status: true, token: token, data:data })
})


//verificamos que el token sea valido o que no haya expirado
app.post('/verify', (req, res) => {
  let date_ob = new Date()
  var tiempo = Date.now()
  let Toeknkey =
    date_ob.getFullYear() + '/' + date_ob.getMonth() + '/' + date_ob.getDate()
  
  var decodedToken = jwt.decode(req.body.token)
  var expToken = decodedToken.exp
  var timeLeft = Math.round((expToken - tiempo / 1000) / 60)
  console.log(timeLeft)
  if (timeLeft > 0) {
    jwt.verify(req.body.token, Toeknkey, function (err, decoded) {
     if(err){
      if (timeLeft > 45) {
        res.status(200).send({ status: error,  message: 'error de token' })
      }
     }else{
        res.status(200).send({ status:'ok', message: 'token valido' })
     }
     
    })
  } else {
    res.status(400).send({ message: 'session agotada' })
  }
})
app.listen(port, () => {
  console.log('Server is listening on port ' + port)
})
