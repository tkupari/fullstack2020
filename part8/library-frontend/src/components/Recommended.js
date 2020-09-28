import React, {useState} from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const currentUser = useQuery(ME)
  if (!props.show) {
    return null
  }
  if (result.loading || currentUser.loading) {
    return <div>loading...</div>
  }

  const favoriteGenre = currentUser.data.me.favoriteGenre
  const booksToShow = result.data.allBooks.filter(b => b.genres.includes(favoriteGenre))

  return (
    <div>
      <h2>recommendations</h2>
      genre: <b>{favoriteGenre}</b>

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
    </div>
  )
}

export default Books

