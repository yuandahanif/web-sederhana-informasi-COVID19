class cardBeritaContent extends HTMLElement {
    connectedCallback(){
        this.is_error()
        this.banyak = this.getAttribute('data-get') || true
    }
    set data_news(news){
        this._data_news = news
        this.render()
        this.setEqualHeight()
    }
    render(){
        let div_berita = ''
            for (let i = 0; i < this.banyak ; i++) {
                div_berita += `<div class="col s12 m4 l4 lg4">
                                    <div class="card">
                                        <div class="card-image">
                                            <img class="responsive-img" src="${this._data_news.articles[i].urlToImage == null ? './images/142.jpg' : this._data_news.articles[i].urlToImage}">
                                        </div>
                                        <div class="card-content">
                                            <span class="card-title">${this._data_news.articles[i].title}</span>
                                            <p>${this._data_news.articles[i].description == null ? '' : this._data_news.articles[i].description}</p>
                                        </div>
                                        <div class="card-action center-align">
                                            <a target="_blank" rel="noopener noreferrer" href="${this._data_news.articles[i].url}">Baca Selengkapnya</a>
                                        </div>
                                    </div>
                                </div>`
            }
            this.innerHTML =`<div class="row berita">
                                ${div_berita}
                                <div class="col s12 l12 m12 lg12 center-align">
                                    <a href="" class="berita-lainya">Baca Berita Lainya</a>
                                </div>
                            </div>`
    }

    setEqualHeight(){
        const berita_card = this.querySelectorAll('.card')
        const berita_card_img = this.querySelectorAll('.card .responsive-img')
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
    }

    is_error(){
        const error = this.getAttribute('data-error') || false;
        if (error) {
            this.innerHTML =`<div class="row berita">
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
customElements.define('berita-card-content',cardBeritaContent)