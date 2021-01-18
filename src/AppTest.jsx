import React from "react"
import axios from 'axios'
const AppTest = () => {
    const [number, setNumber] = React.useState("")
    const [activeNumbers, setActiveNumbers] = React.useState([])
    const [numbers, setNumbers] = React.useState([])

    React.useEffect(() => {
        axios.get('http://10.173.1.72:3001/')
            .then(response => {
                setNumbers(response.data)
            })
        axios.get('http://10,173.1.72:3001/active/')
            .then(response => {
                setActiveNumbers(response.data)
            })
    }, [])

    const handleSubmission = (e) => {
        e.preventDefault()
        axios.post('http://10.173.1.72:3001/', {currentNumber: number})
    }
    const handleChange = (e) => {
        setNumber(e.target.value)
    }
    return (
        <React.Fragment>
            <form onSubmit={handleSubmission}>
                <input type="text" onChange={handleChange} />
                <button type="submit">Register</button>
            </form>
            {activeNumbers.length > 0 && (
                <div>
                    <p>Active Numbers: </p>
                    <span>{activeNumbers}</span>
                </div>
            )}
            {numbers.length > 0 && (
                <div>
                    <p>Numbers: </p>
                <span>{numbers}</span>
                </div>
            )}

        </React.Fragment>
    )
}
export default AppTest