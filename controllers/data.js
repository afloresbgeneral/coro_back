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
    const file = '/Users/aflores/Desktop/corona_data/coro_back/controllers/time_series_19-covid-Confirmed.csv';
    console.log('file path ', file);
    try {
        return read(file, res)
            .then(textFileData => {
                console.log('file ', file);
                const result = papa.parse(textFileData, {
                    header: true,
                    dynamicTyping: true,
                });
                console.log('RESULT ', result.data);
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

function parse(req, res) {
    var params = req.body;
    // const file = fs.createReadStream('time_series_19-covid-Confirmed.csv');
    console.log('hola mundo ', file);
    var content = fs.readFileSync(file, "utf8");
    console.log('content ', content);


    var count = 0; // cache the running count
    papa.parse(content, {
        download: true,
        worker: true, // Don't bog down the main thread if its a big file
        step: function (result) {
            console.log('inside step');
            // do stuff with result
        },
        complete: function (results, file) {
            console.log('parsing complete read', count, 'records.');
        }
    });

    res.status(200).send({
        message: 'Data',
        request: params
    });
}

//exportacion
module.exports = {
    test,
    parse,
    importCsvFile
}
