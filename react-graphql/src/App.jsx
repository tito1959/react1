/**
 * useQuery Hook de @apollo /client que maneja las consultas y nos devuelve: data, error, loading
 */
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { usePersons } from './persons/usePersonsHook'
import { Persons } from './components/Persons'
import { Notify } from './components/Notify'
import { PersonForm } from './components/PersonForm'
import { PhoneForm } from './components/PhoneForm'
import { LoginForm } from './login/LoginForm'
import { useApolloClient } from '@apollo/client'

function App() {
  const { data, error, loading } = usePersons()
  const [errorMessage, setErrorMessage] = useState(null)
  const [count, setCount] = useState(0)
  const [token, setToken] = useState(() => localStorage.getItem('token_user'))
  const client = useApolloClient()

  if (error) return <span style="color: red">{error}</span>

  const notifyError = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const logOut = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div className="App">
      <Notify errorMessage={errorMessage} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src="/vite.svg" className="logo" alt="Vite logo" />
            </a>
            <a href="https://reactjs.org" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>Vite + React</h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p>
              Edit <code>src/App.jsx</code> and save to test HMR
            </p>
          </div>
          {token ? (
            <button onClick={logOut}>LogOut</button>
          ) : (
            <LoginForm notifyError={notifyError} setToken={setToken} />
          )}
          <Persons persons={data?.allPersons} />
          <PersonForm notifyError={notifyError} />
          <PhoneForm />
        </>
      )}
    </div>
  )
}

export default App
