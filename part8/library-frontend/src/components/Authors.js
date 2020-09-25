import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [updateAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const updateYear = (event) => {
    event.preventDefault()
    updateAuthor({
      variables: {
        name: event.target.name.value,
        setBornTo: Number(event.target.born.value)
      }
    })
  }

  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {result.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>set birthyear</h3>
      <form onSubmit={updateYear}>
        name
        <select name="name">
          {result.data.allAuthors.map(a =>
            <option key={a.name} value={a.name}>{a.name}</option>
          )}
        </select><br/>
        born <input name="born" /> <br/>
        <button>update</button>
      </form>

    </div>
  )
}

export default Authors
