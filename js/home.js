var fadeInDelay = 0;

window.onload = setClicks;

function clearSelectedJar() {
  let potes = document.getElementsByClassName('jar-overlay');
  for(let i=0; i<potes.length; i++) {
    potes[i].classList.remove('jar-selected');
  }
}

function setClicks() {
  let potes = document.getElementsByClassName('jar-overlay');
  for(let i=0; i<potes.length; i++) {
    let mSlug = potes[i].getAttribute('data-slug');
    potes[i].onclick = function() {
      clearSelectedJar();
      this.classList.add('jar-selected');
      fadeNavigation();
      setTimeout(setNavigation(mSlug), fadeInDelay);
    };
  }
}

function setNavigation(slug) {
  return function() {
    let ingredientes = document.getElementById('jar-ingredientes');
    let receita = document.getElementById('jar-receita');
    let mapa = document.getElementById('jar-mapa');

    let ingredientesImg = ingredientes.getElementsByTagName('img')[0];
    let mapaImg = mapa.getElementsByTagName('img')[0];

    //let ingredientesUrl = ingredientes.getAttribute('href');
    //let receitaUrl = receita.getAttribute('href');
    //let mapaUrl = mapa.getAttribute('href');

    let ingredientesImgUrl = ingredientesImg.getAttribute('src');
    let mapaImgUrl = mapaImg.getAttribute('src');

    //ingredientesUrl = ingredientesUrl.replace(/\/[a-zA-Z0-9]+\/ingredientes/, '/'+slug+'/ingredientes');
    //receitaUrl = receitaUrl.replace(/\/[a-zA-Z0-9]+\//, '/'+slug+'/');
    //mapaUrl = mapaUrl.replace(/\/[a-zA-Z0-9]+\/mapa/, '/'+slug+'/mapa');
    ingredientesImgUrl = ingredientesImgUrl.replace(/\/[a-zA-Z0-9]+\/ingredientes/, '/'+slug+'/ingredientes');
    mapaImgUrl = mapaImgUrl.replace(/\/[a-zA-Z0-9]+\/mapa/, '/'+slug+'/mapa');

    //ingredientes.setAttribute('href', ingredientesUrl);
    //receita.setAttribute('href', receitaUrl);
    //mapa.setAttribute('href', mapaUrl);

    ingredientesImg.setAttribute('src', ingredientesImgUrl);
    mapaImg.setAttribute('src', mapaImgUrl);

    document.getElementById('jar-title').innerHTML = slug;
    showNavigation();
  };
}

function showNavigation() {
  let navigation = document.getElementsByClassName('home-jar-navigation')[0];

  navigation.style.opacity = '1';
  navigation.style['max-height'] = '500px';

  setTimeout(function() {
    navigation.style.transition = 'opacity 0.5s linear';
  }, 1000);

  fadeInDelay = 1000;
  setClicks();
}

function fadeNavigation() {
  let navigation = document.getElementsByClassName('home-jar-navigation')[0];
  navigation.style.opacity = '0';
}
