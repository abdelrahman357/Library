const myLibrary = [];

function Book(title, author, numOfPages, readStatus) {
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.readStatus = readStatus;
}
Book.prototype.changeStatus = function () {
  if (this.readStatus === "I didn't read it yet") {
    this.readStatus = "I have read it";
  } else if (this.readStatus === "I have read it") {
    this.readStatus = "I didn't read it yet";
  }
};
const container = document.querySelector(".container");
function addBookToLibrary(e) {
  const newBook = new Book();
  const inputs = e.target.querySelectorAll("input");
  inputs.forEach((input) => {
    if ((input.type === "radio") & input.checked) {
      newBook[input.name] = input.value;
    } else if (input.type !== "radio") {
      newBook[input.name] = input.value;
    }
  });
  myLibrary.push(newBook);
  e.preventDefault();
  displayLibrary(myLibrary.length - 1);
}
const newBookForm = document.querySelector(".newBookForm");
newBookForm.addEventListener("submit", addBookToLibrary);
newBookForm.addEventListener("submit", () => {
  newBookForm.classList.add("zIndexNegative");
  newBookForm.classList.remove("zIndexMax");
  container.classList.remove("bgBlur");
});
const addBookForm = document.querySelector(".addBookForm");
function showForm() {
  newBookForm.classList.remove("zIndexNegative");
  newBookForm.classList.add("zIndexMax");
  container.classList.add("bgBlur");
}
addBookForm.addEventListener("click", showForm);
const books = document.querySelector(".books");
function displayLibrary(n) {
  for (let i = n; i < myLibrary.length; i++) {
    const book = document.createElement("div");
    book.className = "book";
    book.setAttribute("data-index", i);
    // --------------------
    const bookTitle = document.createElement("h3");
    bookTitle.textContent = myLibrary[i].title;
    //  -----------------------
    const authorCont = document.createElement("div");
    authorCont.className = "author";
    const authorTitle = document.createElement("h4");
    authorTitle.textContent = "Author:";
    const authorName = document.createElement("p");
    authorName.textContent = myLibrary[i].author;
    // -------------------------------
    const pageCont = document.createElement("div");
    pageCont.className = "pages";
    const pageTitle = document.createElement("h4");
    pageTitle.textContent = "Pages:";
    const pageNumber = document.createElement("span");
    pageNumber.textContent = myLibrary[i].numOfPages;
    // ---------------------------------
    const swCase = document.createElement("div");
    swCase.className = "swCase";
    const swCaseStatus = document.createElement("p");
    swCaseStatus.textContent = myLibrary[i].readStatus;
    const swCaseBtn = document.createElement("button");
    swCaseBtn.className = "swCaseBtn";
    swCaseBtn.textContent =
      myLibrary[i].readStatus === "I have read it" ? "Didn't read" : "Read it";
    // -----------------------------------
    const rmBookBtn = document.createElement("button");
    rmBookBtn.className = "rmBookBtn";
    rmBookBtn.textContent = "Remove Book";
    // ------------------------------------
    book.append(bookTitle);
    authorCont.append(authorTitle);
    authorCont.append(authorName);
    book.append(authorCont);
    pageCont.append(pageTitle);
    pageCont.append(pageNumber);
    book.append(pageCont);
    swCase.append(swCaseStatus);
    swCase.append(swCaseBtn);
    book.append(swCase);
    book.append(rmBookBtn);
    books.append(book);
    // ------------------------------------
    rmBookBtn.addEventListener("click", (e) => {
      const current = e.target.parentElement;
      myLibrary.splice(`${current.getAttribute("data-index")}`, 1);
      current.remove();
      const allBooks = document.querySelectorAll(".book");
      for (let j = 0; j < allBooks.length; j++) {
        allBooks[j].setAttribute("data-index", j);
      }
    });
    // --------------------------------------
    // function modifyStatus
    swCase.addEventListener("click", (e) => {
      const element =
        myLibrary[
          e.target.parentElement.parentElement.getAttribute("data-index")
        ];
      element.changeStatus();
      swCaseStatus.textContent = element.readStatus;
      swCaseBtn.textContent =
        element.readStatus === "I have read it" ? "Didn't read" : "Read it";
    });
  }
}
