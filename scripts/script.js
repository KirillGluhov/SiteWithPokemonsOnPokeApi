const NUMBER_OF_POKEMONS = 1017;

let listOfPokemons = [];

async function makeSlider()
{
  const infoAboutThePokemon = document.createElement("div");
  infoAboutThePokemon.className = 'info';
  infoAboutThePokemon.id = '#w';
  const crossElement = document.createElement("img");
  crossElement.className = "cross";
  crossElement.src = "images/Иконка_крестика_(ei).svg.png";
  crossElement.style.width = '5em';
  crossElement.style.height = '5em';
  const divPokemon = document.createElement("div");
  divPokemon.id = "#h";

  crossElement.addEventListener("click", function() {

    if (infoAboutThePokemon.style.right === '0%')
    {
      infoAboutThePokemon.style.right = '-30%';
    }
  });

  infoAboutThePokemon.appendChild(crossElement);
  infoAboutThePokemon.appendChild(divPokemon);
  document.body.appendChild(infoAboutThePokemon);

}

async function sendGetResponse(site)
{
  const response = await fetch(site);
  const data = await response.json();
  return data;
}

async function getInfoAboutPokemon()
{
  const data = await sendGetResponse(`https://pokeapi.co/api/v2/pokemon/?limit=${NUMBER_OF_POKEMONS}`);

  for (let i = 0; i < NUMBER_OF_POKEMONS; i++)
  {
    listOfPokemons[i] = {
      name: data['results'][i]['name'],
      url: data['results'][i]['url'],
      number: i+1,
      image: await getImageOfPokemon(`https://pokeapi.co/api/v2/pokemon/${i+1}/`),
      types: await getTypeOfThisPokemon(`https://pokeapi.co/api/v2/pokemon/${i+1}/`)
    }
  }

  return listOfPokemons;
}

async function getImageOfPokemon(siteOfPokemon)
{
  const data = await sendGetResponse(siteOfPokemon);
  return data['sprites']['front_default'];
}

async function getTypeOfThisPokemon(siteOfPokemon)
{
  const data = await sendGetResponse(siteOfPokemon);
  let typesOfPokemon = [];

  for (let i = 0; i < data['types'].length; i++)
  {
    typesOfPokemon.push(data['types'][i]['type']['name']);
  }

  return typesOfPokemon;
}

async function createCards()
{
  const pokemons = await getInfoAboutPokemon();
  const container = document.getElementById("b0");

  for (let i = 0; i < pokemons.length; i++)
  {
    const card = document.createElement("div");
    card.className = "card";
    const numberOfPokemon = document.createElement("div");
    numberOfPokemon.className = "circle";
    const nameOfCard = document.createElement("div");
    nameOfCard.className = "content";
    const imageOfCard = document.createElement("div");
    imageOfCard.className = "image";
    const typesOfCard = document.createElement("div");
    typesOfCard.className = "content";

    for (let j = 0; j < pokemons[i]['types'].length; j++)
    {
      const cardWithType = document.createElement("div");

      cardWithType.className = `type` + " " + `${pokemons[i]['types'][j]}`;
      cardWithType.textContent = `${pokemons[i]['types'][j][0].toUpperCase() + pokemons[i]['types'][j].slice(1)}`;

      typesOfCard.appendChild(cardWithType);
    }

    const imageOfPokemon = document.createElement("img");

    nameOfCard.textContent = `${pokemons[i]['name'][0].toUpperCase() + pokemons[i]['name'].slice(1).replace(/-/g, " ")}`;
    imageOfPokemon.src = pokemons[i]['image'];
    numberOfPokemon.textContent = `${pokemons[i]['number']}`;

    imageOfCard.appendChild(imageOfPokemon);

    card.appendChild(numberOfPokemon);
    card.appendChild(nameOfCard);
    card.appendChild(imageOfCard);
    card.appendChild(typesOfCard);

    card.addEventListener("click", function() {
      const infoAboutThePokemon = document.getElementById('#w');
      const divPokemon = document.getElementById('#h');

      if (infoAboutThePokemon.style.right !== '0%')
      {
        infoAboutThePokemon.style.right = '0%'
        
        divPokemon.textContent = `${pokemons[i]['name'][0].toUpperCase() + pokemons[i]['name'].slice(1).replace(/-/g, " ")}`;
      }
    });

    container.appendChild(card);
  }
}

makeSlider();
createCards();