class cardRsContent extends HTMLElement {

    connectedCallback(){
        this.is_error()
        this.banyak = this.getAttribute('data-get') || true;
    }

    set data_rs (data){
        this._data_rs = data
        this.render()
        this.setEqualHeight()
    }

    render(){
        let div_data_rs = ''

            for (let i = 0; i < this.banyak ; i++) {
                const randomRs =(Math.floor(Math.random() * this._data_rs.length))
                const data_rs = this._data_rs[randomRs]
        
                div_data_rs += `<div class="col s12 m3 l3 lg3">
                                        <div class="card">
                                            <div class="card-content">
                                                <span class="card-title white-text">${data_rs.nama}</span>
                                                <a href=""><i class="material-icons white-text tiny line-height-1">room</i> ${data_rs.alamat}</a>
                                                <a href="#" class=" w-100"><i class="material-icons white-text tiny line-height-1">call</i>
                                                    ${data_rs.telp}</a>
                                            </div>
                                        </div>
                                    </div>`
            }

        this.innerHTML = `<div class="row hospital"> 
                            ${div_data_rs}
                            <div class="col s12 m12 l12 lg12">
                                <p class="small">* data oleh <a class="blue-text"
                                        href="https://www.sehatq.com/artikel/daftar-rumah-sakit-untuk-penanganan-virus-corona-covid-19">sehatq</a>
                                </p>
                            </div>
                            </div>`
    }

    setEqualHeight(){

        const hospital_card = this.querySelectorAll('.card')
        let heigest_card = 0;
        hospital_card.forEach( card => {
                heigest_card = card.clientHeight >= heigest_card ? card.clientHeight : heigest_card
        })
        hospital_card.forEach( card => {
            card.setAttribute('style',`min-height:${heigest_card}px`)
        })

    }

    is_error (){
        const error = this.getAttribute('data-error') || false;
        if (error) {
            this.innerHTML = `<div class="row">
                                <div class="col s12 m12 l12 lg12">
                                    <div class="card">
                                        <div class="card-content center-align my-auto">
                                            <i class="red-text large material-icons w-100">error_outline</i>
                                            <span class="card-title red-text">Gagal memuat Data</span>
                                        </div>
                                    </div>
                                </div>
                            </div>`
        }
    }
}
customElements.define('card-rs-content',cardRsContent)