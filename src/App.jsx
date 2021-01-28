import React from 'react'
import { registerNumber, activateNumber, deactivateNumber, deleteNumber } from './API'


export default function App() {
    const [userNumberInput, setUserNumberInput] = React.useState("")
    const [phonenumbers, setPhonenumbers] = React.useState([])
    const [activenumbers, setActivenumbers] = React.useState([])
    
    const handleChange = (e) => {
        setUserNumberInput(e.target.value)
    }

    const register = () => {
        registerNumber(userNumberInput)
    }

    const toggleActive = React.useCallback(async (number) => {
        if(activenumbers.includes(number)) {
            await deactivateNumber(number)
            let newActivenumbers = activenumbers.filter(n => n !== number)
            await setActivenumbers(newActivenumbers)

        } else {
            await activateNumber(number)
            setActivenumbers(activenumbers.push(number))
        }
    })
    
    return (
        <>
            <label for="number">Phone:</label>
            <input id="number" onChange={handleChange} value={userNumberInput} />
            <button onClick={register}>Register</button>
            {phonenumbers.length > 0 && (
                <>
                    <h1>Registered Numbers</h1>
                    <ul>
                        {phonenumbers.map(phone => {
                        <li key={phone}>{phone}
                        {!activenumbers.includes(phone) ? (
                            <button onClick={() => { toggleActive(phone) }}>Activate</button>
                        ) : (
                            <button onClick={() => { toggleActive(phone) }}>Deactivate</button>
                        )}
                        </li>
                        })}
                    </ul>
                </>
            )}
            {activenumbers.length > 0 && (
                <>
                    <h1>Active Numbers</h1>
                    <pre>
                        {activenumbers}
                    </pre>
                </>
            )}
        </>
    )
}