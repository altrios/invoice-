'use strict';
const pool = require('./../../config/db.config');
var Relations = function (user) {

	this.country=1;

};




Relations.findAll = async function (pagination, result) {
	
	pool.query(`SELECT * FROM countries`, (err, res) => {
		if (err) {
			result(err, null, null);
		} else {
			result(null, res);
		}
	});
};






Relations.endpoint = function (name, token, result) {
    pool.query('SELECT * FROM endpoints WHERE name=?', [name], (err, res) => {
      if (err) {
        result(err, null)
      } else {
        if (res.length != 0) {
          if(name=='verficate_token'){
          var axios = require('axios')
          var data = JSON.stringify({
            token:token
              })
  
          var config = {
            method: 'post',
            url: JSON.parse(res[0]['url']).endpoint,
            headers: {
              'Content-Type': 'application/json',
            },
            data: data,
          }
  
          axios(config)
            .then(function (response) {
              // console.log("ok token",JSON.stringify(response.data))
              result (null, true)
            })
            .catch(function (error) {
              console.log(error)
            })
          }else{
              result(null, res);
          }
  
          // 
        } else {
          result('No se encontró el endpoint', null)
        }
      }
    })
  }

module.exports = Relations;
