import { gql } from "@apollo/client"

export const PERSON_ALL_DETAILS = gql`
  fragment PersonDetails on Person {
    id
    name
    phone
    address {
      street
      city
    }
  }
`

export const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      ...PersonDetails
    }
  }
`

export const ALL_PERSONS = gql`
  ${PERSON_ALL_DETAILS}
  query {
    allPersons {
      ...PersonDetails
    }
  }
`
