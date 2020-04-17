import kawalKorona from './api/kawalKorona.js'
import './web component/init.js'

let mymap = L.map('mapid').setView([-0.789275, 113.9213257], 4);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoieXVhbmRhIiwiYSI6ImNrOHYydmtyNjBoZzQzaXByeDl0dDdxcnUifQ.T497UxHC2DZZs5M6h5w2Dg'
}).addTo(mymap);


// *** data global
const gPositive = document.querySelector('.g-p > div')
const gRecovered = document.querySelector('.g-s > div')
const gDeath = document.querySelector('.g-m > div')
// *** data indo
const iPositive = document.querySelector('.i-p > div')
const iRecovered = document.querySelector('.i-s > div')
const iDeath = document.querySelector('.i-m > div')

// ***** data per provinis

const dataPerProv = document.querySelector('#data-per-provinsi > tbody')


// $ icon popoup
const popup = L.popup();
const coronaIcon = L.icon({
    iconUrl: './images/virus-2.png',
    shadowUrl: './images/virus-shadow-2.1.png',

    iconSize:     [35, 75], // size of the icon
    shadowSize:   [50, 54], // size of the shadow
    iconAnchor:   [12, 74], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 52],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

// $ marker
const marker = []
const data = new kawalKorona()

// $ data provinsi
data.api('/provinsi').then(res => {
    
    // $ Buat Marker Di Map
    res.map( (val, index) => {
        
        val = val.attributes
        
        const { lat ,lng } = val.data_tambahan.kordinat
        
        let view = `<div class="popup-kasus"> 
                    <p>Provinsi : ${val.Provinsi}</p>
                    <p>Positif : ${val.Kasus_Posi}</p>
                    <p>Sembuh : ${val.Kasus_Semb}</p>
                    <p>Meninggal : ${val.Kasus_Meni} </p>
                    <div>`

        marker.push(L.marker([lat, lng],{icon: coronaIcon}).addTo(mymap))
        marker[index].on('click', (e) => {
            popup
                .setLatLng(e.latlng)
                .setContent(view)
                .openOn(mymap);
        })
        
        // $ List Data per provinsi
        
        if (val.data_tambahan.situs !== undefined) {
            val.Provinsi = `<a href="${val.data_tambahan.situs}">${val.Provinsi}</a>`
        }
        let list = document.createElement('tr')
        list.innerHTML = `
                            <td>${index + 1}</td>
                            <td>${val.Provinsi}</td>
                            <td>${val.Kasus_Posi}</td>
                            <td>${val.Kasus_Semb}</td>
                            <td>${val.Kasus_Meni}</td>`
        dataPerProv.appendChild(list)
    })
}).catch( err => {
    
    
    popup.setLatLng([-0.789275, 113.9213257])
        .setContent(`<div class="popup-kasus center-align"> 
                        <i class="red-text medium material-icons w-100">error_outline</i>
                        <p>Gagal memuat Data</p>
                    <div>`)
        .openOn(mymap);
    let list = document.createElement('tr')
    list.innerHTML = `
                        <td>1</td>
                        <td>Gagal memuat Data</td>
                        <td>Gagal memuat Data</td>
                        <td>Gagal memuat Data</td>
                        <td>Gagal memuat Data</td>`
    dataPerProv.appendChild(list)
})

// $ berita
data.api('/berita').then( res => {
    const container_berita = document.querySelector('.berita')
    for (let i = 0; i < 3; i++) {
        let berita = document.createElement('div')
        berita.className = 'col s12 m4 l4 lg4'
        berita.innerHTML = `<div class="card">
                            <div class="card-image">
                                <img class="responsive-img" src="${res.articles[i].urlToImage == null ? './images/142.jpg' : res.articles[i].urlToImage}">
                            </div>
                            <div class="card-content">
                                <span class="card-title">${res.articles[i].title}</span>
                                <p>${res.articles[i].description == null ? '' : res.articles[i].description}</p>
                            </div>
                            <div class="card-action">
                                <a target="_blank" rel="noopener noreferrer" href="${res.articles[i].url}">Baca Selengkapnya</a>
                            </div>
                            </div>`
        
        container_berita.appendChild(berita)
        if (i == 2) {
            let link = document.createElement('div')
            link.className = 'col s12 l12 m12 lg12 center-align'
            link.innerHTML = '<a href="" class="berita-lainya">Baca Berita Lainya</a>'
            container_berita.appendChild(link)
        }
    }

    const berita_card = container_berita.querySelectorAll('.card')
    const berita_card_img = container_berita.querySelectorAll('.card .responsive-img')
    let heigest_card = 0

    berita_card_img.forEach( img => {
        img.onload = () => {
            berita_card.forEach( card => {
        
            heigest_card = card.clientHeight >= heigest_card ? card.clientHeight : heigest_card
            })

            berita_card.forEach( card => {
                card.setAttribute('style',`min-height:${heigest_card}px`)
            })
        }
        img.onerror = () => {
            img.src = './images/142.jpg'
        }
    })
}).catch( err => {
    let container_berita = document.querySelector('.berita')
        let berita = document.createElement('div')
        berita.className = 'col s12 m12 l12 lg12'
        berita.innerHTML = `<div class="card">
                            <div class="card-content center-align my-auto">
                                <i class="red-text large material-icons w-100">error_outline</i>
                                <span class="card-title red-text">Gagal memuat Data</span>
                            </div>
                            </div>`
        
        container_berita.appendChild(berita)
})

// $ Data Indonesia Dan Hari ini
data.api('/indo').then( res => {
    // console.error(res)
    if (res.deaths == undefined) {
        //!  FIXME: entah kenapa jika blok if ini di hapus maka blok catch tidak berjalan 🤔 
        // !data seluruh
        // gDeath.innerHTML = 'Maaf'
        // gPositive.innerHTML = 'Data Gagal Di Load'
        // gRecovered.innerHTML = 'Data Gagal Di Load'
        console.log(res)
        // ! data hari ini
        // iDeath.innerHTML = 'Maaf'
        // iPositive.innerHTML = 'Data Gagal Di Load'
        // iRecovered.innerHTML = 'Data Gagal Di Load'
    }
    
    // !data seluruh
    gDeath.innerHTML = `<h4 class="semi-bold center-align">${res.deaths}</h4> <p class="center-align">orang</p>`
    gPositive.innerHTML = `<h4 class="semi-bold center-align">${res.cases}</h4> <p class="center-align">orang</p>`
    gRecovered.innerHTML = `<h4 class="semi-bold center-align">${res.recovered}</h4> <p class="center-align">orang</p>`
    // ! data hari ini
    iDeath.innerHTML = `<h4 class="semi-bold center-align">${res.todayDeaths}</h4> <p class="center-align">orang</p>`
    iPositive.innerHTML = `<h4 class="semi-bold center-align">${res.active}</h4> <p class="center-align">orang</p>`
    iRecovered.innerHTML = `<h4 class="semi-bold center-align">${res.todayCases}</h4> <p class="center-align">orang</p>`
    
}).catch( err => {
    
    // ! FIXME: entah kenapa blok error nya tidak berfungsi 🙆‍♂️ 
    // !data seluruh
    const pesan_error = '<p class="semi-bold center-align"><i class="material-icons w-100">error_outline</i> Gagal memuat Data</p>'
    gPositive.innerHTML = pesan_error
    gDeath.innerHTML = pesan_error
    gRecovered.innerHTML = pesan_error

    // ! data hari ini
    iPositive.innerHTML = pesan_error
    iDeath.innerHTML = pesan_error
    iRecovered.innerHTML = pesan_error
})