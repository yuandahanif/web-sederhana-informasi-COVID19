class navFixed extends HTMLElement {
    connectedCallback(){
        this.navLink = this.querySelector('ul')
        this.render()
    }

    render(){
        this.innerHTML = `
        <div class="navbar-fixed">
        <nav class="white" role="navigation">
            <div class="nav-wrapper container">
                <!-- logo dan ul -->
                <a id="logo-container" href="#" class="brand-logo">info covid-19</a>
                <ul class="right hide-on-med-and-down">
                    ${this.navLink.innerHTML}
                </ul>
                <!-- TODO: skeleton loader -->
                <a href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            </div>
        </nav>
        </div>
        <ul id="nav-mobile" class="sidenav">
            ${this.navLink.innerHTML}
        </ul>`
    }
    disconnectedCallback(){
        this.innerHTML = ''
    }

}
customElements.define('nav-fixed',navFixed)