import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"
import {Routes, Route, Navigate, data} from "react-router-dom"
import { NewNote } from "./NewNote";
import { useLocalStorage } from "./useLocalStorage";
import { useMemo } from "react";
import {v4 as uuidV4} from "uuid"
import { NoteList } from "./NoteList";
import { NoteLayout } from "./NoteLayout";
import { Note } from "./Note";
import { EditNote } from "./EditNote";

export type Note = {
  id : string
} & NoteData

export type NoteData = {
  title: string
  markdown: string
  tags: Tags[]
}

export type Tags = {
  id: string
  label: string
}

export type RawNote = {
  id: string
} & RawNotesData

export type RawNotesData = {
  title:string
  markdown: string
  tagIds: string[]
}

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tags[]>("TAGS", [])
  
  const noteWithTags = useMemo (() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id))}
    })
  }, [notes, tags])   

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return[
        ...prevNotes, 
        { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id)}, ]
    })
  }

  function onEditNote(id: string, { tags, ...data}: NoteData) {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id) {
          return {...note, ...data, tagIds: tags.map(tag => tag.id) }
        } else {
          return note
        }
      } )
      return[
        ...prevNotes, 
        { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id)}, ]
    })
  }

  function addTag(tag: Tags) {
    setTags(prev => [...prev, tag])
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element= {<NoteList notes={noteWithTags} availableTags={tags}/>} />
        <Route path="/new" element= {
          <NewNote 
            onSubmit = {onCreateNote}
            onAddTag={addTag}
            availableTags= {tags}
          />} />
        <Route path="/:id" element={<NoteLayout notes={noteWithTags}/>}>
          <Route index element = {<Note />}/>
          <Route path="edit" element = {
            <EditNote 
              onSubmit = {onEditNote}
              onAddTag={addTag}
              availableTags= {tags}
            />}/>
        </Route>
        <Route path="*" element= {<Navigate to = "/" />} />
      </Routes>
    </Container>
  )
}

export default App
