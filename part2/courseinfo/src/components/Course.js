import React from 'react';

const Header = ({ course }) => <h1>{course.name}</h1>
const Part = ({ part }) => <p>{part.name} {part.exercises}</p>
const Content = ({ parts }) => <div>{parts.map(part => <Part key={part.id} part={part} />)}</div>
const Total = ({ parts }) => <p><b>total of {parts.reduce((acc, part) => acc + part.exercises, 0)} exercises</b></p>
const Course = ({ course }) => (
  <div>
    <Header course={course} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

export default Course
