var camera, renderer, scene, controls, clock;

var ocean, fire, couple;
var line;
var randFloat = THREE.Math.randFloat;
var leftScreen = -20;
var rightScreen = 20;
var bottomScreen = -50;
var topScreen = 50;
var time;


var time = {
  type: "f",
  value: 0.0
};


//tepee, ocean outside, waving, fire


window.addEventListener('resize', onWindowResize);


// music.play();

var audio = loadAudio('audio/lights.mp3');
audio.play();
init();
animate();


function init() {
  clock = new THREE.Clock();
  var w = window.innerWidth;
  var h = window.innerHeight;

  camera = new THREE.PerspectiveCamera(90, w / h, 0.000001, 2000);
  camera.position.z = 10;


  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(w, h);
  renderer.setClearColor(0x1b032c)
  document.body.appendChild(renderer.domElement);
  ocean = new Ocean();
  fire = new Fire();
  fire.flameTransform();

  couple = new Couple();

}


function animate() {
  time = clock.getElapsedTime();
  TWEEN.update();
  ocean.update();
  fire.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function map(value, min1, max1, min2, max2) {
  return min2 + (max2 - min2) * ((value - min1) / (max1 - min1));
};

function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}


function loadAudio(uri) {
  var audio = new Audio();
  audio.src = uri;
  return audio;
}