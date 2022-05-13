const Company = require('../model/company.model');
var jwt = require('jsonwebtoken');
var fileupload = require("express-fileupload");

exports.findAll = function (req, res) {
	const page = req.query.page;
	const limit = req.query.limit;
	const id =parseInt(req.query.id);
	Company.findAll({id, page, limit }, (err, companies, pagination) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send({ companies, pagination });
		}
	});
};

exports.create = function (req, res) {
	
	let date_ob = new Date();
	let tokenkey = date_ob.getFullYear() + '/' + date_ob.getMonth() + '/' + date_ob.getDate()
	// console.log(req.body)
	// console.log(tokenkey)
	jwt.verify(req.body.token.replace('"', ''), tokenkey, function (err, data) {
		if (err) {
			console.log("error")
			console.log(err)
			res.status(500).send({
				error: true,
				message: "Bad Token",
				err
			});
		} else {
			console.log(data.data[0]['id'])
			req.body.user_id=data.data[0]['id'];
			console.log(data)
			console.log(req.files)
			req.body.rut_pdf=req.files.rut.name;
			req.body.chamber_commerce_pdf=req.files.chamber.name;
			const new_company = new Company(req.body);
			Company.create(new_company, (err, user) => {
				if (err) {
					res.status(500).send({
						error: true,
						err
					});
				} else {
					const filerut = req.files.rut;
					filerut.mv("./uploads/rut/" + filerut.name, function (err, result) {
						
						if (err) {
							
							console.log(err)
						} else {
							
							console.log(result)
						}


						console.log("se subio el archivo " + filerut.name);
					});

					const filechamber = req.files.chamber;
					filechamber.mv("./uploads/chambercomerce/" + filechamber.name, function (err, result) {
						// console.log(reportUploaded);
						if (err) {
							
							console.log(err)
						} else {
							
							console.log(result)
						}


						console.log("se subio el archivo " + filechamber.name);
					});
					res.status(200).send({
						error: false,
						message: "Company added successfully!",
						data: user
					});
				}
			});

		}
	})

};

exports.findById = function (req, res) {
	Company.findById(req.params.id, function (err, user) {
		if (err) {
			res.status(500).send({
				error: true,
				err
			});
		} else {
			res.status(200).send(user);
		}
	});
};

exports.update = function (req, res) {
	Company.update(req.params.id, new Company(req.body), function (err, user) {
		if (err) {
			res.status(500).send({
				error: true,
				err
			});
		} else {
			res.status(200).send({
				error: false,
				message: 'Company successfully updated'
			});
		}
	});

};

exports.delete = function (req, res) {
	Company.delete(req.params.id, function (err, user) {
		if (err) {
			res.status(500).send({
				error: true,
				err
			});
		} else {
			res.status(200).send({
				error: false,
				message: 'Company successfully deleted'
			});
		}
	});
};