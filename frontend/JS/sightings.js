document.addEventListener("DOMContentLoaded", () => {
    getResearchers()
})


const getResearchers = async () => {
    const container = document.querySelector('#container');

    let dropdown = document.querySelector('#selectBox')
    const response = await axios.get('http://localhost:3000/researchers/all');
    let researcher = response.data.payload
    for (let i = 0; i < researcher.length; i++) {
        let option = document.createElement("option")
        option.innerText = researcher[i].researchername
        dropdown.appendChild(option)
    }
    getResearcherInfo()
}


const getResearcherInfo = () => {
    let dropdown = document.querySelector("#selectBox")
    dropdown.addEventListener('change', async (event) => {
        let selectedIndex = dropdown.options.selectedIndex
        console.log(selectedIndex)
        const response = await axios.get(`http://localhost:3000/sightings/researchers/${selectedIndex}`);
        let name = response.data.payload[0].researchername
        let jobtitle = response.data.payload[0].job_title
        console.log(name, jobtitle)
        console.log(response.data.payload)
        // for (let i = 0; response.data.payload.length; i++) {
        //      let name = response.data.payload[i].researchername
        //      let jobtitle = response.data.payload[i].job_title
        //    console.log(response.data.payload[i].job_title)

         displayInfo(name, jobtitle)
    })
   
}

const displayInfo = (name, jobtitle) => {
    let container = document.querySelector('#container')
    console.log(name,jobtitle )
    let researcherName = document.createElement('p')
    researcherName.innerText = name
    let job_title = document.createElement('p')
    job_title.innerText = jobtitle
    container.appendChild(job_title)
}


