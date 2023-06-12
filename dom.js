const UNCOMPLETED_BOOK= "incompleteBookshelfList";
const COMPLETED_BOOK = "completeBookshelfList";
const BOOK_ITEMID = "itemId";

function makeBook(judul, penerbit, tahun, isCompleted) {

    const title = document.createElement('h3');
    title.innerHTML = judul;

    const publisher = document.createElement('p');
    publisher.innerHTML = 'Penulis: ' + penerbit;

    const year = document.createElement('p');
    year.innerHTML = 'Tahun: ' +  tahun;

    const div = document.createElement('div');
    div.classList.add('action');

    const article = document.createElement('article');
    article.classList.add('book_item');
    article.append(title, publisher, year, div);

    if (isCompleted) {
        div.append(
            undoButton(),
            trashButton()
        );
    } else {
        div.append(
            checkButton(),
            trashButton()
        );
    }

    return article;
}

function undoButton() {
    return createButton('green', 'Belum selesai', function (event) {
        undoTaskFromCompleted(event.target.parentElement.parentElement);
    });
}

function trashButton() {
    return createButton('red', 'Hapus buku', function (event) {
        removeTaskFromCompleted(event.target.parentElement.parentElement);
    });
}

function checkButton() {
    return createButton('green', 'Selesai dibaca', function (event) {
        addTaskToCompleted(event.target.parentElement.parentElement);
    });
}

function createButton(buttonTypeClass, text, eventListener) {
    const button = document.createElement('button');
    button.innerText = text;
    button.classList.add(buttonTypeClass);
    button.addEventListener('click', function (event) {
        eventListener(event);
        event.stopPropagation();
    });
    return button;
}

function addBook() {
    const completed = document.getElementById(COMPLETED_BOOK)
    const uncompleted = document.getElementById(UNCOMPLETED_BOOK)
    const judul = document.getElementById('inputBookTitle').value;
    const penerbit = document.getElementById('inputBookAuthor').value;
    const tahun = document.getElementById('inputBookYear').value;
    const isCompleted = document.getElementById('inputBookIsComplete').checked;

    const book = makeBook(judul, penerbit, tahun, isCompleted);
    const bookObjeck = bokObjeck(judul, penerbit, tahun, isCompleted);

    book[BOOK_ITEMID] = bookObjeck.id
    books.push(bookObjeck);

    if (isCompleted) {
        completed.append(book);
    } else {
        uncompleted.append(book);
    }

    updateDataToStorage();
}

function addTaskToCompleted(taskElement) {
    const completed = document.getElementById(COMPLETED_BOOK);
    const taskTitle = taskElement.querySelector('.book_item > h3').innerText;
    const taskPublisher = taskElement.querySelectorAll('.book_item > p:nth-child(1)').innerText;
    const taskYear = taskElement.querySelectorAll('.book_item > p:nth-child(2)').innerText;

    const newBook = makeBook(taskTitle, taskPublisher, taskYear, true);
    
    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id;

    completed.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}

function removeTaskFromCompleted(taskElement) {

    const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);

    taskElement.remove();
    updateDataToStorage();
}

function undoTaskFromCompleted(taskElement) {
    const uncompleted = document.getElementById(UNCOMPLETED_BOOK);
    const taskTitle = taskElement.querySelector('.book_item > h3').innerText;
    const taskPublisher = taskElement.querySelectorAll('.book_item > p:nth-child(1)').innerText;
    const taskYear = taskElement.querySelectorAll('.book_item > p:nth-child(2)').innerText;
    
    const newBook = makeBook(taskTitle, taskPublisher, taskYear, false);

    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;

    uncompleted.append(newBook);
    taskElement.remove();
    
    updateDataToStorage();
}

const searchButton = document.getElementById('searchSubmit');
searchButton.addEventListener('click', function (titleBook) {
    const searchBookTitle = document.getElementById('searchBookTitle').value;
    const buku = document.querySelectorAll('article');
    for(book of buku){
        const title = book.innerText
        if (title.includes(searchBookTitle)) {
            book.style.display = 'block';
            console.log(title);
        } else {
            book.style.display = 'none'
        }
    }
    titleBook.preventDefault();
    updateDataToStorage();
})