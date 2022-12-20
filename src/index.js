let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
///////////////////////////////////////////////
// FETCH REQUESTS /////////////////////////////
///////////////////////////////////////////////
function fetching(){
fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toys => toys.forEach(renderToy))
}
fetching()

///////////////////////////////////////////////
// RENDER TOY FUNCTION ////////////////////////
///////////////////////////////////////////////

function renderToy(info) {
  
  const div = document.createElement("div");
  div.className = "card"
  document.body.querySelector('#toy-collection').appendChild(div)
  
  const h2 = document.createElement("h2");
  h2.textContent = info.name;

  const img = document.createElement('img');
  img.className = "toy-avatar";
  img.src = info.image;

  let p = document.createElement('p');
  let numLikes = info.likes
  p.textContent = `${numLikes} likes` ;

  let btn = document.createElement('button');
  btn.id = info.id;
  btn.className = "like-btn";
  btn.textContent = 'Like ❤️'; 

  div.append(h2, img, p, btn)
  const id = info.id
 
  btn.addEventListener('click', (e) => {
    console.log('click')
    let newNumberOfLikes = ++numLikes;
    
    
    
    fetch(`http://localhost:3000/toys/${id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "likes": newNumberOfLikes
        })
      })
      .then(res => {
        if(res.ok){
          return res.json()
        }
      })
      .then(infolikes => {
        e.target.previousElementSibling.textContent = `${newNumberOfLikes} likes`
        console.log(e.target.previousElementSibling)
      })
      
    
  }
  )
}


///////////////////////////////////////////////
// ADD NEW TOY FUNCTION ///////////////////////
///////////////////////////////////////////////

const createToyBtn = document.querySelector('.add-toy-form');
createToyBtn.addEventListener('submit', (e) => {
  e.preventDefault
  const toy = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0,
  }

  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toy)
  })
  .then(res => {
    if(res.ok){
      return res.json()
    } else {
      console.log(errorStatus)
    }
  })
  .then(toy => {
    renderToy(toy)
    e.target.reset();
  })
})


///////////////////////////////////////////////
// INCREASE TOY LIKE COUNT ////////////////////
///////////////////////////////////////////////

// const btnLikes = document.querySelectorAll('.like-button');
// for (let key in btnlikes){
// btn.addEventListener('click', (e) => {
//   console.log('click')
//   let newNumberOfLikes = ++p;
//   info.likes = newNumberOfLikes;
  
  
//   fetch(`http://localhost:3000/toys/${id}`, {
//       method: 'PATCH',
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json"
//       },
//       body: JSON.stringify({
//         "likes": newNumberOfLikes
//       })
//     })
//     .then(res => {
//       if(res.ok){
//         return res.json()
//       }
//     })
// })
// }