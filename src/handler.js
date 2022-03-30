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

module.exports = {addNoteHandler};
