const express = require("express");
const path = require("path");

const app = express();
const PORT = 8080;
const cors = require('cors');
app.use(cors());
app.use(express.json());
let notes = [];

app.post('/notes', (req, res) =>{
  const newNote = {
    text: req.body.text,
    id: notes.length + 1
  };
  notes.push(newNote);
  res.json({
    message: "noteAdded",
    notes: notes
  });
});

app.delete('/notes', (req, res) => {
  notes = [];
  res.json({ message: 'All notes deleted' });
});

app.delete('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  notes = notes.filter(note => note.id !== id);
  res.json({ message: `Note ${id} deleted`, notes });
});

app.put('/notes/:id', (req, res) =>{
  const id = parseInt(req.params.id);
  const note = notes.find( n => n.id === id);
  if (!note) {
  return res.status(404).json({ message: "Note not found" });
}

note.text = req.body.text;
if (!req.body.text) {
  return res.status(400).json({ message: "Text is required" });
}
res.json({message: "Note Updated", note});
})

app.get('/notes', (req, res) => {
  res.json(notes);
})
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
})

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, "about.html"));
})
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, "contact-me.html"));
})


app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "404.html"));
})

app.listen(PORT, ()=>{
    console.log(`the server is running on http://localhost:${PORT}`)
})