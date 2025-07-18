import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"
import {Routes, Route, Navigate} from "react-router-dom"
import { NewNote } from "./NewNote";
import { useLocalStorage } from "./useLocalStorage";
import { useMemo } from "react";
import {v4 as uuidV4} from "uuid"
import { NoteList } from "./NoteList";

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

  function onCreate({ tags, ...data }: NoteData) {
    setNotes(prevNotes => {
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
          onSubmit = {onCreate}
          onAddTag={addTag}
          availableTags= {tags}
          />} />
        <Route path="/:id">
          <Route index element = {<h1>Show</h1>}/>
          <Route path="edit" element = {<h1>Edit</h1>}/>
        </Route>
        <Route path="*" element= {<Navigate to = "/" />} />
      </Routes>
    </Container>
  )
}

export default App
