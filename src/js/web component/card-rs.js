import config from './config.js'
import './card-rs-content.js'

class cardRs extends HTMLElement {

    connectedCallback () {
        this.render()
    }

    render() {

        config._apiURl = '/rumah_sakit'
        config.api.then( res => {
            this.innerHTML = `<div class="title-center">
                                    <h3 class="semi-bold">Rs Rujikan</h3>
                                </div>
                                <card-rs-content data-get="4"></card-rs-content>`

            const cardRsContent = this.querySelector('card-rs-content')
            cardRsContent.data_rs = res
        }).catch( err => {
            this.innerHTML =`<div class="title-center">
                                <h3 class="semi-bold">Rs Rujikan</h3>
                            </div>
                            <card-rs-content data-error="true"></card-rs-content>`
        })
    }
}
customElements.define('card-rs',cardRs)