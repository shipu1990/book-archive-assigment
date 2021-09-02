// console.log('JS is connected');

// Click function and get the input value
document.getElementById('search-button').addEventListener('click', function(){
    document.getElementById("book-info").innerHTML = "";
    document.getElementById("total-result").innerHTML = "";
    document.getElementById("error-message").innerHTML = "";
    
    const inputField = document.getElementById('search-field');
    const inputValue = inputField.value;
    //console.log(inputValue);

    if (inputValue.length > 0){
        getBookName(inputValue);
    }else{
        document.getElementById("error-message").innerHTML =
      "<p class='text-center p-3 bg-danger'><b>Please enter Book Name...</b></p>";
    }
    inputField.value = '';
});

//function for fetch Book from API.
const getBookName = inputVal => {
    const url = `https://openlibrary.org/search.json?q=${inputVal}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayBook(data.docs, data.numFound))
};

//function for displaying Book list.

const displayBook = (data, totalNUm) =>{
    const bookContainer = document.getElementById('book-info');
    data.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('col');

        const {title, author_name, first_publish_year, cover_i} = element;

        const imgUrl = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;
        div.innerHTML = `
             <div class="card">
             <img  src="${imgUrl}" class="card-img-top img-fluid" alt="...">
                <div class="card-body">
                <h5 class="card-text">Book Name: <small>${title}</small></h5>
                <p class="card-text">Author Name: <small>${author_name}</small> </p>
                <p class="card-text">First Publish : <small>${first_publish_year}</small></p>
                </div>
            </div>
        `;

        bookContainer.appendChild(div);
    })

   if(totalNUm !== 0){
    const totalContainer = document.getElementById('total-result');
    totalContainer.innerHTML = `<p  class="btn btn-primary">Total Found: ${totalNUm}</p>`;
   }else{
    displayErrorMsg();
   }

}

//function for displaying error message.
const displayErrorMsg = () => {
    const errorContainer = document.getElementById("error-message");
    errorContainer.innerHTML = ` <div class="card m-auto w-50 p-5 alert alert-danger" >
            <h5 class="card-title">Dear Sir,</h5>
            <p class="card-text"> Your search did not match any Book. Please enter a correct book name.
            </p>
          </div>`;
  };