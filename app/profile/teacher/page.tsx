import React from 'react';
import '@/app/styles/globals.css'

const teachers = {
  1: {
    name: 'Mr Smith',
    age: 30,
    subjects: ['Math', 'English'],
  },
}

export default function Page() {
  const teacher = teachers[1];

  return (
    <React.Fragment>
      <h1>Teacher profile</h1>
      <div>Name: {teacher.name}</div>
      <div>Age: {teacher.age}</div>
      <div>Teaches: {teacher.subjects.join(', ')}</div>
    </React.Fragment>
  )
}