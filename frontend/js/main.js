window.addEventListener('DOMContentLoaded', (event) => {
    getVisitCount();
});

const functionApi = 'http://localhost:7071/api/....';
const functionApiAzure = "https://co...................................?"


const getVisitCount = () => {
    
    fetch(functionApiAzure).then(response => {
        return response.json();
    }).then(response => {
        console.log("Website called function API.");
        count = response.count;
        // count = 30;
        document.getElementById("counter").innerText = count;
    }).catch(function(error){
        console.log(error);
    });
   
    return;
}
