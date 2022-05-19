'use strict';
var pool = require('./../../config/db.config');
const sqlJoinToJson = require('sql-join-to-json');

var Company = function (company) {
	this.business_name = company.business_name;
	this.address = company.address;
	this.email = company.email;
	this.rut_pdf = company.rut_pdf;
	this.chamber_commerce_pdf = company.chamber_commerce_pdf;
	this.user_id = company.user_id;
	this.phone = company.phone;
	this.id_company_state = company.id_company_state;
};

Company.create = async function (newCompany, result) {
	const checkCompany = await pool.query("SELECT * FROM company WHERE email = ? AND id_company_state = 1", [newCompany.email]);
	if(checkCompany.length == 0){
		pool.query('INSERT INTO company SET ?', newCompany, function (err, res) {
			if (err) {
				result(err, null);
			} else {
				result(null, res.insertId);
			}
		});
	} else {
		result("El correo ya está registrado en el sistema", null);
	}
}

Company.findById = function (id, result) {
	pool.query('SELECT * FROM company INNER JOIN users ON company.user_id = users.id WHERE users.id = ?', id, function (err, res) {
		if (err) {
			result(err, null);
		} else {
			
			const resultStructure = {
				id: 1,
				business_name: 1,
				address: 1,
				rut_pdf: 1,
				chamber_commerce_pdf: 1,
				user: {
					email: 1,
					user_id: 1,
					id_document_type: 1,
					document: 1,
					name: 1,
					last_name: 1,
					id_user_state: 1,
					phone: 1,
				},
				id_company_state: 1,
				created_at: 1,
				updated_at: 1,
			};
			const joinJSON =  sqlJoinToJson(resultStructure, res);
			result(null, joinJSON);
		}
	});
}


Company.findAll = async function ( pagination, result) {
	const offset = (pagination.page - 1) * pagination.limit;console.log(pagination)
	const total = await pool.query("SELECT COUNT(*) FROM company WHERE id_company_state = 1");
	const totalPages = Math.ceil(total[0]['COUNT(*)'] / pagination.limit);
	
	pool.query(`SELECT * FROM company WHERE user_id = ${pagination.id} and id_company_state = 1 LIMIT ${pagination.limit} OFFSET ${offset}`, function (err, res) {
		if (err) {
			result(err, null, null);
		} else {
			console.log(pagination)
			result(null, res, { totalPages: totalPages, totalItems: total[0]['COUNT(*)'], currentPage: pagination.page, itemsPerPage: pagination.limit });
		}
	});
};

Company.update = function (id, company, result) {
	pool.query("UPDATE company SET business_name=?,address=?, email=?, rut_pdf=?, chamber_commerce_pdf=?, user_id=?, phone=? WHERE id =" + id,
		[company.business_name, company.address, company.email, company.rut_pdf, company.chamber_commerce_pdf, company.user_id, company.phone],
		function (err, res) {
			if (err) {
				result(err, null);
			} else {
				result(null, res);
			}
		});
};

Company.delete = function (id, result) {
	pool.query("UPDATE company SET id_company_state = 2 WHERE id = ?", [id], function (err, res) {
		if (err) {
			result(err, null);
		} else {
			result(null, res);
		}
	});
};

module.exports = Company;
