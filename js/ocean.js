
var Ocean = function(){
	var waves = [];
	var startZ = -5
	var waveWidth = (rightScreen - leftScreen);
	//CHANGE THIS FOR MORE WAVES
	for(var y = -1.5; y < 5.5; y+=0.1){
	  createWave(y, randFloat(0.3, 0.6) );		
	}

	function createWave(yOffset, randFact){
		var point, lineThickness;
		var waveGeo = new THREE.Geometry();
		//Change these nums to change wave detail!
		for(var x = leftScreen * 2; x < rightScreen * 2; x+=0.1){
			point = new THREE.Vector3(x, Math.sin(x * randFact) + yOffset, 0);
			waveGeo.vertices.push(point);
		}
		var color = new THREE.Color().setRGB(randFloat(0.05, 0.35), randFloat(0.2, 0.70), 159/255);
		lineThickness = _.sample([1, 2, 5, 8]);
		var waveMat = new THREE.LineBasicMaterial({color: color, linewidth: lineThickness});
		var wave = new THREE.Line(waveGeo, waveMat);
		wave.movementSpeedX = randFloat(.1, .2);
		wave.movementSpeedY = randFloat(.05, .1);
		wave.directionX = Math.random() > 0.1 ? 1 : -1;
		wave.directionY = Math.random() > 0.5 ? 1 : -1;
		wave.scaleXFact = randFloat(0.00005, 0.0005);
		waves.push(wave);
		scene.add(wave);

	}

  this.update = function(){

  	_.each(waves, function(wave){
  		wave.position.x= Math.sin(time * wave.movementSpeedX) * 2 * wave.directionX;
  		wave.position.y= Math.sin(time * wave.movementSpeedY)  * wave.directionY;
  		
  		wave.scale.x += Math.sin(time * wave.movementSpeedX) * wave.scaleXFact * wave.directionX;
  	})

	}
}