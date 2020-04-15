'use strict'

// FIXME: file api ini tidak jadi di gunakan. Proses Async nya tidak bekerja di Route
 
const axios = require('axios').default

class api {

    async api_fetch(url,options = {}){
        try {
            let data = await fetch(url,options)
            return await data.json()
        } catch (error) {
            return error
        }
    }

    // * global
    async global(){
        return await this.api_fetch('https://corona.lmao.ninja/all')
    }

    // * indo
    async indo(){
        return await this.api_fetch('https://corona.lmao.ninja/countries/indonesia')
    }

    // *  harian
    harian(){

        try {
            let response = await axios.get('https://corona.lmao.ninja/v2/historical')
            return response.data
        } catch (error) {
            return error
        }
        // axios.get('https://corona.lmao.ninja/v2/historical')
        // .then(function (response) {
        //     return response.data
        // })
        // .catch(function (error) {
        //     return error
        // })

        // return await this.api_fetch('https://corona.lmao.ninja/v2/historical')
    }
}

module.exports = api