# Back-End of Notes App

## Data

This API will store notes data where each note has attributes like the following:

```json
{
  "id": "string",
  "name": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "tags": ["array", "of", "string"],
  "body": "string"
}
```

This is the example of the note:

```json
{
  "id": "notes-V1StGXR8_Z5jdHi6B-myT",
  "title": "History of the JavaScript language",
  "createdAt": "2020-12-23T23:00:09.686Z",
  "updatedAt": "2020-12-23T23:00:09.686Z",
  "tags": ["javascript", "history"],
  "body": "JavaScript was first developed by Brendan Eich of Netscape under the name Mocha, later renamed LiveScript, and eventually JavaScript. Navigator has previously supported Java for more use by non-Java programmers."
}
```

## API Endpoints

### 1. Add a Note

Use this endpoint to add a new note.

```raml
/notes:
  post:
    description: Add a new note.
    request:
      body:
        application/json:
          example: |
            {
              "title": "History of the JavaScript language",
              "tags": ["javascript", "history"],
              "body": "JavaScript was first developed by..."
            }
    responses:
      201:
        body:
          application/json:
            example: |
              {
                "status": "success",
                "message": "Note added successfully",
                "data": {
                  "noteId": "V09YExygSUYogwWJ"
                }
              }
      500:
        body:
          application/json:
            example: |
              {
                "status": "error",
                "message": "Note failed to add"
              }
```

### 2. Get the note(s)

Use this endpoint to get all notes or a specific note by its `id`.

```raml
/notes:
  get:
    description: Get all notes.
    responses:
      200:
        body:
          application/json:
            example: |
              {
                "status": "success",
                "data": {
                  "notes": [
                    {
                      "id": "notes-V1StGXR8_Z5jdHi6B-myT",
                      "title": "History of the JavaScript language",
                      "createdAt": "2020-12-23T23:00:09.686Z",
                      "updatedAt": "2020-12-23T23:00:09.686Z",
                      "tags": ["javascript", "history"],
                      "body": "JavaScript was first developed by..."
                    },
                    ...
                  ]
                }
              }
      404:
        body:
          application/json:
            example: |
              {
                "status": "error",
                "message": "Note not found. The note's id doesn't exists."
              }
```

```raml
/notes/{id}:
  get:
    description: Get a specific note.
    responses:
      200:
        body:
          application/json:
            example: |
              {
                "status": "success",
                "data": {
                  "note": {
                    "id": "notes-V1StGXR8_Z5jdHi6B-myT",
                    "title": "History of the JavaScript language",
                    "createdAt": "2020-12-23T23:00:09.686Z",
                    "updatedAt": "2020-12-23T23:00:09.686Z",
                    "tags": ["javascript", "history"],
                    "body": "JavaScript was first developed by..."
                  }
                }
              }
      404:
        body:
          application/json:
            example: |
              {
                "status": "fail",
                "message": "Note not found. The note's id doesn't exists."
              }
```

### 3. Update a note

Use this endpoint to update a note.

```raml
/notes/{id}:
  put:
    description: Update a note.
    request:
      body:
        application/json:
          example: |
            {
              "title": "History of the JavaScript language",
              "tags": ["javascript", "history"],
              "body": "JavaScript was first developed by..."
            }
    responses:
      200:
        body:
          application/json:
            example: |
              {
                "status": "success",
                "message": "Note updated successfully"
              }
      404:
        body:
          application/json:
            example: |
              {
                "status": "fail",
                "message": "Note not found. The note's id doesn't exists."
              }
      500:
        body:
          application/json:
            example: |
              {
                "status": "error",
                "message": "Note failed to update"
              }
```

### 4. Delete a note

Use this endpoint to delete a note.

```raml
/notes/{id}:
  delete:
    description: Delete a note.
    responses:
      200:
        body:
          application/json:
            example: |
              {
                "status": "success",
                "message": "Note deleted successfully"
              }
      404:
        body:
          application/json:
            example: |
              {
                "status": "fail",
                "message": "Note not found. The note's id doesn't exists."
              }
      500:
        body:
          application/json:
            example: |
              {
                "status": "error",
                "message": "Note failed to delete"
              }
```
