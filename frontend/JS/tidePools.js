document.addEventListener('DOMContentLoaded', () => {
    loadShallowsSightings();


});


const loadShallowsSightings = async () => {
    const container = document.querySelector('#container');

    const response = await axios.get('http://localhost:3000/sightings/all');
    console.log(response)
    for (let i = 0; i < response.data.payload.length; i++) {
        let sight = response.data.payload[i]
        if (sight.habitat_id === 3) {
            let eachSight = document.createElement("div");
            eachSight.innerText = (`Animal Spotted: ${sight.name}, Researcher: ${sight.researchername}`)
            eachSight.className = "sight"
            container.appendChild(eachSight)
        }
    }
}