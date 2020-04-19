import config from './config.js'
class listProvinsi extends HTMLElement {
    connectedCallback(){
        this.render()
        this.dataPerProv = this.querySelector('#data-per-provinsi > tbody')
    }

    set dataProvinsi(data){
        this._dataProvinsi = data
        this.renderData()
    }

    on_error(){
        let list = document.createElement('tr')
        list.innerHTML = `<td>1</td>
                            <td>Gagal memuat Data</td>
                            <td>Gagal memuat Data</td>
                            <td>Gagal memuat Data</td>
                            <td>Gagal memuat Data</td>`
        this.dataPerProv.appendChild(list)
    }

    render(){
        this.innerHTML = `<div class="border-atas">
                            <div class="row">
                                <div class="col s12">
                                    <div class="title-top-center">
                                        <h3 class="semi-bold center-align">Data Per Provinsi</h3>
                                    </div>
                                </div>
                            </div>

                            <div class="provinsi row">
                                <div class="col l12 s12 m12 lg12">
                                    <p class="small">* Klik Nama Provinsi Untuk Membuka situs Resmi</p>
                                </div>
                                <div class="col s12 m12 l12 lg12">
                                    
                                    <table class="highlight centered responsive-table" id="data-per-provinsi">
                                        <thead>
                                            <tr>
                                                <th>N0.</th>
                                                <th>Name Provinsi</th>
                                                <th>Jumlah Positif</th>
                                                <th>Jumlah Sembuh</th>
                                                <th>Jumlah Meninggal</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                        
                                        </tbody>
                                    </table>
                                </div>
                                <div class="col l12 s12 m12 lg12">
                                    <p class="small">* data oleh <a class="blue-text"
                                            href="https://kawalcorona.com/">kawalcorona</a>
                                    </p>
                                </div>
                            </div>
                        </div>`   
    }

    renderData(){
        let index = 0
        this._dataProvinsi.map( val => {
            val = val.attributes

            // $ Menampilkan Data per provinsi
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
            this.dataPerProv.appendChild(list)
            index++
        })
    }

}
customElements.define('list-provinsi', listProvinsi)