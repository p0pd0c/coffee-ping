import axios from "axios"
const endpoint = "http://10.173.1.69:3001/"
export function registerNumber(number) {
    return new Promise((res, rej) => {
        const response = await axios.post(endpoint, {currentNumber: number})
        if(response.data) {
            res(response.data)
        } else {
            rej("Request Failed For Some Reason")
        }
    })
}

export function activateNumber(number) {
    return new Promise((res, rej) => {
        const response = await axios.get(`${endpoint}activate?number=${number}`)
        if(response.data) {
            res(response.data)
        } else {
            rej("Request Failed For Some Reason")
        }
    })
}

export function deactivateNumber(number) {
    return new Promise((res, rej) => {
        const response = await axios.get(`${endpoint}deactivate?number=${number}`)
        if(response.data) {
            res(response.data)
        } else {
            rej("Request Failed For Some Reason")
        }
    })
}

export function deleteNumber(number) {
    return new Promise((res, rej) => {
        const response = await axios.get(`${endpoint}del?number=${number}`)
        if(response.data) {
            res(response.data)
        } else {
            rej("Request Failed For Some Reason")
        }
    })
}