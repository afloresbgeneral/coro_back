'use strict'
//cargando modulos
const fs = require('fs');
const papa = require('papaparse');

function test(req, res) {
    var params = req.body;
    console.log('DENTRO DE TEST', params);
    res.status(200).send({
        message: 'Prueba desde el controlador test y rutassss',
        request: params
    });
}

function read(fileName, res) {
    return new Promise((resolve, reject) => {
        console.log('fs try read');
        fs.readFile(fileName, "utf8",
            function (err, textFileData) {
                try {
                    if (err) {
                        res.status(401).send({
                            message: 'Error rejection id ', err
                        });
                        reject(err);
                        return;
                    }

                    resolve(textFileData);
                } catch (error) {
                }

            }
        );
    });
};

function importCsvFile(req, res) {
    console.log('req', req);
    var url = req.query.url;
    console.log('file path ', url);
    try {
        return read(url, res)
            .then(textFileData => {
                console.log('file ', url);
                const result = papa.parse(textFileData, {
                    header: true,
                    dynamicTyping: true,
                });
                // console.log('RESULT ', result.data);
                // return result.data;
                res.status(200).send({
                    message: 'Success',
                    body: result.data
                });

            });
    } catch (error) {
        console.log('EERROR' , error);
    }

}

//exportacion
module.exports = {
    test,
    importCsvFile
}
