const NUMBER_OF_POKEMONS = 1017;

let listOfPokemons = [];
let listOfAllInfoAboutPokemons = [];
let listAdditionalAboutPokemon = []

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
  divPokemon.className = "slider";

  crossElement.addEventListener("click", function() {

    if (infoAboutThePokemon.style.right === '0%')
    {
      infoAboutThePokemon.style.right = '-30%';
      divPokemon.innerHTML = "";
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
    listOfAllInfoAboutPokemons[i] = await sendGetResponse(`https://pokeapi.co/api/v2/pokemon/${i+1}/`);
    listAdditionalAboutPokemon[i] = await sendGetResponse(`https://pokeapi.co/api/v2/pokemon-species/${i+1}/`);

    listOfPokemons[i] = {
      name: data['results'][i]['name'],
      url: data['results'][i]['url'],
      number: i+1,
      image: listOfAllInfoAboutPokemons[i]['sprites']['front_default'],
      types: getTypeOfThisPokemon(listOfAllInfoAboutPokemons[i]),
      color: listAdditionalAboutPokemon[i]['color']['name'],
      generation: listAdditionalAboutPokemon[i]['generation']['name']
    }
  }

  

  return listOfPokemons;
}

function getTypeOfThisPokemon(pokemon)
{
  let typesOfPokemon = [];

  for (let i = 0; i < pokemon['types'].length; i++)
  {
    typesOfPokemon.push(pokemon['types'][i]['type']['name']);
  }

  return typesOfPokemon;
}

async function createInfoInSlider(pokemon, mainElement, pokemonAdditional)
{
  const listOfValues = document.createElement("div");
  const imagesValues = document.createElement("img");
  const nameAndGeneration = document.createElement("div");
  const characters = document.createElement("div");

  const nameOfPokemon = document.createElement("div");
  const generationOfPokemon = document.createElement("div");

  const experience = document.createElement("div");
  const heightOfPokemon = document.createElement("div");
  const weightOfPokemon = document.createElement("div");

  experience.className = 'name red';
  heightOfPokemon.className = 'name green';
  weightOfPokemon.className = 'name blue';

  experience.textContent = `base exp: ${pokemon['base_experience']}`;
  heightOfPokemon.textContent = `height: ${pokemon['height']}`;
  weightOfPokemon.textContent = `weight: ${pokemon['weight']}`;


  nameAndGeneration.className = "block";
  characters.className = "block";

  nameOfPokemon.textContent = `${pokemon['name'][0].toUpperCase() + pokemon['name'].slice(1)}`;
  nameOfPokemon.className = `name ${pokemonAdditional['color']}`;

  generationOfPokemon.textContent = `${pokemonAdditional['generation'].slice(11).toUpperCase()}`
  generationOfPokemon.className = `name generation`;

  let abilities = [];
  let moves = [];
  let stats = [];

  for (let i = 0; i < pokemon['abilities'].length; i++)
  {
    abilities.push(pokemon['abilities'][i]['ability']['name']);
  }

  for (let i = 0; i < pokemon['moves'].length; i++)
  {
    moves.push(pokemon['moves'][i]['move']['name']);
  }

  for (let i = 0; i < pokemon['stats'].length; i++)
  {
    let statAndBaseStat = [];
    statAndBaseStat.push(pokemon['stats'][i]['stat']['name']);
    statAndBaseStat.push(pokemon['stats'][i]['base_stat']);

    stats.push(statAndBaseStat);
  }

  listOfValues.textContent = `abilities: ${abilities.join(", ")}, moves: ${moves.join(", ")}, stats: ${stats.map(function(item) {return item.join(" ");}).join(", ")}`

  imagesValues.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon['id']}.png`;
  imagesValues.className = 'imageWithShape';


  nameAndGeneration.appendChild(nameOfPokemon);
  nameAndGeneration.appendChild(generationOfPokemon);

  characters.appendChild(experience);
  characters.appendChild(heightOfPokemon);
  characters.appendChild(weightOfPokemon);

  mainElement.appendChild(nameAndGeneration);
  mainElement.appendChild(imagesValues);
  mainElement.appendChild(characters);
  mainElement.appendChild(listOfValues);

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
        
        //divPokemon.textContent = `${pokemons[i]['name'][0].toUpperCase() + pokemons[i]['name'].slice(1).replace(/-/g, " ")}`;
        //divPokemon.appendChild(createInfoInSlider(pokemons[i]));
        createInfoInSlider(listOfAllInfoAboutPokemons[i], divPokemon, pokemons[i]);
      }
    });

    container.appendChild(card);
  }
}

makeSlider();
createCards();