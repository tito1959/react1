import { useLazyQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { FIND_PERSON } from '../persons/graphql.queries'

export const Persons = ({ persons }) => {
  const [getPerson, result] = useLazyQuery(FIND_PERSON)
  const [person, setPerson] = useState(null)

  const showPerson = (name) => {
    getPerson({ variables: { nameToSearch: name } })
  }

  useEffect(() => {
    if (result.data) {
      setPerson(result.data.findPerson)
    }
  }, [result])

  if (person) {
    return (
      <div>
        <h2>{person.name}</h2>
        <div>
          {person.address.street}, {person.address.city}
        </div>
        <div>{person.phone}</div>
        <button onClick={() => setPerson(null)}>Set Null</button>
      </div>
    )
  }

  if (persons === null || undefined) return null

  return (
    <div>
      <h2>Persons</h2>
      {persons.map((p) => (
        <div
          key={p.id}
          onClick={() => {
            showPerson(p.name)
          }}
        >
          {p.name}, Phone: {p.phone}
        </div>
      ))}
    </div>
  )
}
