import React, { FC } from "react";
import { useState } from "react";
import { prisma } from '../../lib/prisma'
import Router from "../../node_modules/next/router";

interface Notes {
  notes: {
    id: string
    title: string
    content: string
  }[]
}

interface FormData {
  title: string
  content: string
  id: string
}


const Home:FC = ({notes}: Notes) => {
  const [form, setForm] = useState<FormData>({title: '', content: '', id: ''})

  const refreshData = () => {
    Router.replace(Router.asPath)
  }

  async function create(data: FormData) {
    try {
      fetch('http://localhost:3000/api/create', {
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json'
        },
        method: 'POST'
      }).then(()=> {
        setForm({title: "", content:"", id: ""})
        refreshData()
      })
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteNote(id: string) {
    try {
      fetch(`http://localhost:3000/api/note/${id}`, {
        headers: {
          "Content-Type" : "application/json"
        },
        method: 'DELETE'
      }).then(() => {
        refreshData()
      })
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (data: FormData) => {
    try {
      create(data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="m-2">
      <h1 className="m-5 text-center font-bold text-3xl">Notes</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit(form)
        }}
        className="w-[50vh] h-[30vh] mx-auto space-y-6 items-stretch"
      >
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className = 'm-1 p-2 rounded-md border-[1px]'
        />
        <textarea
          placeholder="content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className = 'm-1 p-2 rounded-md border-[1px]'
        />
        <button>Add +</button>
      </form>

      <div>
        <ul>
          {notes.map(note => (
            <li key={note.id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <button onClick={() => {deleteNote(note.id)}}>Delete X</button>
            </li>
          ) 
            )}
        </ul>
      </div>
    </div>
  );
}

export default Home;

export const getServerSideProps = async() => {
  const notes = await prisma.note.findMany({
    select: {
      title: true,
      id: true,
      content: true
    }
  })
  return {
    props: {
      notes
    }
  }
}