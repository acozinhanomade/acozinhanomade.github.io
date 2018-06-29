---
---

let ingredients2recipes = {};
let recipes2ingredients = {};
let recipeUrls = {};
let buttons;

window.addEventListener('load', function() {
  buttons = document.getElementsByClassName('recipe-search-button');
  setIngredientSearchClicks();
  disableButtons();
});

{% assign allRecipes = site.potes | concat: site.receitas %}

{% for recipe in allRecipes %}
  {% if recipe.layout == 'page' %}
    recipeUrls['{{ recipe.title }}'] = '{{ site.baseurl}}{{ recipe.url }}';
  {% else %}
    recipeUrls['{{ recipe.title }}'] = '{{ site.baseurl}}/#/{{ recipe.slug }}-receita';
  {% endif %}

  {% for i in recipe.ingredientes %}
    if(!('{{ i }}' in ingredients2recipes)) {
      ingredients2recipes['{{ i }}'] = [];
    }
    if(!('{{ recipe.title }}' in recipes2ingredients)) {
      recipes2ingredients['{{ recipe.title }}'] = [];
    }
    ingredients2recipes['{{ i }}'].push('{{ recipe.title }}');
    recipes2ingredients['{{ recipe.title }}'].push('{{ i }}');
  {% endfor %}
{% endfor %}

function setIngredientSearchClicks() {
  for(let i=0; i<buttons.length; i++) {
    buttons[i].onclick = function() {
      setTimeout(disableButtons, 10);
    }
  }
}

function getSearchParams() {
  let params = [];
  for(let i=0; i<buttons.length; i++) {
    let b = buttons[i];
    if(document.getElementById(b.getAttribute('for')).checked) {
      params.push(b.getAttribute('data-name'));
    }
  }
  return params;
}

function getRecipes() {
  let params = getSearchParams();

  let recipeResults = document.getElementsByClassName('recipe-search-results')[0];
  recipeResults.innerHTML = '';

  if (params.length === 0) return [];

  let recipeIntersection = ingredients2recipes[params[0]].slice();

  for(let i=1; i<params.length; i++) {
    recipeIntersection = recipeIntersection.filter(function(recipe) {
      return (-1 !== ingredients2recipes[params[i]].indexOf(recipe));
    });
  }

  for(let i=0; i<recipeIntersection.length; i++) {
    let link = document.createElement('a');
    link.classList.add('recipe-search-result-item');
    link.setAttribute('href', recipeUrls[recipeIntersection[i]]);
    link.innerHTML = recipeIntersection[i];
    link.onclick = function() {
      scrollToId('#jar-submenu-anchor');
      clearSearchSelections();
      setTimeout(parseUrl, 200);
    }
    recipeResults.appendChild(link);
  }

  return recipeIntersection;
}

function disableButtons() {
  let recipes = getRecipes();
  let ingredientUnion = {};

  for(let i=0; i<recipes.length; i++) {
    let ingredients = recipes2ingredients[recipes[i]];
    for(let j=0; j<ingredients.length; j++){
      ingredientUnion[ingredients[j]] = ''; 
    }
  }

  for(let i=0; i<buttons.length; i++) {
    let b = buttons[i];
    let buttonIngredient = b.getAttribute('data-name');

    if((buttonIngredient in ingredients2recipes)) {
      b.classList.remove('recipe-search-button-disabled');
    } else {
      b.classList.add('recipe-search-button-disabled');
    }

    if(!(buttonIngredient in ingredientUnion) && (recipes.length !== 0)) {
      b.classList.add('recipe-search-button-disabled');
    }
  }
}

function clearSearchSelections() {
  for(let i=0; i<buttons.length; i++) {
    let b = buttons[i];
    document.getElementById(b.getAttribute('for')).checked = false;
  }
  disableButtons();
}
