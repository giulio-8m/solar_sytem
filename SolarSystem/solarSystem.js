window.onload = function(){

/* ===================<   neptune  >=====================*/
    var neptune = new THREE.Mesh(
        new THREE.SphereGeometry(3, 32, 32),
        new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('./solarimg/neptune.jpg')})
    );
    neptune.matrixAutoUpdate = false;
    
/* ===================<   saturn orbit  >=====================*/
    var saturn_ring = new THREE.Mesh(
        new THREE.RingGeometry( 7, 10, 32,32 ),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('./solarimg/saturn_ring.jpg'),side:THREE.DoubleSide})
    );
    saturn_ring.matrixAutoUpdate=false;

/* ===================<   saturn  >=====================*/
    var saturn = new THREE.Mesh(
        new THREE.SphereGeometry(5, 32, 32),
        new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('./solarimg/saturn.jpg')})
    );
    saturn.matrixAutoUpdate = false;

/* ===================<   ganymede  >=====================*/
    var ganymede = new THREE.Mesh(
        new THREE.SphereGeometry(2, 32, 32),
        new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('./solarimg/ganymede.jpg')})
    );
    ganymede.matrixAutoUpdate = false;

/* ===================<   jupiter  >=====================*/
    var jupiter = new THREE.Mesh(
        new THREE.SphereGeometry(6, 32, 32),
        new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('./solarimg/jupiter.jpg')})
    );
    jupiter.matrixAutoUpdate = false;
        
/* ===================<   mars  >=====================*/
    var mars = new THREE.Mesh(
        new THREE.SphereGeometry(3, 32, 32),
        new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('./solarimg/mars.jpg')})
    );
    mars.matrixAutoUpdate = false;
    
/* ===================<  moon  >=====================*/
    var moon = new THREE.Mesh(
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('./solarimg/moon.jpg')})
    );
    moon.matrixAutoUpdate = false;
    
/* ===================<   earth  >=====================*/
    var earth = new THREE.Mesh(
        new THREE.SphereGeometry(4, 32, 32),
        new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('./solarimg/earth.jpg')})
    );
    earth.matrixAutoUpdate = false;
    
/* ===================<   venus  >=====================*/
    var venus = new THREE.Mesh(
        new THREE.SphereGeometry(3, 32, 32),
        new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('./solarimg/venus.jpg')})
    );
    venus.matrixAutoUpdate = false;
    
/* ===================<   mercury  >=====================*/
    var mercury = new THREE.Mesh(
        new THREE.SphereGeometry(2, 32, 32),
        new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('./solarimg/mercury.jpg')})
    );
    mercury.matrixAutoUpdate = false;
    
/* ===================<   sun  >=====================*/
    var sun = new THREE.Mesh(
        new THREE.SphereGeometry(10, 32, 32),
        new  THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('./solarimg/sun.jpg')})
    );
    sun.matrixAutoUpdate = false;
    
/* ===================<  background  >=====================*/
    var background = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 20, 0),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load( './solarimg/galaxy_milk.jpg' )})
    );
    background.material.depthTest = false;
    background.material.depthWrite = false;
    
/* ===================<  creating scenes cameras and lights  >=====================*/
    var scene = new THREE.Scene();         
    var backgroundScene = new THREE.Scene();
    var backgroundCamera = new THREE.Camera();
    
    var camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 1, 500);
            camera.position.y = 2;
            camera.position.z = 25;
            camera.position.x =1; 

    var controls = new THREE.OrbitControls( camera );
        controls.minDistance = 10;
        controls.maxDistance = 150;

    var galaxy_light = new THREE.AmbientLight( 0xffffff,0.25);
    var pointLight = new THREE.PointLight( 0xffffff, 1.3 ); 
    pointLight.position.set(0, 0, 0).normalize(); 
    
    backgroundScene.add(backgroundCamera);
    backgroundScene.add(background);
    scene.add(camera);
    scene.add(galaxy_light);
    scene.add(pointLight);
    scene.add(sun);
    scene.add(saturn_ring) ;
    sun.add(mercury);
    sun.add(venus);
    sun.add(earth);
    earth.add(moon);
    sun.add(mars);
    sun.add(jupiter);
    jupiter.add(ganymede);
    sun.add(saturn);
    saturn.add(saturn_ring);
    sun.add(neptune);

