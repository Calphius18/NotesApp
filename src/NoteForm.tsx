import { useRef, useState, type FormEvent } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable"
import type { NoteData, Tags } from "./App";
import {v4 as uuidV4} from "uuid"

type NoteFormProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tags) => void
    availableTags: Tags[]
}

export function NoteForm({onSubmit, onAddTag, availableTags}: NoteFormProps) {
    const titleRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectedTags] = useState<Tags[]>([])
    const navigate = useNavigate()

    function handleSubmit(e: FormEvent) {
        e.preventDefault()

        onSubmit({
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: selectedTags
        })

        navigate("..")
    }
    
    return( 
    <Form onSubmit={handleSubmit}>
        <Stack gap = {4}>
            <Row>
                <Col>
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control ref = {titleRef} required/>
                </Form.Group>
                </Col>
                <Col>
                <Form.Group controlId="tags">
                    <Form.Label>Tags</Form.Label>
                    <CreatableReactSelect
                        onCreateOption={label => {
                            const newTag = {id: uuidV4(), label}
                            onAddTag(newTag)
                            setSelectedTags(prev => [...prev, newTag])
                        }}                    
                        value= {selectedTags.map(tag => {
                            return { label: tag.label, value:tag.id }
                        })}
                        options={availableTags.map(tag => {
                            return {label: tag.label, value: tag.id}
                        })}
                        onChange={tags => {
                            setSelectedTags(
                                tags.map(tag => {
                                    return {label: tag.label, id: tag.value}
                                })
                            )
                        }}
                    isMulti/>
                </Form.Group>
                </Col>
            </Row>
            <Form.Group controlId="markdown">
                    <Form.Label>Body</Form.Label>
                    <Form.Control ref = {markdownRef} required as= "textarea" rows = {15}/>
            </Form.Group>
            <Stack direction="horizontal" gap={2} className="justify-content-end">
                <Button type="submit" variant="primary">Save</Button>
                <Link to="..">
                    <Button type="button" variant="outline-secondary">Cancel</Button>
                </Link>
                
            </Stack>      
        </Stack>
    </Form>)
}