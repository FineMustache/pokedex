const cardContainer = document.getElementById("pokelist");

const cardLimit = 150;

const cardIncrease = 15;

const pageCount = Math.ceil(cardLimit / cardIncrease);

let currentPage = 1;

const firstLista = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=15'
var lista 

window.onload = function () {
    addCards(currentPage);
};

const getBgColor = (type) => {
    switch (type) {
        case 'normal':
            return('#ccc')
        
        case 'fighting':
            return('#fcc')

        case 'flying':
            return('#ccf')
        
        case 'poison':
            return('#bf7ad6')

        case 'ground':
            return('#ba8b65')

        case 'rock':
            return('#888')

        case 'bug':
            return('#d0fc6f')

        case 'ghost':
            return('#d8c9f5')

        case 'steel':
            return('#cfcfcf')

        case 'fire':
            return('#f77a5e')

        case 'water':
            return('#a4d7eb')

        case 'grass':
            return('#aaeba4')

        case 'electric':
            return("#faed75")
        
        case 'psychic':
            return("#fa9bec")

        case 'ice':
            return("#9ff5ec")

        case 'dragon':
            return("#ffedc9")

        case 'dark':
            return("#8f76c4")

        case 'fairy':
            return("#fcc5f9")

        default:
            return("red")
    }
};
   
const createCard = (index, pokemon) => {
    
    let card = document.querySelector('.pokelist-i').cloneNode(true);
    fetch(pokemon.url)
    .then(result => result.json())
    .then(info => {
        card.querySelector('.face').querySelector('img').src = info.sprites.front_default
        card.querySelector('.face').style.backgroundColor = getBgColor(info.types[0].type.name);
        card.querySelector('.face').style.border = `2px solid ${getBgColor(info.types[0].type.name)}`
        card.querySelector('.face').style.boxShadow = `0 0 10px ${getBgColor(info.types[0].type.name)}`
        card.querySelector('.back').style.backgroundColor = getBgColor(info.types[0].type.name);
        card.querySelector('.back').style.border = `2px solid ${getBgColor(info.types[0].type.name)}`
        card.querySelector('.back').style.boxShadow = `0 0 10px ${getBgColor(info.types[0].type.name)}`
    })
    card.classList.remove('modelo')
    card.id = index;
    
    card.querySelector("#pokename").innerHTML = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
    cardContainer.appendChild(card);
};

const addCards = (pageIndex) => {
    
    currentPage = pageIndex;
    const startRange = (pageIndex - 1) * cardIncrease;
    const endRange = pageIndex * cardIncrease;
    if (currentPage == 1) {
        fetch(firstLista)
        .then(response => response.json())
        .then(data => {
            lista = data
            console.log(lista)
            lista.results.forEach((pokemon, indice) => {
                createCard(indice, pokemon)
            })
        })
    } else if (currentPage == 10) {
        removeInfiniteScroll()
    } else {
        fetch(lista.next)
        .then(response => response.json())
        .then(data => {
            lista = data
            console.log(lista)
            lista.results.forEach((pokemon, indice) => {
                createCard(indice, pokemon)
            })
        })
    }
};

var throttleTimer;
 
const throttle = (callback, time) => {
  if (throttleTimer) return;
 
  throttleTimer = true;
 
  setTimeout(() => {
    callback();
    throttleTimer = false;
  }, time);
};

const handleInfiniteScroll = () => {
    throttle(() => {
      const endOfPage =
        window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
   
      if (endOfPage) {
        addCards(currentPage + 1);
      }
    }, 1000);
  };

  window.addEventListener("scroll", handleInfiniteScroll);

  const removeInfiniteScroll = () => {
    loader.remove();
    window.removeEventListener("scroll", handleInfiniteScroll);
  };


  function flip(e) {
    e.querySelector('.face').classList.toggle('faceflip')
    e.querySelector('.back').classList.toggle('backflip')
    // window.setTimeout(() => {
    //     e.querySelector('.face').classList.toggle('faceflipped')
    //     e.querySelector('.back').classList.toggle('backflipped')
    //     e.querySelector('.face').classList.toggle('faceflip')
    //     e.querySelector('.back').classList.toggle('backflip')
    // }, 400)
  }