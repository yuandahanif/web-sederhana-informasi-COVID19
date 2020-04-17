class footerFixed extends HTMLElement {
    connectedCallback(){
        this.render()
    }

    render(){
        this.innerHTML = `<footer class="page-footer teal">
                            <div class="footer-copyright teal">
                                <div class="container white-text center-align">
                                    Made with <i class="red-text darken-1 tiny material-icons">favorite</i> by yuan
                                </div>
                            </div>
                            </footer>`
    }
    disconnectedCallback(){
        this.innerHTML = ''
    }
}
customElements.define('footer-fixed',footerFixed)