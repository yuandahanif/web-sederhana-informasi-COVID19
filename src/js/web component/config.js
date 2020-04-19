import kawalKorona from '../api/kawalKorona.js'
const config = {
    set _apiURl(url){
        this.url = url
    },
    get api(){
        return new kawalKorona().api(this.url)
    },
    get MaterializeInit() {
        return `
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link href="css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection" />
        <link href="css/style.css" type="text/css" rel="stylesheet" media="screen,projection" />
        
        <script src="js/jquery-2.1.1.min.js" defer></script>
        <script src="js/materialize.js" defer></script>
        <script src="js/init.js" defer></script>
        `
    },
    get customStyleAndScript(){
        return `
            <link rel="stylesheet" type="text/css" href="css/my_style.css">
            <script src="js/index.js" type="module" defer></script>`
    },
    get leafletInit(){
        return `
        <link rel="stylesheet" href="css/leaflet.css" />
        <script src="js/leaflet.js" defer></script>`
    },

    underConstructPage(){
        let underConstructPage = document.querySelectorAll('.under-construct')        
        underConstructPage.forEach( elm => {
            elm.addEventListener('click', click => {
                click.preventDefault()
                Swal.fire({
                    title: '<strong>Maaf</strong>',
                    icon: 'error',
                    html:
                    `Halamat sedang dalam <b>pembuatan</b>. 
                        Anda Bisa Mengunjungi
                        <a target="_blank" href="${click.target.getAttribute('href')}">Halaman Penyedia Informasi</a>
                    Jika Diperlukan`,
                    showCloseButton: true,
                    focusConfirm: false,
                    confirmButtonText:
                    'Kembali',
                    confirmButtonAriaLabel: 'kembali',
                })

            })
        })
    }
}
export default config;