import axios from 'axios'
import apiURL from '../http/apiUrl'

const allData = {
    totalRegister: 44,
    totalActiver: 32,
    topMouthActiver: 22,
    todayLogin: 11
}

export default {
    getAll() {
        return new Promise((resolve, reject) => {
            axios.get(apiURL.test)
                .then(res => {
                    console.log(res);
                    resolve(allData)
                }).catch(reject)
            setTimeout(resolve, 1000, allData)
        })
    }
}