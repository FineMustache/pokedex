

const cardContainer = document.getElementById("pokelist");

const cardLimit = 300;

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

const getTTColor = (type) => {
    switch (type) {
        case 'normal':
            return('#979693')
        
        case 'fighting':
            return('#d87b47')

        case 'flying':
            return('#5884ef')
        
        case 'poison':
            return('#83539b')

        case 'ground':
            return('#9b5e3f')

        case 'rock':
            return('#a38e7a')

        case 'bug':
            return('#9fb658')

        case 'ghost':
            return('#a3739b')

        case 'steel':
            return('#7e889b')

        case 'fire':
            return('#dc4047')

        case 'water':
            return('#54b9e3')

        case 'grass':
            return('#43a04c')

        case 'electric':
            return("#dcb602")
        
        case 'psychic':
            return("#e86e9b")

        case 'ice':
            return("#6db6bb")

        case 'dragon':
            return("#0786a3")

        case 'dark':
            return("#545361")

        case 'fairy':
            return("#ef9cb7")

        default:
            return("red")
    }
};
   
const createCard = (index, pokemon) => {
    
    let card = document.querySelector('.pokelist-i').cloneNode(true);
    fetch(pokemon.url)
    .then(result => result.json())
    .then(info => {
        card.querySelector('.face').querySelector('#pokeimg').src = info.sprites.versions['generation-v']['black-white'].animated.front_default                
        
        card.querySelector('.face').style.backgroundColor = getBgColor(info.types[0].type.name);
        card.querySelector('.face').style.border = `2px solid ${getBgColor(info.types[0].type.name)}`
        card.querySelector('.face').style.boxShadow = `0 0 10px ${getBgColor(info.types[0].type.name)}`
        card.querySelector('.back').style.backgroundColor = getBgColor(info.types[0].type.name);
        card.querySelector('.back').style.border = `2px solid ${getBgColor(info.types[0].type.name)}`
        card.querySelector('.back').style.boxShadow = `0 0 10px ${getBgColor(info.types[0].type.name)}`
        info.abilities.forEach(a =>{
            let span = document.createElement('span')
            span.innerHTML = a.ability.name
            card.querySelector('.abilities').appendChild(span)
        })
        info.types.forEach((t, ind) =>{
            let img = document.createElement('img')
            img.src = "./poketypes/" + t.type.name + '.png'
            img.classList.add('back-type')
            let typename = document.createElement("div")
            typename.innerHTML = "<span>" + t.type.name + "</span>"
            if (ind == 0) {
                typename.classList.add('tooltip-l')
            } else {
                typename.classList.add('tooltip-r')
            }
            
            typename.style.backgroundColor = getTTColor(t.type.name)
            let div = document.createElement('div')
            div.classList.add('types-i')
            div.append(img, typename)
            div.style.zIndex = info.types.length - ind
            card.querySelector('.types').appendChild(div)
        })
        card.querySelector('.typeImg').src = `./poketypes/${info.types[0].type.name}.png`
        card.querySelector('.btn-card').style.color = `${getBgColor(info.types[0].type.name)}`
        card.querySelector('#height').innerHTML = `${info.height * 10} cm`
        card.querySelector('#weight').innerHTML = `${info.weight / 10} kg`
    })
    card.classList.remove('modelo')
    card.id = index;
    
    card.querySelector('.face').querySelector("#pokename").innerHTML = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
    card.querySelector('.back').querySelector("#pokename").innerHTML = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
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
            lista.results.forEach((pokemon, indice) => {
                createCard(indice, pokemon)
            })
        })
    } else if (currentPage == 20) {
        removeInfiniteScroll()
    } else {
        fetch(lista.next)
        .then(response => response.json())
        .then(data => {
            lista = data
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
    if (e.querySelector('.face').classList.contains('faceflipped')) {
        e.querySelector('.face').classList.remove('faceflipped')
        e.querySelector('.back').classList.remove('backflipped')
        e.querySelector('.face').classList.remove('faceflip')
        e.querySelector('.back').classList.remove('backflip')
        e.querySelector('.face').classList.add('faceunflip')
        e.querySelector('.back').classList.add('backunflip')
        window.setTimeout(() => {
            e.querySelector('.face').classList.remove('faceunflip')
            e.querySelector('.back').classList.remove('backunflip')
        }, 400)
    }else{
        e.querySelector('.face').classList.toggle('faceflip')
        e.querySelector('.back').classList.toggle('backflip')
        window.setTimeout(() => {
            e.querySelector('.face').classList.add('faceflipped')
            e.querySelector('.back').classList.add('backflipped')
            e.querySelector('.face').classList.remove('faceflip')
            e.querySelector('.back').classList.remove('backflip')
        }, 400)
    }
    
  }

  function inputFocus() {
    document.querySelector(".search-border-focus").style.width = '300px'
  }

  function inputFocusOut() {
    document.querySelector(".search-border-focus").style.width = '0'
  }

  function inputChange(e) {
    let letras = e.value.length
    if(letras == 0) document.querySelector(".search-border-focus").style.width = `0`;
    else document.querySelector(".search-border-focus").style.width = `calc(10px + ${letras*16}pt)`

    if (letras >= 15) {
        document.querySelector(".search-border-focus").style.backgroundColor = `red`;
    } else {
        document.querySelector(".search-border-focus").style.backgroundColor = `black`;
    }
    
    if (letras !== 0) {
        
    }

  }