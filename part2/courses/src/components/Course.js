import React from 'react';

const Header = ({ course }) => {
  return (
    <h1>{course}</h1>
  )
}

const Part = ({ part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Content = ({ parts }) => {
  const rows = () => parts.map(part =>
    <Part 
      key={part.id}
      part={part}
    />
  )

  return (
    rows()
  )
}

const Total = ({ parts }) => {
  const total = () => parts.reduce( (acc, cur) => acc + cur.exercises, 0 )

  return (
    <p>yhteensä {total()}</p>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default Course
