'use strict';
const axios = require('axios').default
const express = require('express')
const route = express.Router()
const fs = require('fs')

/**
 * $ axios
 * @param {String} url endpiont API yang akan di gunakan
 * @param {FunctionStringCallback} onSuccess callback yang kan digunakan untuk Then
 * @param {FunctionStringCallback} onErr Callback yang akan digunakan untuk catch
 */
function axios_get(url, onSuccess, onErr = () => {}) {
    axios.get(url).then(onSuccess).catch(error => {

        // ! kode ini dari https://gist.github.com/fgilio/230ccd514e9381fafa51608fcf137253.js
        if (error.response) {
            /*
             * The request was made and the server responded with a
             * status code that falls out of the range of 2xx
             */
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            res.status(error.response.status || 404).end(error.data);
        } else if (error.request) {
            /*
             * The request was made but no response was received, `error.request`
             * is an instance of XMLHttpRequest in the browser and an instance
             * of http.ClientRequest in Node.js
             */
            res.status(error.response.status || 404).end(error.request);
            console.log(error.request);
        } else {
            // Something happened in setting up the request and triggered an Error
            res.status(error.response.status || 404).end(error.message);
            console.log('Error', error.message);
        }
        console.log(error.config);
        res.status(error.response.status || 404).end(error.config);
        onErr(error);
    })
}


// $ data covid (Dunia)
route.get('/all', (req, res) => {
    axios_get('https://corona.lmao.ninja/all',
        response => res.status(200).json(response.data) )
})

// $ data COVID Indonesia
route.get('/indo', (req, res) => {
    axios_get('https://corona.lmao.ninja/countries/indonesia',
        response => res.status(200).json(response.data) )
})

// $ history data kasus COVID19 di Indonesia
route.get('/harian', (req, res) => {

    axios_get('https://corona.lmao.ninja/v2/historical', response => {
        let indonesia = response.data.filter(country => {
            if (country.country == 'Indonesia') return country
        })
        res.status(200).json(indonesia[0])
    })
})

// $ data provinsi
route.get('/provinsi', (req, res) => {
    const data_kordinat_provinsi = JSON.parse(fs.readFileSync('./api-v2/api/data_provinsi_offline.json', 'utf-8'))

    axios_get('https://api.kawalcorona.com/indonesia/provinsi',
        response => {
            let provinsi_and_kordinat = response.data.map(provinsi => {
                let kordinat = data_kordinat_provinsi.filter(data_kordinat => {
                    if (provinsi.attributes.Provinsi == data_kordinat.Provinsi) {
                        return data_kordinat.kordinat
                    }
                })
                provinsi.attributes.kordinat = kordinat[0].kordinat
                return provinsi
            })
            res.json(provinsi_and_kordinat);
        })
})

// $ data berita
route.get('/berita', (req, res) => {
    axios_get('http://newsapi.org/v2/top-headlines?country=id&category=health&apiKey=a342b5ed3eec4fc7bc745cb7103c4ebe',
        response => {
            res.json(response.data)
        })
})

module.exports = route