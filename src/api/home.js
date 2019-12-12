import axios from 'axios'
const allData = {
    totalRegister: 44,
    totalActiver: 32,
    topMouthActiver: 22,
    todayLogin: 11
}

export function getAll() {
    return new Promise((resolve, reject) => {
        axios.get('https://swapi.co/api/people/1/')
            .then(res => {
                resolve(allData)
            }).catch(reject)
    })
}