/* ===================<  rendering  >=====================*/
    var renderer = new THREE.WebGLRenderer(); 
	renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);	
    
    var render_scene = function() {
        var now = Date.now();
        render_scene.time = now;
        renderer.autoClear = false;
        renderer.clear();
        renderer.render(backgroundScene, backgroundCamera);
        renderer.render(scene, camera);     
        requestAnimationFrame(render_scene);
        
        var sun_rot = new THREE.Matrix4().makeRotationY(0.0002*now);
        sun.matrix = sun_rot.multiply(sun_rot);

        var rot_mercurio = new THREE.Matrix4().makeRotationY(0.0008*render_scene.time); 
        var tras_mercurio = new THREE.Matrix4().makeTranslation(18, 0, 0);
        mercury.matrix = rot_mercurio.multiply(tras_mercurio.multiply(rot_mercurio));
   
        var rot_venere = new THREE.Matrix4().makeRotationY(0.0007*render_scene.time); 
        var tras_venere = new THREE.Matrix4().makeTranslation(26, 0, 0);
        venus.matrix = rot_venere.multiply(tras_venere.multiply(rot_venere));
          
        var rot_terra = new THREE.Matrix4().makeRotationY(0.0006*render_scene.time); 
        var rot_moon = new THREE.Matrix4().makeRotationY(-0.0003*render_scene.time); 
        var tras_terra = new THREE.Matrix4().makeTranslation(37, 0, 0);
        earth.matrix = rot_terra.multiply(tras_terra.multiply(rot_moon));        
        
        var moon_tras = new THREE.Matrix4().makeTranslation(6,0,0);
        var moon_rot = new THREE.Matrix4().makeRotationY(0.0008*render_scene.time);
        var moon_rot2 = new THREE.Matrix4().makeRotationY(0.001*render_scene.time);
        moon.matrix = moon_rot.multiply(moon_tras.multiply(moon_rot2));

        var rot_mars = new THREE.Matrix4().makeRotationY(0.00065*render_scene.time); 
        var tras_mars = new THREE.Matrix4().makeTranslation(50, 0, 0);
        mars.matrix = rot_mars.multiply(tras_mars.multiply(rot_mars));
        
        var rot_jupiter = new THREE.Matrix4().makeRotationY(0.0005*render_scene.time); 
        var rot_ganymede = new THREE.Matrix4().makeRotationY(-0.0003*render_scene.time); 
        var tras_jupiter = new THREE.Matrix4().makeTranslation(72, 0, 0);
        jupiter.matrix = rot_jupiter.multiply(tras_jupiter.multiply(rot_ganymede));        
        
        var ganymede_tras = new THREE.Matrix4().makeTranslation(9,0,0);
        var ganymede_rot = new THREE.Matrix4().makeRotationY(0.0007*render_scene.time);
        var ganymede_rot2 = new THREE.Matrix4().makeRotationY(0.001*render_scene.time);
        ganymede.matrix = ganymede_rot.multiply(ganymede_tras.multiply(ganymede_rot2));

        var rot_saturn = new THREE.Matrix4().makeRotationY(0.00055*render_scene.time); 
        var tras_saturn = new THREE.Matrix4().makeTranslation(90, 0, 0);
        saturn.matrix = rot_saturn.multiply(tras_saturn.multiply(rot_saturn));
        
        var rot_saturn_ring = new THREE.Matrix4().makeRotationY(0.00055 * render_scene.time); 
		var tras_saturn_ring = new THREE.Matrix4().makeTranslation(0, 0, 0);
		saturn_ring.matrix = rot_saturn_ring.multiply(tras_saturn_ring.multiply(rot_saturn_ring));
        saturn_ring.matrix.makeRotationX(1.8);
        
        var rot_neptune = new THREE.Matrix4().makeRotationY(0.00049*render_scene.time); 
        var tras_neptune = new THREE.Matrix4().makeTranslation(110, 0, 0);
        neptune.matrix = rot_neptune.multiply(tras_neptune.multiply(rot_neptune));
    }

/* ===================<  resizing function  >=====================*/
    window.addEventListener('resize',function(){
        var width=window.innerWidth;
        var heigth=window.innerHeight;
        renderer.setSize(width,heigth);
        camera.aspect=width/heigth;
        camera.updateProjectionMatrix ();
    });

/* ===================<  start the rendering  >=====================*/
    render_scene();

}