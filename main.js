const myLibrary = [];

const okButton = document.querySelector("#ok");
const addButton = document.querySelector(".add-button");
const overlay = document.querySelector("#overlay");
const formAddBook = document.querySelector(".form-add-book");
const listBooks = document.querySelector(".list-books");


overlay.addEventListener('click', (e) =>  {
  if(e.target.getAttribute("id") === 'overlay'){
    removeOverlay();
  }
  else e.stopPropagation();
})

addButton.addEventListener('click', () => {
  formAddBook.style.display = "block";
  overlay.style.display = "block";
})

okButton.addEventListener('click', () => {
  const authorName = document.getElementById("author").value;
  const titleName = document.getElementById("title").value;
  const pagesNumber = document.getElementById("pages").value;
  addBookToLibrary(authorName, titleName, pagesNumber);
  removeOverlay();
  showNewBook(authorName, titleName, pagesNumber);
})


function Book (title, author, pages) {
  this.title = title
  this.author = author
  this.pages = pages
}

function addBookToLibrary (title, author, pages) {
  myLibrary.push(new Book(title, author, pages));
}

function removeOverlay() {
  overlay.style.display = "none";
  formAddBook.style.display = "none";
}

function showNewBook(authorName, titleName, pagesNumber) {
  const div = document.createElement('div');
  const pAuthor = document.createElement('p');
  const pTitle = document.createElement('p');
  const pPages = document.createElement('p');
  pAuthor.textContent = `Author: ${authorName}`;
  pTitle.textContent = `Title: ${titleName}`;
  pPages.textContent = `Pages: ${pagesNumber}`;
  div.appendChild(pAuthor);
  div.appendChild(pTitle);
  div.appendChild(pPages);
  div.classList.add("book-item")
  div.setAttribute('id', `${myLibrary.length - 1}`)
  listBooks.appendChild(div)
}