'use strict';
const pool = require('./../../config/db.config');
var User = function (user) {
	this.documentation_type = user.documentation_type;
	this.documentation = user.documentation;
	this.name = user.name;
	this.last_name = user.last_name;
	this.email = user.email;
	this.password = user.password;
	this.phone = user.phone;
	this.id_user_state = user.id_user_state;
	this.user_type=1;
	this.nickname='prueba'+user.id_user_state;
	this.country=1;

};

User.create = function (newUser, result) {
	pool.query("SELECT * FROM users WHERE documentation = ? AND documentation_type = ? AND id_user_state != 1 OR email = ?",
		[newUser.documentation, newUser.documentation_type, newUser.email],
		(errorConsult, dataConsult) => {
			if (errorConsult) {
				result(errorConsult, null);
			} else {
				if (dataConsult.length == 0) {
					pool.query("INSERT INTO users SET ?", newUser, (error, data) => {
						if (error) {
							result(error, null);
						} else {
							result(null, data.insertId);
						}
					});
				} else {
					result("The user is already registered in the system", null);
				}
			}
		});
};

User.findById = function (id, result) {
	pool.query("SELECT * FROM users WHERE id = ? ", id, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, res);
		}
	});
};

User.findByDocument = function (document, result) {
	pool.query("SELECT * FROM users WHERE document = ? AND id_user_state = 1", document, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, res);
		}
	});
}

User.findAll = async function (pagination, result) {
	const offset = (pagination.page - 1) * pagination.limit;
	const total = await pool.query("SELECT COUNT(*) FROM users WHERE id_user_state = 1");
	const totalPages = Math.ceil(total[0]['COUNT(*)'] / pagination.limit);
	pool.query(`SELECT * FROM users WHERE id_user_state = 1 LIMIT ${pagination.limit} OFFSET ${offset}`, (err, res) => {
		if (err) {
			result(err, null, null);
		} else {
			result(null, res, { totalPages: totalPages, totalItems: total[0]['COUNT(*)'], currentPage: pagination.page, itemsPerPage: pagination.limit });
		}
	});
};

User.update = function (id, user, result) {
	pool.query("UPDATE users SET ? WHERE documentation = ? AND id_user_state = 1", [user, id], (err, res) => {
		
		if (err) {
			result(err, null);
		} else {
			if(res.message.indexOf("matched: 0")!=-1){
				result(null, 'no match');
			}else{
				result(null, res);	
			}
			
		}
	});
};

User.delete = function (id, result) {
	pool.query("UPDATE users SET id_user_state = 2 WHERE id = ?", id, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, res);
		}
	});
};

User.login= function(user, result) {
	pool.query("SELECT * FROM users WHERE email = ? AND password = ?", [user.email, user.password], (err, res) => {
		if (err) {
			result(err, null);
		} else {
			if(res.length != 0){
				result(null, res);
			} else {
				result("Usuario o contraseña incorrectas", null);
			}
		}
	});
}

User.endpoint=function(name, result){
	pool.query("SELECT * FROM endpoints WHERE name=?", [name], (err, res)=>{
		if(err){
			result(err, null);
		}else{
			if(res.length != 0){
				result(null, res);
			} else {
				result("No se encontró el endpoint", null);
			}
		}
	})
}


User.endpoint = function (name, token, result) {
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
              result(null, res)
          }
  
          // 
        } else {
          result('No se encontró el endpoint', null)
        }
      }
    })
  }

module.exports = User;
