import config from './config.js'
class navFixed extends HTMLElement {
    async connectedCallback(){
        try {
            this.navLink = await this.getNavLink()
            this.render()
            config.underConstructPage()
        } catch (error) {
            this.navLink = error
            this.render()
        }
    }

    render(){
        this.innerHTML = `
        <div class="navbar-fixed">
        <nav class="white" role="navigation">
            <div class="nav-wrapper container">
                <!-- logo dan ul -->
                <a id="logo-container" href="#" class="brand-logo">info covid-19</a>
                <ul class="right hide-on-med-and-down">
                    ${this.navLink}
                </ul>
                <!-- TODO: skeleton loader -->
                <a href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            </div>
        </nav>
        </div>
        <ul id="nav-mobile" class="sidenav">
            ${this.navLink}
        </ul>`
    }
    disconnectedCallback(){
        this.innerHTML = ''
    }
    async getNavLink(){
        try {
            let nav = await fetch(`${window.location.origin}/src/page/Shell App/nav.html`)
            return await nav.text();
        } catch (error) {
            return `<li><a href="#" onClick="location.reload();" >Muat ulang Halaman</a></li>`
        }
    }

}
customElements.define('nav-fixed',navFixed)