import config from './config.js'
import './berita-content-card.js'
class cardBerita extends HTMLElement {
    connectedCallback(){
        this.render()
    }

    render(){
        config._apiURl = '/berita'
        config.api.then( res => {
            this.innerHTML = `<div class="border-atas">
                                    <div class="row">
                                        <div class="col s12 m12 l12 lg12">
                                            <div class="title-top-center">
                                                <h3 class="semi-bold center-align">Berita Kesehatan</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <berita-card-content data-get="3"></berita-card-content>
                                </div>`
            const berita_card_content = this.querySelector('berita-card-content')
            berita_card_content.data_news = res
        }).catch( err => {            
            this.innerHTML = `<div class="border-atas">
                                <div class="row">
                                    <div class="col s12 m12 l12 lg12">
                                        <div class="title-top-center">
                                            <h3 class="semi-bold center-align">Berita Kesehatan</h3>
                                        </div>
                                    </div>
                                </div>
                                <berita-card-content data-error="true"></berita-card-content>
                            </div>`
        })
    }
}
customElements.define('berita-card',cardBerita)