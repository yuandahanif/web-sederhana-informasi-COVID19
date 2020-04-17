class kawalKorona{
    constructor(){
        this._apiUrl = 'http://localhost:3000/api';
    }
    // FIXME: make me better
    async api(endpoin) {
        try {
            let data = await fetch(`${this._apiUrl}${endpoin}`,
            {
                method: 'GET'
              })
            data = await data.json()
            return data;
        } catch (error) {
            return error;
        }
    }
}

export default kawalKorona