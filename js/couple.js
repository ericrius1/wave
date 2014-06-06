var Couple = function(){
  var p1, p2;
  var guyHeadX = 2;
  createGirl();
  createGuy();

	function createGuy(){
    var trunkLength = 3 ;
    var legLength = 1.1;


    var color = new THREE.Color(0x67430a)
    var bodyMat = new THREE.LineBasicMaterial({color: color, linewidth:10})
    var headRadius = 1;
    var headGeo = new THREE.CircleGeometry(headRadius, 20);
    var head = new THREE.Mesh(headGeo, bodyMat);
    head.scale.x = 0.9
    head.position.y -=5;
    head.position.x = guyHeadX;
		scene.add(head);

		var bodyGeo = new THREE.Geometry();
    //TRUNK
    p1 = new THREE.Vector3(head.position.x, head.position.y - headRadius, 0);
    p2 = new THREE.Vector3(head.position.x, p1.y -trunkLength,  0);
    bodyGeo.vertices.push(p1)
		bodyGeo.vertices.push(p2)

    //LEFT LEG
    var l1 = new THREE.Vector3(p2.x, p2.y, 0);
    var l2 = new THREE.Vector3(p1.x - legLength, p2.y +legLength/2, 0);
    bodyGeo.vertices.push(l1)
    bodyGeo.vertices.push(l2)

    //RIGHT LEG
    l1 = new THREE.Vector3(p2.x, p2.y, 0);
    l2 = new THREE.Vector3(p1.x + legLength, p2.y +legLength/2, 0);
    bodyGeo.vertices.push(l1)
    bodyGeo.vertices.push(l2)

    //LEFT ARM
    var a1 = new THREE.Vector3(p2.x, p1.y - trunkLength/2, 0 )
    var a2 = new THREE.Vector3(p2.x - 1.1,  a1.y-0.1, 0);
    bodyGeo.vertices.push(a1)
    bodyGeo.vertices.push(a2)

    //RIGHT ARM
    a1 = new THREE.Vector3(p2.x, p1.y - trunkLength/2, 0);
    a2 = new THREE.Vector3(p2.x + 1, a1.y-0.11, 0);
    bodyGeo.vertices.push(a1)
    bodyGeo.vertices.push(a2)


    var body = new THREE.Line(bodyGeo, bodyMat, THREE.LinePieces);
    scene.add(body)
	}

	function createGirl(){
    var color = new THREE.Color(0x4a1b10);
    var bodyMat  = new THREE.LineBasicMaterial({color: color, linewidth: 10});
    var headRadius = 0.9
    var trunkLength = 2.8;
    var legLength = 1;
    var segments = 20;
    var headGeo = new THREE.CircleGeometry(headRadius, segments);
    var head = new THREE.Mesh(headGeo, bodyMat);
    head.position.y -=5.2;
    head.position.x = guyHeadX + 1.8;
    scene.add(head);
    head.renderDepth = -1;

    //HAIR
    var hairMat, hairGeo, p, hairStrand, root, segment, direction, randFact, hairLength;
    var thetaLength = Math.PI;
    segments = 100;
    for(var i = 0; i <= segments - 5; i++){  
      hairGeo = new THREE.Geometry();
      dir = Math.random() > 0.95 ? 1 : -1
      randFact = randFloat(-.1, .1)
      if(i > 30 && i < 70){
        hairLength = randFloat(2.4, 2.6);
      }
      else{
        hairLength = randFloat(2.0, 2.2);
      }
      for(var y = 0; y > -hairLength; y-=.1){
        p = new THREE.Vector3(- Math.sin(y * (1.2 + randFact)) * .3, y, 0);
        hairGeo.vertices.push(p);
      }
      segment = i/segments * thetaLength;
      root = new THREE.Vector3();
      root.x = headRadius * Math.cos(segment) + head.position.x;
      root.y = headRadius * Math.sin(segment) + head.position.y;
      var colFact = randFloat(0, 0.11);
      color = new THREE.Color().setRGB(colFact, colFact, colFact);
      hairMat = new THREE.LineBasicMaterial({color: color, linewidth: randFloat(3, 5)})
      hairStrand = new THREE.Line(hairGeo, hairMat);
      hairStrand.position.x = root.x;
      hairStrand.position.y = root.y;
      scene.add(hairStrand);
    }

    var bodyGeo = new THREE.Geometry();
    //TRUNK
    p1 = new THREE.Vector3(head.position.x, head.position.y - headRadius, 0);
    p2 = new THREE.Vector3(head.position.x+.2, p1.y -trunkLength,  0);
    bodyGeo.vertices.push(p1)
    bodyGeo.vertices.push(p2)

    //LEFT LEG
    var l1 = new THREE.Vector3(p2.x, p2.y, 0);
    var l2 = new THREE.Vector3(p1.x - legLength, p2.y +legLength/2, 0);
    bodyGeo.vertices.push(l1)
    bodyGeo.vertices.push(l2)

    //RIGHT LEG
    l1 = new THREE.Vector3(p2.x, p2.y, 0);
    l2 = new THREE.Vector3(p1.x + legLength, p2.y +legLength/2, 0);
    bodyGeo.vertices.push(l1)
    bodyGeo.vertices.push(l2)

     //LEFT ARM
    var a1 = new THREE.Vector3(p2.x, p1.y - trunkLength/2, 0 )
    var a2 = new THREE.Vector3(p2.x - 1, a1.y-0.1, 0);
    bodyGeo.vertices.push(a1)
    bodyGeo.vertices.push(a2)

    //RIGHT ARM
    a1 = new THREE.Vector3(p2.x, p1.y - trunkLength/2, 0);
    a2 = new THREE.Vector3(p2.x + 1, a1.y-0.1, 0);
    bodyGeo.vertices.push(a1)
    bodyGeo.vertices.push(a2)


    var body = new THREE.Line(bodyGeo, bodyMat, THREE.LinePieces);
    scene.add(body);

	}
}