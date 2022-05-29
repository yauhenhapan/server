const SubType = require("../models/subtype.model.js");

exports.findAll = (req, res) => {
    SubType.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Что-то случилось во время получения всех подтипов"
            });
        else
            res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
        res.send(data);
    });
};

exports.findSpecificSubTypes = (req, res) => {
    SubType.getSubTypesByTypeId(req.params.subTypeId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Нет подтипа с id ${req.params.subTypeId}.`
                });
            } else {
                res.status(500).send({
                    message: "Проблема с получением типа по id" + req.params.subTypeId
                });
            }
        } else res.send(data);
    });
};

exports.findSubType = (req, res) => {
    SubType.getSubTypeBySubTypeId(req.params.subTypeId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Нет подтипа с id ${req.params.subTypeId}.`
                });
            } else {
                res.status(500).send({
                    message: "Проблема с получением типа по id" + req.params.subTypeId
                });
            }
        } else res.send(data);
    });
};