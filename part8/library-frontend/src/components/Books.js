import React, {useState} from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [filter, setFilter] = useState(null)
  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }
  const genres = Array.from(new Set(result.data.allBooks.flatMap(book => book.genres)))
  const booksToShow = filter
    ? result.data.allBooks.filter(b => b.genres.includes(filter))
    : result.data.allBooks

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksToShow.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
      {genres.map(g => <button key={g} style={g === filter ? {color: 'green'} : null} onClick={() => setFilter(g)}>{g}</button>)}
      <button onClick={() => setFilter(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
