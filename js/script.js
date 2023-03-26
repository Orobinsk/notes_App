const addbtn = document.getElementById('add')

const notes = JSON.parse(localStorage.getItem('notes'))

if (notes) {
  notes.forEach((note) => addNewNote(note))
}

addbtn.addEventListener('click', () => {
  addNewNote()
})

function addNewNote(text = '') {
  const createNote = document.createElement('div')
  createNote.classList.add('note')
  createNote.innerHTML = `
<div class="tools">
<button class="edit"><i class="fas fa-edit"></i></button>
<button class="delete"><i class="fas fa-trash-alt"></i></button>
</div>
<div class="main ${text ? '' : 'hidden'}"></div>
<textarea class="${text ? 'hidden' : ''}"></textarea>`
  document.body.appendChild(createNote)

  const edit = createNote.querySelector('.edit')
  const remove = createNote.querySelector('.delete')
  const main = createNote.querySelector('.main')
  const textArea = createNote.querySelector('textarea')

  textArea.value = text
  main.innerHTML = marked.parse(text)

  remove.addEventListener('click', () => {
    createNote.remove()

    updateLS()
  })
  edit.addEventListener('click', () => {
    main.classList.toggle('hidden')
    textArea.classList.toggle('hidden')
  })
  textArea.addEventListener('input', (e) => {
    const { value } = e.target
    main.innerHTML = marked.parse(value)

    updateLS()
  })
}

function updateLS() {
  const notesText = document.querySelectorAll('textarea')

  const notes = []
  notesText.forEach((note) => notes.push(note.value))
  localStorage.setItem('notes', JSON.stringify(notes))
}
