document.addEventListener('DOMContentLoaded', () => {
    loadSightings();


});



const loadSightings = async () => {
    const sightingsList = document.querySelector('#allSightings');
    sightingsList.innerHTML = "";
    const response = await axios.get('http://localhost:3000/sightings/all');
    let sight = response.data.payload
//   for (let i =0; i < sight; i++){
//      let sighting = document.createElement('div')
//      sighting.innertext = `${sight.name} ${sight.}`
//   }


    console.log(response.data.payload);
 
}









 // userresponse.data.payload.forEach((user) => {
        //         let userDiv = document.createElement('div');
        //         userDiv.id = user.firstname
        //         let userdata = userresponse.data
                
        //         let images = user.img_url
        //         let img = document.createElement('img')
        //         img.src= images
        //         img.alt = `${user.firstname} ${user.lastname}`;
        //         console.log(images)

        //         userDiv.innerText = `${user.firstname} ${user.lastname}`;
        //         userDiv.appendChild(img)
        //         userList.appendChild(userDiv)
        //         // userSelected(userdata)
        //     })  








// const userSelected = (event) => {
//     let x = event.target.innerText;
//     if(!(x)){
//       x = event.target.alt;
//     }
//    let array = x.split(" ")
//    let user = window.localStorage;
//    let firstname = array[0];
//    let lastname = array[1];
//    user.setItem('firstName', `${firstname}`);
//    user.setItem('lastName', `${lastname}`);
//    window.location.href = "./singleUser.html";
//     let userDiv = document.querySelector('#userDiv');


// }