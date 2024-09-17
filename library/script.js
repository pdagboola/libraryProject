// Book class
const myLibrary = [];

function Books(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// UI class: handles UI tasks
class UI {
  //   static displayBooks() {
  //     const storedBooks = [];
  //     const books = storedBooks;
  //     books.forEach((book) => UI.addBookToLibrary(book));
  //   }
  static addBookToLibrary(book) {
    const list = document.getElementById("book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${book.name}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td>${book.read}</td>
        <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(row);
  }
  static clearFields() {
    document.querySelector(".book-name").value = "";
    document.querySelector(".author").value = "";
    document.querySelector(".pages").value = "";
    document.getElementById("read").value = -1;
  }
  static deleteBook(element) {
    if (element.classList.contains("delete")) {
      element.parentElement.parentElement.remove();
    }
  }
  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".new-container");
    const form = document.querySelector(".book-form");
    container.insertBefore(div, form);
    // Vanish
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }
}

// Event: Add a book
document.querySelector(".book-form").addEventListener("submit", (e) => {
  e.preventDefault();
  // get form values
  const name = document.querySelector(".book-name").value;
  const author = document.querySelector(".author").value;
  const pages = document.querySelector(".pages").value;
  //   const read = document.querySelector(".read").value;
  const form = document.querySelector(".book-form");
  const formData = new FormData(form);
  const read = formData.get("read");

  // Validate
  if (name === "" || author === "" || pages === "" || read === "") {
    UI.showAlert("Please fill all fields", "empty");
  } else {
    // instantiate book
    const book = new Books(name, author, pages, read);
    console.log(book);

    // Add a book
    UI.addBookToLibrary(book);

    //Clear fields
    UI.clearFields();

    // Add to Library
    myLibrary.push(book);
    console.log(myLibrary);
  }
});
// Event: Remove a book
document.querySelector("#book-list").addEventListener("click", (e) => {
  UI.deleteBook(e.target);
});
