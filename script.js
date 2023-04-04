const currentDate = new Date().toISOString().split("T")[0];
document.getElementById("search-input").max = new Date().toISOString().split("T")[0]; // to set the max date as current day in date field
let imageContainer = document.getElementById("current-image-container");


async function getCurrentImageOfTheDay(Date){
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=TGjYhQJjSwaiVDJmwCSknXap1GzwaxzWACegC5oO&date=${Date}`)
    const imageData = await response.json();
    console.log(imageData)
    let image  = `
               <div>
               <h1>picture on ${imageData.date} </h1>
                <img src="${imageData.hdurl}" height="400px" width = "600px"> 
                <h2> ${imageData.title} </h2>
                <p> ${imageData.explanation} </p>
               </div>
                `
    imageContainer.innerHTML = image;
}

getCurrentImageOfTheDay(currentDate);


function getImageOfTheDay(){
    
    let selectedDate = document.getElementById("search-input").value;
    console.log(selectedDate)
    if(selectedDate){
        getCurrentImageOfTheDay(selectedDate)
        saveSearch(selectedDate);
        addSearchToHistory()
    }else{
        alert("select a date")
    }
    
    
}

function saveSearch(date) {

    // Retrieve the existing search history from local storage, or create an empty array if none exists
    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  
    searchHistory.push(date);
  
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}

function addSearchToHistory(){
let searchHistory = document.getElementById("search-history");
let history = JSON.parse(localStorage.getItem("searchHistory"));

if (history) {
  let list = history.map(date => {
    return "<li><a href='#' onclick='getCurrentImageOfTheDay(\"" + date + "\")'>" + date + "</a></li>";
  });

  searchHistory.innerHTML = list.join("");
}else {
  searchHistory.innerHTML = "<h1>No search history found.</h1>";
}
}



  