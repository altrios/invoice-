'use strict';
const pool = require('./../../config/db.config');

var CompanyRef = function (companyRef) {
	this.id_company = companyRef.id_company;
	this.id_user = companyRef.id_user;
	this.state = companyRef.state || 1;
}

CompanyRef.create = async function (newCompRef, result) {
	const checkCompanyRef = await pool.query(`SELECT * FROM user_has_company WHERE id_company = ${newCompRef.id_company} AND id_user = ${newCompRef.id_user}`);
	if (checkCompanyRef.length == 0) {
		pool.query('INSERT INTO user_has_company SET ?', newCompRef, (err, res) => {
			if (err) {
				result(err, null);
			} else {
				result(null, res.insertId);
			}
		});
	} else {
		result("El usuario ya está registrado en esa empresa", null);
	}
}

CompanyRef.findCompaniesByUserId = function (id, result) {
	pool.query('SELECT * FROM user_has_company INNER JOIN company ON user_has_company.id_company = company.id WHERE id_user = ? ', id, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, res);
		}
	});
}

CompanyRef.findById = function (newCompRef, result) {
	pool.query('SELECT * FROM user_has_company INNER JOIN user ON user_has_company.id_user = user.id INNER JOIN company ON user_has_company.id_company = company.id WHERE user_has_company.id = ?', newCompRef, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, res);
		}
	});
}

CompanyRef.findUsersByCompanyId = function (id, result) {
	pool.query('SELECT * FROM user_has_company INNER JOIN user ON user_has_company.id_user = user.id WHERE id_company = ?', id, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, res);
		}
	});
}

CompanyRef.update = function (id, newCompRef, result) {
	pool.query("UPDATE user_has_company SET id_user=?, id_company=?, id_state=? WHERE id =" + id,
		[newCompRef.id_user, newCompRef.id_company, newCompRef.id_state],
		(err, res) => {
			if (err) {
				result(err, null);
			} else {
				result(null, res);
			}
		});
};

CompanyRef.delete = function (id, result) {
	pool.query("UPDATE user_has_company SET state = 2 WHERE id = ?", [id], (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, res);
		}
	});
};


CompanyRef.endpoint=function(name, result){
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

module.exports = CompanyRef;
