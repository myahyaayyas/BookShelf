document.addEventListener('DOMContentLoaded', function () {

    const submit = document.getElementById('inputBook');

    submit.addEventListener('submit', function (event) {
        event.preventDefault();
        addBook();
    });

    if(isStorageExist()){
        loadDataFromStorage();
    }
});

document.addEventListener('datasave', () => {
    console.log('Data berhasil di simpan.');
});

document.addEventListener('dataloaded', () => {
    refreshDataFromTodos();
});