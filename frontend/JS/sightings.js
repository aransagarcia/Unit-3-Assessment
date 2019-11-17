document.addEventListener('DOMContentLoaded', () => {
    loadSightings();


});



const loadSightings = async () => {
    const container = document.querySelector('#container');
    
    const response = await axios.get('http://localhost:3000/sightings/all');
     for(let i = 0; i < response.data.payload.length; i++){
            let sight = response.data.payload[i]
            let eachSight = document.createElement("div");
            eachSight.innerText = (`Animal Spotted: ${sight.name}, Category: ${sight.category}, Researcher: ${sight.researchername}`)
            eachSight.className = "sight"
            container.appendChild(eachSight);
}
}


