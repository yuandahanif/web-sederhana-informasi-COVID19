import config from './config.js'
class dataCard extends HTMLElement {
    connectedCallback(){
        this.classList = 'col s12 m6 l6 lg6 kanan'
        this.render()
        this.renderData()
    }

    render() {
        this.innerHTML = `<div class="row">
                                <div class="col s12 m12 l12 lg12">
                                    <h4 class="global semi-bold">Data Indonesia</h4>
                                </div>
                                <div class="col s12 m12 l4 lg4">
                                    <div class="positif g-p">
                                        <h5 class="semi-bold">Positif</h5>
                                        <div>0</div>
                                    </div>
                                </div>
                                <div class="col s12 m6 l4 lg4">
                                    <div class="sembuh g-s">
                                        <h5 class="semi-bold">Sembuh</h5>
                                        <div>0</div>
                                    </div>
                                </div>
                                <div class="col s12 m6 l4 lg4">
                                    <div class="meninggal g-m">
                                        <h5 class="semi-bold">Meninggal</h5>
                                        <div>0</div>
                                    </div>
                                </div>


                                <div class="col s12 m12 l12 lg12">
                                    <h4 class="indo semi-bold">Data Indonesia Hari Ini</h4>
                                </div>

                                <div class="col s12 m12 l4 lg4">
                                    <div class="positif i-p">
                                        <h5 class="semi-bold">Positif</h5>
                                        <div>0</div>
                                    </div>
                                </div>
                                <div class="col s12 m6 l4 lg4">
                                    <div class="sembuh i-s">
                                        <h5 class="semi-bold">Kasus baru</h5>
                                        <div>0</div>
                                    </div>
                                </div>
                                <div class="col s12 m6 l4 lg4">
                                    <div class="meninggal i-m">
                                        <h5 class="semi-bold">Meninggal</h5>
                                        <div>0</div>
                                    </div>
                                </div>
                            </div>`
    }

    async renderData(){
        // *** data global
        const gPositive = this.querySelector('.g-p > div')
        const gRecovered = this.querySelector('.g-s > div')
        const gDeath = this.querySelector('.g-m > div')
        // *** data indo
        const iPositive = this.querySelector('.i-p > div')
        const iRecovered = this.querySelector('.i-s > div')
        const iDeath = this.querySelector('.i-m > div')

        config._apiURl = '/indo'
        try {
            let res = await config.api

            gDeath.innerHTML = `<h4 class="semi-bold center-align">${res.deaths}</h4> <p class="center-align">orang</p>`
            gPositive.innerHTML = `<h4 class="semi-bold center-align">${res.cases}</h4> <p class="center-align">orang</p>`
            gRecovered.innerHTML = `<h4 class="semi-bold center-align">${res.recovered}</h4> <p class="center-align">orang</p>`
            // ! data hari ini
            iDeath.innerHTML = `<h4 class="semi-bold center-align">${res.todayDeaths}</h4> <p class="center-align">orang</p>`
            iPositive.innerHTML = `<h4 class="semi-bold center-align">${res.active}</h4> <p class="center-align">orang</p>`
            iRecovered.innerHTML = `<h4 class="semi-bold center-align">${res.todayCases}</h4> <p class="center-align">orang</p>`

            if (res.deaths == undefined) {
                const pesan_error = '<p class="semi-bold center-align"><i class="material-icons w-100">error_outline</i> Gagal memuat Data</p>'
                gPositive.innerHTML = pesan_error
                gDeath.innerHTML = pesan_error
                gRecovered.innerHTML = pesan_error

                // ! data hari ini
                iPositive.innerHTML = pesan_error
                iDeath.innerHTML = pesan_error
                iRecovered.innerHTML = pesan_error
            }
        } catch (error) {
            console.log(error);
            
            // ! FIXME: block catch nya tidak berfungsi 😭 
            // const pesan_error = '<p class="semi-bold center-align"><i class="material-icons w-100">error_outline</i> Gagal memuat Data</p>'
            // gPositive.innerHTML = pesan_error
            // gDeath.innerHTML = pesan_error
            // gRecovered.innerHTML = pesan_error

            // // ! data hari ini
            // iPositive.innerHTML = pesan_error
            // iDeath.innerHTML = pesan_error
            // iRecovered.innerHTML = pesan_error
        }
    }
}
customElements.define('data-card',dataCard)