import React, {useState, useEffect} from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, GENRES } from '../queries'

const Books = (props) => {
  const { loading, refetch, data } = useQuery(ALL_BOOKS)
  const genreQuery = useQuery(GENRES)
  const [filter, setFilter] = useState(null)

  useEffect(() => {
    refetch({ genre: filter })
  }, [refetch, filter])

  if (!props.show) {
    return null
  }

  if (loading) {
    return <div>loading...</div>
  }
  const genres = genreQuery.data.genres
  const booksToShow = data.allBooks

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
