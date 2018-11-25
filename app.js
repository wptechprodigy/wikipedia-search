
function handleSubmit(event) {
  // Prevent the page from reloading after submit
  event.preventDefault();
  // Get the value of the input
  const input = document.querySelector('.searchForm-input').value;
  // Trim any possible whitespaces
  const searchTerm = input.trim();
  // Call 'fetchResults' and pass it the 'searchTerm'
  fetchResults(searchTerm);
}

function fetchResults(searchTerm) {
  const endPoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchTerm}`;
  console.log(endPoint);
  
  fetch(endPoint)
    .then(response => response.json())
    .then(data => {
      const results = data.query.search;
      displayResults(results);
    });
  
  // In case any of the .then throw an error
  // .catch(() => console.log('An error occurred'));
}

function displayResults(results) {
  // Store a reference for '.searchResults'
  const searchResults = document.querySelector('.searchResults');
  // Remove all child elements
  searchResults.innerHTML = '';
  // Loop over Results Array
  results.forEach(result => {
    // Result here represent each result in array results
    const url = encodeURI(`https://en.wikipedia.org/wiki/${result.title}`);
    
    searchResults.insertAdjacentHTML('beforeend', 
      `<div class="resultItem"> 
        <h3 class="resultItem-title"> 
          <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
        </h3> 
        <span class="resultItem-snippet">${result.snippet}</span><br> 
        <a href="${url}" class="resultItem-link" target="_blank" rel="noopener">${url}</a> 
      </div>`
    );
  });
}

const form = document.querySelector('.searchForm');
form.addEventListener('submit', handleSubmit);
