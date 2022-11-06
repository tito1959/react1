import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { CREATE_PERSON } from '../persons/graphql.mutations'
import { ALL_PERSONS } from '../persons/graphql.queries'

export const PersonForm = ({ notifyError }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')

  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }], // si hace fetch
    onError: (error) => {
      notifyError(error.graphQLErrors[0].message)
    },
    // actualizacion de la cache, evitar el fetching
    update: (store, response) => {
      // store: cache, response: resp
      const dataStore = store.readQuery({ query: ALL_PERSONS })
      store.writeQuery({
        query: ALL_PERSONS,
        data: {
          ...dataStore,
          allPersons: [...dataStore.allPersons, response.data.addPerson],
        },
      })
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    // enviando query
    createPerson({ variables: { name, phone, street, city } })

    setName('')
    setPhone('')
    setStreet('')
    setCity('')
  }

  return (
    <div>
      <h2>Create New Person</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          placeholder="Street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <input
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <div>
          <button>Add person</button>
        </div>
      </form>
    </div>
  )
}
