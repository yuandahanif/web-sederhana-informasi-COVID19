import './list-provinsi.js'
import config from './config.js'
class mapPersebaran extends HTMLElement {
    connectedCallback (){
        this.classList = 'col s12 m6 l6 lg6 kiri'
        this.render()
        this.setMap()
        this.renderData()
    } 

    render() {
    this.innerHTML =`<div id="mapid"></div>`
    }

    setMap(){
        this.mymap = L.map('mapid').setView([-0.789275, 113.9213257], 4);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoieXVhbmRhIiwiYSI6ImNrOHYydmtyNjBoZzQzaXByeDl0dDdxcnUifQ.T497UxHC2DZZs5M6h5w2Dg'
        }).addTo(this.mymap);

        // $ marker map
        this.marker = []
        // $ icon dan popoup untuk map
        this.popup = L.popup();
        this.coronaIcon = L.icon({
            iconUrl: './images/virus-2.png',
            shadowUrl: './images/virus-shadow-2.1.png',

            iconSize:     [35, 75], // size of the icon
            shadowSize:   [50, 54], // size of the shadow
            iconAnchor:   [12, 74], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 52],  // the same for the shadow
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        });
    }

    renderData(){
        // $ data provinsi
        const list_provinsi = document.querySelector('list-provinsi')
        
        config._apiURl = '/provinsi/kordinat'
        config.api.then(res => {
            // $ memberika data ke list-provinsi
            list_provinsi.dataProvinsi = res

            // $ Menampilkan data ke Map
            res.map( (val, index) => {
                val = val.attributes
                const { lat ,lng } = val.data_tambahan.kordinat
                
                let view = `<div class="popup-kasus"> 
                            <p>Provinsi : ${val.Provinsi}</p>
                            <p>Positif : ${val.Kasus_Posi}</p>
                            <p>Sembuh : ${val.Kasus_Semb}</p>
                            <p>Meninggal : ${val.Kasus_Meni} </p>
                            <div>`

                this.marker.push(L.marker([lat, lng],{icon: this.coronaIcon}).addTo(this.mymap))
                this.marker[index].on('click', (e) => {
                    this.popup
                        .setLatLng(e.latlng)
                        .setContent(view)
                        .openOn(this.mymap);
                })
            })
        }).catch( err => {
            
            list_provinsi.on_error()
            this.popup.setLatLng([-0.789275, 113.9213257])
                .setContent(`<div class="popup-kasus center-align"> 
                                <i class="red-text medium material-icons w-100">error_outline</i>
                                <p>Gagal memuat Data</p>
                            <div>`)
                .openOn(this.mymap);
        })
    }
}
customElements.define('map-persebaran',mapPersebaran)