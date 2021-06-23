"use strict";

var validator = require("validator");
const User = require('../database/models/user');



var controller = {
    register: function (req, res) {
        var params = req.body;
        
       

     
        try {
            var validate_name = !validator.isEmpty(params.name);
            var validate_surname = !validator.isEmpty(params.surname);
            var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
            var validate_password = !validator.isEmpty(params.password);
            var validate_typedocument = !validator.isEmpty(params.typedocument);
            var validate_document = !validator.isEmpty(params.document) && validator.isInt(params.document);
            var validate_idcity = !validator.isEmpty(params.idcity) && validator.isInt(params.idcity);
            var validate_birthday = !validator.isEmpty(params.birthday) && validator.isDate(new Date(params.birthday));
        } catch (err) {
            return res.status(200).send({ message: "faltan datos por enviar" });
        }

        if (validate_name && validate_surname && validate_email && validate_password && validate_typedocument && validate_document && validate_idcity && validate_birthday) {

            //crear el usuario solo si el correo buscado no ha sido eliminado o no existe

            var useremail = params.email.split("@",1);

            User.findOne({
                where: {
                    email: params.email,
                    deletedAt: null,
                    useremail: useremail[0]

                }
            }
            ).then(user => {

                if (user != null) {

                    delete user.password;
                    return res.status(400).send({ status: 'error', message: "registro incorrecto" });
                } else {

                    var useremail = params.email.split("@",1);
                    var create={
                        name: params.name,
                        surname: params.surname,
                        email: params.email,
                        password: params.password,
                        typedocument: params.typedocument,
                        document: params.document,
                        idcity: params.idcity,
                        birthday: new Date(params.birthday),
                        useremail: useremail[0]
                    }
                    User.create(create).then(user => {
                        return res.status(200).send({ status: 'success', user: user });
                    }).catch(err => {
                        return res.status(400).send({ status: 'error', message: "error al crear el usuario",create });
                    }
                    );

                }

            })
                .catch(err => {
                    return res.status(400).send({ status: 'error', message: "login incorrecto" });

                })




        } else {
            return res.status(400).send({ status: 'error', message: "validacion de los datos del usuario incorrecta" });
        }

        // return res.status(200).send({ user: params });

    },
    login: function (req, res) {
        var params = req.body;

        try {
            var validate_email = !validator.isEmpty(params.email);
            var validate_password = !validator.isEmpty(params.password);
        } catch (err) {
            return res.status(200).send({ status: 'error', message: "faltan datos por enviar" });
        }

        if (validate_email && validate_password) {


            var useremail = params.email.split("@",1);

            var find= {
                password: params.password,
                useremail:useremail[0],
                deletedAt: null

            };

            
            User.findOne({
                where: find
            }
            ).then(user => {

                if (user != null) {

                    delete user.password;
                    return res.status(200).send({ status: 'success', user: user });
                } else {
                    return res.status(400).send({ status: 'error', message: "login incorrecto",find});

                }

            })
                .catch(err => {
                    return res.status(400).send({ status: 'error', message: "login incorrecto",find});

                })

        } else {
            return res.status(400).send({ status: 'error', message: "validacion de los datos del usuario incorrecta" });
        }
    },
    update: function (req, res) {
        var id = req.params.id;
        var params = req.body;

        console.log(params);

        try {
            var validate_name = !validator.isEmpty(params.name);
            var validate_surname = !validator.isEmpty(params.surname);
            var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);

        } catch (err) {
            return res.status(200).send({ status: 'error', message: "faltan datos por enviar", error: validate_idcity });
        }

        if (validate_name && validate_surname && validate_email) {
            var useremail = params.email.split("@",1);

            var update = {
                name: params.name,
                surname: params.surname,
                email: params.email,
                useremail:useremail[0],
                updatedAt: new Date()

            };

            User.update(
                update, {
                where: {
                    id: id,
                    deletedAt: null
                }
            }).then(user => {
                if (user == 1) {

                    return res.status(200).send({ status: 'success', user: update });
                }
                return res.status(400).send({ status: 'error', message: "error al actualizar el usuario" });
            }).catch(err => {
                return res.status(400).send({ status: 'error', message: "error al actualizar el usuario" });
            }
            );
        } else {
            return res.status(400).send({ status: 'error', message: "validacion de los datos del usuario incorrecta" });
        }

        // return res.status(200).send({ user: params });

    },
    delete: function (req, res) {
        var id = req.params.id;
        var params = req.body;


        User.update({
            deletedAt: new Date()
        }, {
            where: {
                id: id,
                deletedAt: null
            }
        }).then(user => {
            if (user == 1) {
                return res.status(200).send({ status: 'success', user: user });
            }
            return res.status(400).send({ status: 'error', message: "error al eliminar el usuario" });
        }).catch(err => {
            return res.status(400).send({ status: 'error', message: "error al eliminar el usuario" });
        }
        );


    },
    getUser: function (req, res) {
        var id = req.params.id;
        var params = req.body;

        User.findOne({
            where: {
                id: id,
                deletedAt: null

            }
        }
        ).then(user => {

            if (user != null) {
                return res.status(200).send({ status: 'success', user: user });
            } else {
                return res.status(400).send({ status: 'error', message: "No encontrados" });

            }

        })
            .catch(err => {
                return res.status(400).send({ status: 'error', message: "No encontrados" });

            })
    },
    getAllUser: function (req, res) {
        var params = req.params;

        var where = {
            deletedAt: null,
            name: params.name,
            surname: params.surname,
            document: params.document,
            idcity: params.idcity
        }

        if(params.name=='0'){
            delete where.name;
        }
        if(params.surname=='0'){
            delete where.surname;
        }
        if(params.document=='0'){
            delete where.document;
        }
        if(params.idcity=='0'){
            delete where.idcity;
        }
        User.findAll({
            where: where
        }
        ).then(user => {

            if (user != null) {
                return res.status(200).send({ status: 'success', users: user });
            } else {
                return res.status(400).send({ status: 'error', message: "No encontradoss" });

            }

        })
            .catch(err => {
                return res.status(400).send({ status: 'error', message: "No encontradosssss" });

            })
    }
};

module.exports = controller;
