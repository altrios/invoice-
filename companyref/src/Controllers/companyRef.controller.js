const CompanyRef = require('../models/companyRef.model');

exports.create = function (req, res) {
    const new_company = new CompanyRef(req.body);
    CompanyRef.create(new_company, function (err, companyRef) {
        if (err) {
            res.status(500).json(err);
		} else {
			res.status(200).json({
				error: false,
				message: "User added to the company successfully!",
				data: companyRef
			});
		}
    });
};

exports.findById = function (req, res) {
	CompanyRef.findById(req.params.id, function (err, refer) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(refer);
		}
	});
};

exports.findCompaniesByUserId = function (req, res) {
	CompanyRef.findCompaniesByUserId(req.params.id, function (err, companies) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(companies);
		}
	});
};

exports.findUsersByCompanyId = function (req, res) {
	CompanyRef.findUsersByCompanyId(req.params.id, function (err, users) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(users);
		}
	});
};

exports.update = function (req, res) {
	CompanyRef.update(req.params.id, new CompanyRef(req.body), function (err, user) {
		if (err)
			res.status(500).send(err);
		res.status(200).json({
			error: false,
			message: 'Company successfully updated'
		});
	});

};

exports.delete = function (req, res) {
	CompanyRef.delete(req.params.id, function (err, user) {
		if (err)
			res.status(500).send(err);
		res.status(200).json({
			error: false,
			message: 'Company successfully deleted'
		});
	});
};