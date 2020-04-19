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
    axios.get(url).then(onSuccess).catch( error => {

        // ! kode dibawah ini diambil dari https://gist.github.com/fgilio/230ccd514e9381fafa51608fcf137253.js
        if (error.response) {
            /*
             * The request was made and the server responded with a
             * status code that falls out of the range of 2xx
             */
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            // res.status(error.response.status).end(error.data);
            onErr('error.response.status')
        } else if (error.request) {
            /*
             * The request was made but no response was received, `error.request`
             * is an instance of XMLHttpRequest in the browser and an instance
             * of http.ClientRequest in Node.js
             */
            // res.status(500).end(error.request);
            console.log(error.request);
            onErr('500 - internal server error')
        } else {
            // Something happened in setting up the request and triggered an Error
            // res.status(500).end(error.message);
            console.log('Error', error.message);
            onErr(error.message)
        }
        console.log(error.config);
        // res.status(500).end(error.config);
    })
}


// $ data covid (Dunia)
route.get('/all', (req, res) => {
    axios_get('https://corona.lmao.ninja/v2/all',
        response => res.status(200).json(response.data),
        (err) => { res.status(500).end(err)})
})

// $ data COVID Indonesia
route.get('/indo', (req, res) => {
    axios_get('https://corona.lmao.ninja/v2/countries/indonesia',
        response => res.status(200).json(response.data),
        (err) => { res.status(500).end(err)})
})

// $ history data kasus COVID19 di Indonesia
route.get('/harian', (req, res) => {

    axios_get('https://corona.lmao.ninja/v2/historical', response => {
        let indonesia = response.data.filter(country => {
            if (country.country == 'Indonesia') return country
        })
        res.status(200).json(indonesia[0])
    }, (err) => { res.status(500).end(err)})
})

// $ data provinsi aja
route.get('/provinsi',(req,res)=>{
    axios_get('https://api.kawalcorona.com/indonesia/provinsi', 
        response => res.json(response.data),
        (err) => {res.status(500).end(err)})
})

// $ data provinsi + kordinat Provinsi
route.get('/provinsi/kordinat', (req, res) => {
    // *data kordinat provinsi dari file json
    const data_kordinat_provinsi = JSON.parse(fs.readFileSync('./api-v2/api/data_provinsi_offline.json', 'utf-8'))

    // *data kasus per provinsi
    axios_get('https://api.kawalcorona.com/indonesia/provinsi',
        response => {
            let provinsi_and_kordinat = response.data.map(provinsi => {

                let data_tambahan = data_kordinat_provinsi.filter(data_kordinat => {
                    if (provinsi.attributes.Provinsi == data_kordinat.Provinsi) {
                        return data_kordinat
                    }
                })
                provinsi.attributes.data_tambahan = {
                    kordinat: data_tambahan[0].kordinat,
                    situs: data_tambahan[0].situs || undefined
                }
                return provinsi
            })
            res.json(provinsi_and_kordinat);
        }, (err) => { res.status(500).end(err)})
})

// $ data berita
route.get('/berita', (req, res) => {
    axios_get('http://newsapi.org/v2/top-headlines?country=id&category=health&apiKey=a342b5ed3eec4fc7bc745cb7103c4ebe',
        response =>  res.json(response.data),
        (err) => { res.status(500).end(err)})
})

route.get('/rumah_sakit/', (req, res) => {
    const data_rumah_sakit = JSON.parse(fs.readFileSync('./api-v2/api/data_rumah_sakit.json', 'utf-8'))
    res.send(data_rumah_sakit);
})
route.get('/rumah_sakit/:namaRs', (req, res) => {
        res.send(req.params)
})

module.exports = route