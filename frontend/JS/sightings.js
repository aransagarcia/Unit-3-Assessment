// document.addEventListener('DOMContentLoaded', () => {
//     loadSightings();


// });



// const loadSightings = async () => {
//     const container = document.querySelector('#container');

//     const response = await axios.get('http://localhost:3000/sightings/all');
//      for(let i = 0; i < response.data.payload.length; i++){
//             let sight = response.data.payload[i]
//             let eachSight = document.createElement("div");
//             eachSight.innerText = (`Animal Spotted: ${sight.name}, Category: ${sight.category}, Researcher: ${sight.researchername}`)
//             eachSight.className = "sight"
//             container.appendChild(eachSight);
// }
// }



document.addEventListener("DOMContentLoaded", () => {
    getResearchers()
})


const getResearchers = async () => {
    let dropdown = document.querySelector('#selectBox')
    const response = await axios.get('http://localhost:3000/researchers/all');
    let researcher = response.data.payload
    for (let i = 0; i < researcher.length; i++) {
        let option = document.createElement("option")
        option.innerText = researcher[i].researchername
        dropdown.appendChild(option)
    }
    getInfo()
}


const getInfo = () => {
    let dropdown = document.querySelector("#selectBox")
    dropdown.addEventListener('change', async (event) => {
        let selectedIndex = dropdown.options.selectedIndex
        console.log(selectedIndex)
        const response = await axios.get(`http://localhost:3000/sightings/researchers/${selectedIndex}`);
        console.log(response.data.payload)
        for (let i = 0; response.data.payload.length; i++) {
            // let name = response.data.payload[i].researchername
           console.log(response.data.payload[i].job_title)
        }
        displayInfo(name, job_title)
    })
}

const displayInfo = (name, job_title) => {
    console.log(title, releaseYear, description)
    let researcherName = document.createElement('p')
    researcherName.innerText = name
    let jobtitle = document.createElement('p')
    jobtitle.innerText = job_title
    body.appendChild(researcherName)
    body.appendChild(job_title)
}

