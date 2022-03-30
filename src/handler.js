const {nanoid} = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  const {title, tags, body} = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  const newNote = {id, createdAt, updatedAt, title, tags, body};

  // Add the new note to the notes array.
  notes.push(newNote);

  // Check if the note was added successfully.
  const isSuccess = notes.filter((note) => note.id === id).length === 1;

  if (isSuccess) {
    return h.response({
      status: 'success',
      message: 'Note added successfully.',
      data: {
        noteId: id,
      },
    }).code(201);
  }

  return h.response({
    'status': 'fail',
    'message': 'Note failed to add',
  }).code(500);
};

const getAllNotesHandler = (request, h) => {
  return {
    status: 'success',
    data: {notes},
  };
};

const getNoteByIdHandler = (request, h) => {
  const {id} = request.params;
  const note = notes.find((note) => note.id === id);

  if (note !== undefined) {
    return {
      status: 'success',
      data: {note},
    };
  }

  return h.response({
    status: 'fail',
    message: `Note not found. The note's id doesn't exists.`,
  }).code(404);
};

const editNoteByIdHandler = (request, h) => {
  const {id} = request.params;
  const {title, tags, body} = request.payload;
  const updatedAt = new Date().toISOString();
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };


    return {
      status: 'success',
      message: 'Note updated successfully.',
    };
  }

  return h.response({
    status: 'fail',
    message: `Note not found. The note's id doesn't exists.`,
  }).code(404);
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
};
