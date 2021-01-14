import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import './App.sass'
import Header from './components/App/Header'
import axios from 'axios'
import { Segment, Divider, Grid, Image, List, Container, Card, Icon, Input, Button, Message, Checkbox } from 'semantic-ui-react'
const ip = '10.173.1.72'
export default function App() {
    const [numbers, setNumbers] = React.useState([])
    const [activeNumbers, setActiveNumbers] = React.useState([])
    const [currentNumber, setCurrentNumber] = React.useState("")
    const [errorForm, setErrorForm] = React.useState(false)
    const [warnForm, setWarnForm] = React.useState(false)

    React.useEffect(() => {
        axios.get(`http://${ip}:3001/`)
            .then(response => {
                setNumbers(response.data)
            })
    },[currentNumber])

    React.useEffect(() => {
        axios.get(`http://${ip}:3001/active`)
            .then(response => {
                setActiveNumbers(response.data)
            })
    },[])

    const handleFormSubmission = (e) => {
        e.preventDefault()
        if(!warnForm && !errorForm && currentNumber !== "") {
            axios.post(`http://${ip}:3001/`, { currentNumber: currentNumber })
                .then(() => {
                    console.log('Form submitted')
                    setCurrentNumber("")
                })
        }
        console.log('Form Not Submitted')
        
    }

    const handleRegisterChange = (e) => {
       setCurrentNumber(e.target.value)

       if(/[^0-9]/.test(e.target.value)) {
           setErrorForm(true)
       }
       if(!(/[^0-9]/.test(e.target.value))) {
           setErrorForm(false)
       }
       if(numbers.includes(e.target.value)) {
           setWarnForm(true)
       }
       if(!numbers.includes(e.target.value)) {
           setWarnForm(false)
       }
       if(e.target.value.length !== 10) {
           setErrorForm(true)
       }
       if(e.target.value.length === 10) {
           setErrorForm(false)
       }
       
       console.log('Value Changed')
    }

    const handleDelete = (arg) => {
        console.log(arg)
        axios.get(`http://${ip}:3001/del?number=${arg}`)
            .then(result => {
                setNumbers(numbers.filter(number => number !== arg))
            })
    }

    const handleToggle = (number) => {
        console.log(activeNumbers)
        if(activeNumbers.includes(number)) {
            axios.get(`http://${ip}:3001/deactivate?number=${number}`)
                .then(response => {
                    console.log(response)
                    setActiveNumbers(activeNumbers.filter(act_num => act_num !== number))
                })
        } else {
            axios.get(`http://${ip}:3001/activate?number=${number}`)
                .then(response => {
                    console.log(response)
                    setActiveNumbers(activeNumbers.push(number))
                })
        }
    }

    return (
        <React.Fragment>
            <div className="headerNav">
                <Header />
            </div>
            <div className="main">
                <form onSubmit={handleFormSubmission} style={{ minWidth: '66vw' }}>
                    <Card fluid>
                        <Card.Content>
                            <Input fluid action={<Button type='submit'>Register</Button>} placeholder='1234567890' value={currentNumber} onChange={handleRegisterChange} />
                            {errorForm && 
                                <Message 
                                    error
                                    header='Invalid Input'
                                    content='Enter a 10 digit phone number without any spaces or special symbols... No letters allowed!'
                                    style={{ maxHeight: "10em" }}
                                />
                            }
                            {warnForm && 
                                <Message 
                                    warning
                                    header='Duplicate Number'
                                    content='This number is already registered!'
                                    style={{ maxHeight: "10em" }}
                                />
                            }
                        </Card.Content>
                        {numbers.length === 0 && 
                            <Card.Content>
                                Register a phone number to get started!
                            </Card.Content>
                        }
                        {numbers.length > 0 &&
                            <Card.Content>
                                <List>
                                    {numbers.map(number => {
                                        number = String(number)
                                        return (
                                            <List.Item key={number}>
                                                <List.Icon name='delete' fitted onClick={() => {
                                                    handleDelete(number)
                                                }}/>
                                                <List.Content>
                                                    <p>{`(${number.substring(0,3)})-${number.substring(3,6)}-${number.substring(6)}`}</p>
                                                    {(Array.isArray(activeNumbers) && activeNumbers.includes(number)) ?
                                                        <Checkbox slider checked onClick={() => handleToggle(number)} /> : <Checkbox slider onClick={() => handleToggle(number)} />
                                                    }
                                                    
                                                </List.Content>
                                            </List.Item>
                                        )
                                    })}
                                </List>
                            </Card.Content>
                        }
                    </Card>
                </form>
            </div>
            <Segment inverted basic className="footer">
                <Grid columns={2} relaxed='very'>
                    <Grid.Column>
                        <List>
                            <List.Item>
                                <List.Icon name='users'/>
                                <List.Content>Jared DiScipio</List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='marker' />
                                <List.Content>Marblehead, MA</List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='mail' />
                                <List.Content>
                                    <a href='mailto:jared.michael.discipio@gmail.com'>jared.michael.discipio@gmail.com</a>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='linkify' />
                                <List.Content>
                                    <a href='https://github.com/p0pd0c'>Github</a>
                                </List.Content>
                            </List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column>
                        <List>
                            <List.Item>
                                <List.Content>Made With:</List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='node js' />
                                <List.Content>NodeJS</List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='server' />
                                <List.Content>ExpressJS</List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='cloud' />
                                <List.Content>iMessage</List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='paint brush' />
                                <List.Content>Semantic UI</List.Content>
                            </List.Item>
                        </List>
                    </Grid.Column>
                </Grid>

                <Divider vertical inverted />
            </Segment>
        </React.Fragment>
    )
}