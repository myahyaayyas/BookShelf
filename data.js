const STORAGE_KEY = "BOOK_APP";

let books = [];

function isStorageExist() {
    if(typeof(Storage) === undefined){
        alert('Browser tidak mendukung local storage');
        return false
    } 
    return true;
}

function saveData() {
    const save = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, save);
    document.dispatchEvent(new Event('datasave'));
}

function loadDataFromStorage() {
    const serialData = localStorage.getItem(STORAGE_KEY);
    
    let data = JSON.parse(serialData);
    
    if(data !== null)
        books = data;

    document.dispatchEvent(new Event('dataloaded'));
}

function updateDataToStorage() {
    if(isStorageExist())
        saveData();
}

function bokObjeck(title, publisher, year, isCompleted) {
    return {
        id: +new Date(),
        title,
        publisher,
        year,
        isCompleted
    };
}

function findBook(bookId) {

    for(book of books){
        if(book.id === bookId)
            return book;
    }

    return null;
}

function findBookIndex(bookId) {
    
    let index = 0
    for (book of books) {
        if(book.id === bookId)
            return index;

        index++;
    }

    return -1;
}

function refreshDataFromTodos() {
    const uncompleted = document.getElementById(UNCOMPLETED_BOOK);
    let completed = document.getElementById(COMPLETED_BOOK);

    for(book of books){
        const newBook = makeBook(book.title, book.publisher, book.year, book.isCompleted);
        newBook[BOOK_ITEMID] = book.id;

        if(book.isCompleted){
            completed.append(newBook);
        } else {
            uncompleted.append(newBook);
        }
    }
}