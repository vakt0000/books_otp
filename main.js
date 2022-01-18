const myLibrary = [];
const indexEditing = [];

const okAddBookButton = document.querySelector("#ok");
const cancelAddBookButton = document.querySelector("#cancel")
const addButton = document.querySelector(".add-button");
const addOverlayButton = document.querySelector("#overlay");
const formAddBook = document.querySelector(".form-add-book");
const listBooks = document.querySelector(".list-books");


overlay.addEventListener('click', (e) =>  {
  if(e.target.getAttribute("id") === 'overlay'){
    removeOverlay();
  }
  else e.stopPropagation();
})

addButton.addEventListener('click', addOverlay);

okAddBookButton.addEventListener('click', () => {
  const authorName = document.getElementById("author").value;
  const titleName = document.getElementById("title").value;
  const pagesNumber = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;
  if (indexEditing[0] === undefined) createAddBook(authorName, titleName, pagesNumber, read);
  else editBook(authorName, titleName, pagesNumber, read);
})

cancelAddBookButton.addEventListener('click', () => {
  removeOverlay();
})

function createAddBook(authorName, titleName, pagesNumber, read) {
  addBookToLibrary(authorName, titleName, pagesNumber, read);
  removeOverlay();
  showNewBook();
}

function editBook(authorName, titleName, pagesNumber, read) {
  myLibrary[indexEditing[0]].author = authorName;
  myLibrary[indexEditing[0]].title = titleName;
  myLibrary[indexEditing[0]].pages = pagesNumber;
  myLibrary[indexEditing[0]].read = read;
  updateListBook();
  indexEditing.pop();
  removeOverlay();
}

function Book (title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

function addBookToLibrary (title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

function removeOverlay() {
  document.getElementById("author").value = '';
  document.getElementById("title").value = '';
  document.getElementById("pages").value = '';
  overlay.style.display = "none";
  formAddBook.style.display = "none";
}

function addOverlay() {
  overlay.style.display = "block";
  formAddBook.style.display = "block";
}

function updateListBook() {
  const div = document.getElementById(indexEditing[0]);
  div.querySelector(".author").textContent = `Author: ${myLibrary[indexEditing[0]].author}`;
  div.querySelector(".title").textContent = `Title: ${myLibrary[indexEditing[0]].title}`;
  div.querySelector(".pages").textContent = `Pages: ${myLibrary[indexEditing[0]].pages}`;
  console.log(myLibrary[indexEditing[0]].read)
  if (myLibrary[indexEditing[0]].read === true) {
    div.querySelector(".read").textContent = 'Read'
  }
  else {
    div.querySelector(".read").textContent = 'Not read'
  }
}

function showNewBook() {
  const indexNew = myLibrary.length - 1;
  const author = myLibrary[indexNew].author;
  const title = myLibrary[indexNew].title;
  const pages = myLibrary[indexNew].pages;
  const read = myLibrary[indexNew].read;
  const div = createFillInfoDiv(author, title, pages, read);
  div.appendChild(createEditButton())
  div.appendChild(createRemoveBookButton());
  div.classList.add("book-item")
  div.setAttribute('id', `${myLibrary.length - 1}`)
  listBooks.appendChild(div)
}

function createFillInfoDiv(author, title, pages, read) {
  const div = document.createElement('div');
  const pAuthor = document.createElement('p');
  const pTitle = document.createElement('p');
  const pPages = document.createElement('p');
  const pRead = document.createElement('p');
  pAuthor.classList.add("author");
  pTitle.classList.add("title");
  pPages.classList.add("pages");
  pRead.classList.add("read");
  pAuthor.textContent = `Author: ${author}`;
  pTitle.textContent = `Title: ${title}`;
  pPages.textContent = `Pages: ${pages}`;
  if (read === true) pRead.textContent = "Read";
  else pRead.textContent = "Not read";
  div.appendChild(pAuthor);
  div.appendChild(pTitle);
  div.appendChild(pPages);
  div.appendChild(pRead);
  return div;
}

function createRemoveBookButton() {
  const button = document.createElement('button');
  button.textContent = "REMOVE"
  button.addEventListener('click', (e) => {
    listBooks.removeChild(e.path[1]);
  });
  return button;
}

function createEditButton() {
  const button = document.createElement('button');
  button.textContent = "EDIT";
  button.addEventListener('click', (e) => {
    const idItemBook = e.path[1].getAttribute('id');
    indexEditing.push(parseInt(idItemBook));
    document.getElementById("author").value = myLibrary[idItemBook].author; 
    document.getElementById("title").value = myLibrary[idItemBook].title; 
    document.getElementById("pages").value = myLibrary[idItemBook].pages;  
    addOverlay();
  })
  return button;
}