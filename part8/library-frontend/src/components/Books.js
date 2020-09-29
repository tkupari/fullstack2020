import React, {useState, useEffect} from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, GENRES } from '../queries'

const Books = (props) => {
  const [filter, setFilter] = useState({})
  const { loading, refetch, data } = useQuery(ALL_BOOKS, { variables: filter })
  const genreQuery = useQuery(GENRES)

  useEffect(() => {
    refetch(filter)
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
      {genres.map(g => <button key={g} style={g === filter ? {color: 'green'} : null} onClick={() => setFilter({ genre: g })}>{g}</button>)}
      <button onClick={() => setFilter({})}>all genres</button>
      </div>
    </div>
  )
}

export default Books
