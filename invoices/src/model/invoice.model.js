'use strict';
const pool = require('./../../config/db.config');
const sqlJoinToJson = require('sql-join-to-json');

var Invoice = function (request) {
    this.id_user = request.id_user;
    this.id_company = request.id_company;
    this.url_invoice = request.url_invoice;
    this.email_to_send = request.email_to_send;
    this.id_request_state = request.id_request_state || 1;
    this.id_type_invoice = request.id_type_invoice;
}

Invoice.create = function (newRequest, result) {
    pool.query("INSERT INTO request SET ?", newRequest, (error, data) => {
        if (error) {
            result(error, null);
        } else {
            result(null, data.insertId);
        }
    });
}

Invoice.findAll = async function (pagination, result) {
    const offset = (pagination.page - 1) * pagination.limit;
    const total = await pool.query("SELECT COUNT(*) FROM request");
    const totalPages = Math.ceil(total[0]['COUNT(*)'] / pagination.limit);
    pool.query(`SELECT * FROM request LIMIT ${pagination.limit} OFFSET ${offset}`, (err, res) => {
        if (err) {
            result(err, null, null);
        } else {
            result(null, res, { totalPages: totalPages, totalItems: total[0]['COUNT(*)'], currentPage: pagination.page, itemsPerPage: pagination.limit });
        }
    });
}

Invoice.findInvoiceByUserId = async function (id, pagination, result){
    const offset = (pagination.page - 1) * pagination.limit;
    const total = await pool.query(`SELECT COUNT(*) FROM request WHERE id_user = ${id}`);
    const totalPages = Math.ceil(total[0]['COUNT(*)'] / pagination.limit);
    pool.query(`SELECT request_states.name AS name_request_states, request_states.id AS id_request_state, request.url_invoice, request.id_user, request.id_company, request.email_to_send, request.id AS id_invoice_request, request.created_at, request_states.updated_at, company.business_name, company.address, company.rut_pdf, company.chamber_commerce_pdf, company.user_id AS id_company_owner, type_invoice.id AS id_type_invoice, type_invoice.name AS type_invoice_name FROM request INNER JOIN company ON request.id_company = company.id INNER JOIN request_states ON request.id_request_state = request_states.id INNER JOIN type_invoice ON request.id_type_invoice = type_invoice.id WHERE request.id_user = ${id} LIMIT ${pagination.limit} OFFSET ${offset}`, (err, data) => {
        if (err) {
            result(err, null, null);
        } else {
            result(null, data, { totalPages: totalPages, totalItems: total[0]['COUNT(*)'], currentPage: pagination.page, itemsPerPage: pagination.limit });
        }
    });
}

Invoice.findRequestByCompanyId = async function (id, pagination, result){
    const offset = (pagination.page - 1) * pagination.limit;
    const total = await pool.query("SELECT COUNT(*) FROM request WHERE id_company = ?", id);
    const totalPages = Math.ceil(total[0]['COUNT(*)'] / pagination.limit);
    pool.query(`SELECT * FROM request WHERE id_company = ? LIMIT ${pagination.limit} OFFSET ${offset}`, id, (err, data) => {
        if (err) {
            result(err, null, null);
        } else {
            result(null, data, { totalPages: totalPages, totalItems: total[0]['COUNT(*)'], currentPage: pagination.page, itemsPerPage: pagination.limit });
        }
    });
}

Invoice.findById = async function(id, result){
    pool.query('SELECT * FROM request WHERE id = ?', id, (err, data) => {
        if(err){
            result(err, null);
        } else {
            result(null, data);
        }
    });
}

Invoice.update = function(id, request, result){
    pool.query('UPDATE request SET ? WHERE id = ?', [request, id], (err, data) => {
        if(err){
            result(err, null);
        } else {
            result(null, err);
        }
    });
}
Invoice.endpoint=function(name, result){
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


Invoice.endpoint = function (name, token, result) {
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
module.exports = Invoice;