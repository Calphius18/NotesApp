import type { NoteData, Tags } from "./App";
import { NoteForm } from "./NoteForm";
import { useNote } from "./NoteLayout";

type EditNoteProps = {
  onSubmit: (id :string, data: NoteData) => void
  onAddTag: (tag: Tags) => void
  availableTags: Tags[]
}

export function EditNote( { onSubmit, onAddTag, availableTags }: EditNoteProps) {

  const note = useNote()

    return ( 
      <>
      <h1 className="mb-4">Edit Note</h1>
      <NoteForm 
        title= {note.title}
        markdown={note.markdown}
        tags = {note.tags}
        onSubmit={data => onSubmit(note.id, data)} 
        onAddTag={onAddTag} 
        availableTags={availableTags}/>
      </> 
)
   
}