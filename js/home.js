var fadeInDelay = 0;

window.onload = setClicks;

function clearSelectedJar() {
  var potes = document.getElementsByClassName('jar-overlay');
  for(var i=0; i<potes.length; i++) {
    potes[i].classList.remove('jar-selected');
  }
}

function setClicks() {
  var potes = document.getElementsByClassName('jar-overlay');
  for(var i=0; i<potes.length; i++) {
    potes[i].onclick = (function(slug) {
      return function() {
        clearSelectedJar();
        this.classList.add('jar-selected');
        fadeNavigation();
        setTimeout(function(){
          setNavigation(slug);
          showNavigation();
        }, fadeInDelay);
      };
    })(potes[i].getAttribute('data-slug'));
  }
}

function setNavigation(slug) {
  var ingredientes = document.getElementById('jar-ingredientes');
  var receita = document.getElementById('jar-receita');
  var mapa = document.getElementById('jar-mapa');

  var ingredientesImg = ingredientes.getElementsByTagName('img')[0];
  var mapaImg = mapa.getElementsByTagName('img')[0];

  var ingredientesUrl = ingredientes.getAttribute('href');
  var receitaUrl = receita.getAttribute('href');
  var mapaUrl = mapa.getAttribute('href');

  var ingredientesImgUrl = ingredientesImg.getAttribute('src');
  var mapaImgUrl = mapaImg.getAttribute('src');

  ingredientesUrl = ingredientesUrl.replace(/\/[a-zA-Z0-9]+\/ingredientes/, '/'+slug+'/ingredientes');
  receitaUrl = receitaUrl.replace(/\/[a-zA-Z0-9]+\//, '/'+slug+'/');
  mapaUrl = mapaUrl.replace(/\/[a-zA-Z0-9]+\/mapa/, '/'+slug+'/mapa');
  ingredientesImgUrl = ingredientesImgUrl.replace(/\/[a-zA-Z0-9]+\/ingredientes/, '/'+slug+'/ingredientes');
  mapaImgUrl = mapaImgUrl.replace(/\/[a-zA-Z0-9]+\/mapa/, '/'+slug+'/mapa');

  ingredientes.setAttribute('href', ingredientesUrl);
  receita.setAttribute('href', receitaUrl);
  mapa.setAttribute('href', mapaUrl);

  ingredientesImg.setAttribute('src', ingredientesImgUrl);
  mapaImg.setAttribute('src', mapaImgUrl);

  document.getElementById('jar-title').innerHTML = slug;
}

function showNavigation() {
  var navigation = document.getElementsByClassName('home-jar-navigation')[0];
  var as = navigation.getElementsByTagName('a');

  for(var i=0; i<as.length; i++) {
    as[i].style['cursor'] = 'pointer';
    as[i].style['pointer-events'] = 'auto';
  }

  navigation.style.opacity = '1';
  navigation.style['max-height'] = '500px';
  setTimeout(function(){
    navigation.style.transition = 'opacity 0.5s linear';
  }, 1000);

  fadeInDelay = 1000;
  setClicks();
}

function fadeNavigation() {
  var navigation = document.getElementsByClassName('home-jar-navigation')[0];
  navigation.style.opacity = '0';
}
