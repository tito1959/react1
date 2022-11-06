import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { LOGIN } from './graphql-queries'

export const LoginForm = ({ notifyError, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      notifyError(error.graphQLErrors[0].message)
    },
  })

  useEffect(() => {
    if (result.data) {
      const { value: token } = result.data.login
      setToken(token)
      localStorage.setItem('token_user', token)
    }
  }, [result.data])

  const Submit = (e) => {
    e.preventDefault()

    login({ variables: { username, password } }) // llamando useMutation
  }

  return (
    <div>
      <form onSubmit={Submit}>
        <div>
          <label htmlFor="username">username</label>
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}
