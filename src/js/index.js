import kawalKorona from './api/kawalKorona.js'

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
const gPositive = document.querySelector('.g-p > h4')
const gRecovered = document.querySelector('.g-s > h4')
const gDeath = document.querySelector('.g-m > h4')
// *** data indo
const iPositive = document.querySelector('.i-p > h4')
const iRecovered = document.querySelector('.i-s > h4')
const iDeath = document.querySelector('.i-m > h4')

// ***** data per provinis

const dataPerProv = document.querySelector('#data-per-provinsi > tbody')



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

// function onMapClick(e) {
//     popup
//         .setLatLng(e.latlng)
//         .setContent("You clicked the map at ")
//         .openOn(mymap);
// }

// marker
const marker = []
const data = new kawalKorona()

// !data provinsi
data.api('/provinsi').then(res => {
    
    
    res.map( (val, index) => {
        val = val.attributes
        // val.kordinat = JSON.parse(val.kordinat)
        const { lat ,lng } = val.kordinat
        
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
    console.log(err);
    
    
    popup.setLatLng([-0.789275, 113.9213257])
        .setContent(`<div class="popup-kasus"> 
                    <p>Maaf Data Gagal Di load</p>
                    <div>"`)
        .openOn(mymap);
    let list = document.createElement('tr')
    list.innerHTML = `
                        <td>1</td>
                        <td>Maaf Data Gagal Di Load</td>
                        <td>Maaf Data Gagal Di Load</td>
                        <td>Maaf Data Gagal Di Load</td>
                        <td>Maaf Data Gagal Di Load</td>`
    dataPerProv.appendChild(list)
})


data.api('/berita').then( res => {
    for (let i = 0; i < 3; i++) {
        let container_berita = document.querySelector('.berita')
        
        let berita = document.createElement('div')
        berita.className = 'col s12 m4 l4 lg4'
        berita.innerHTML = `<div class="card medium">
                            <div class="card-image">
                                <img class="responsive-img" src="${res.articles[i].urlToImage}">
                            </div>
                            <div class="card-content">
                                <span class="card-title">${res.articles[i].title}</span>
                                <p>${res.articles[i].description}</p>
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
}).catch( err => {
    let container_berita = document.querySelector('.berita')
        
        let berita = document.createElement('div')
        berita.className = 'col s12 m12 l12 lg12'
        berita.innerHTML = `<div class="card medium">
                            <div class="card-content center-align">
                                <span class="card-title red-text">Maaf Data Gagal Di Load</span>
                            </div>
                            </div>`
        
        container_berita.appendChild(berita)

})

data.api('/indo').then( res => {
    // !data seluruh
    gDeath.innerHTML = res.deaths
    gPositive.innerHTML = res.cases
    gRecovered.innerHTML = res.recovered
    // ! data hari ini
    iDeath.innerHTML = res.todayDeaths
    iPositive.innerHTML = res.active
    iRecovered.innerHTML = res.todayCases
    
}).catch( err => {
    // !data seluruh
    gDeath.innerHTML = 'Maaf'
    gPositive.innerHTML = 'Data Gagal Di Load'
    gRecovered.innerHTML = 'Data Gagal Di Load'
    console.log(err);
    // ! data hari ini
    iDeath.innerHTML = 'Maaf'
    iPositive.innerHTML = 'Data Gagal Di Load'
    iRecovered.innerHTML = 'Data Gagal Di Load'
})



// standalone popup info
// let popup = L.popup()
//     .setLatLng([-7.2491698, 112.7508316])
//     .setContent("I am a standalone popup.")
//     .openOn(mymap);

// event
// function onMapClick(e) {
//     marker.bindPopup("You clicked the map at " + e.latlng).openPopup();
//     // alert("You clicked the map at " + e.latlng);
// }

// marker.on('click', onMapClick);