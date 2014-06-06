var Fire = function(){
	var p1, p2;
  var self = this;
  var flame, color, flameMat, flameGeo, thickness;
  var numFlames = 200;
  var xLeft = 4;
  var xRight = 14;
  var centerX = xRight - (xRight-xLeft)/2;
  var yTopMin = -10, yTopMax = -8;
  var yBottomMin = -12, yBottomMax = -11;
  var angleFact = 1
  var flames = [];
  //each flame has different angle and speed?
  for(var i = 0; i < numFlames; i++){
	  flameGeo = new THREE.Geometry();
		p1 = new THREE.Vector3(randFloat(xLeft, xRight), randFloat(yBottomMin, yBottomMax), 0);
		p2 = new THREE.Vector3(randFloat(centerX -2, centerX + 2), randFloat(yTopMin, yTopMax), p1.z);
		flameGeo.vertices.push(p1);
		flameGeo.vertices.push(p2);
    color = new THREE.Color().setRGB(randFloat(0.7, 1.0), randFloat(0.2, 0.6), randFloat(0.01, 0.1));
    thickness = randFloat(1, 5);
    flameMat = new THREE.LineBasicMaterial({color: color, linewidth: thickness});
    flame = new THREE.Line(flameGeo, flameMat);
    flame.speed = randFloat(.5, 1);
    flame.direction = Math.random() > 0.5 ? 1 : -1
    scene.add(flame)
    flames.push(flame)
	}

  this.flameTransform = function(){
    //pick a random flame to turn into a spark
    var flame = _.sample(flames);
    //tween a flame and rise it up to a small spark
    var curFlameInfo = {
      y:  flame.position.y,
      x: flame.position.x,
      rotY: flame.rotation.x,
      scale: 1
    }
    var finalFlameInfo = {
      y: randFloat(8, 10),
      x: randFloat(leftScreen, rightScreen),
      rotY: randFloat(-Math.PI, Math.PI),
      scale: randFloat(0.01, 0.02)
    }
    var sparkTween = new TWEEN.Tween(curFlameInfo).
      to(finalFlameInfo, 7000).
      easing(TWEEN.Easing.Quadratic.InOut).
      onUpdate(function(){
        flame.position.y = curFlameInfo.y;
        flame.position.x = curFlameInfo.x;
        flame.scale.set(curFlameInfo.scale, curFlameInfo.scale, 1)
        flame.rotation.y = curFlameInfo.rotY
      }).start();
    sparkTween.onComplete(function(){
      flames.splice(flames.indexOf(flame),1)
      self.twinkle(flame);
      if(flames.length > 0)
        self.flameTransform();
    })
  };

  this.twinkle = function(star){

    var curStarInfo = {
      scale: star.scale.x
    }

    var finalStarInfo = {
      scale: star.scale.x + randFloat(0.001, 0.01)
    }
    star.scaleX = Math.random() > 0.5 ? true: false;
    var twinkleTween = new TWEEN.Tween(curStarInfo).
      to(finalStarInfo, _.random(1000, 2000)).
      repeat(10000).
      yoyo(true).
      onUpdate(function(){
        if(star.scaleX){
          star.scale.x = curStarInfo.scale;
        }
        else{
          star.scale.y = curStarInfo.scale;
        }
      }).start();
  };

	this.update = function(){
    _.each(flames, function(flame){
      flame.position.y += flame.direction  * Math.sin(time * flame.speed) * .005
    });

	}
}