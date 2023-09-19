async function getTitle(site) 
{
  try 
  {
    const response = await fetch(site);
    const data = await response.json();
    return data;
  } 
  catch (error) 
  {
    console.error(error);
    throw error;
  }
}
  

async function displayData() 
{
  try 
  {
    const container = document.getElementById("b0");
    const json = await getTitle(`https://pokeapi.co/api/v2/`);
      
    for (let key in json) 
    {
      createCard(key, json, container);
    }
  } 
  catch (error) 
  {
    console.error(error);
    throw error;
  }
}

async function createCard(key, json, container)
{
  const jsonNew = await getTitle(`${json[key]}`);

  const divElement = document.createElement("div");
  divElement.className = "card";
  const contentInElement = document.createElement("div");
  contentInElement.className = "content";
  const numberOfPages = document.createElement("p");
  numberOfPages.textContent = `pages: ${jsonNew[`count`]}`;
  numberOfPages.className = "count";
  const hyperLink = document.createElement("a");
  hyperLink.textContent = `${key[0].toUpperCase() + key.substring(1)}`;
  hyperLink.href = `${json[key]}`;
  contentInElement.appendChild(hyperLink);
  contentInElement.appendChild(numberOfPages);
  divElement.appendChild(contentInElement);
  container.appendChild(divElement);

}
  
displayData();



