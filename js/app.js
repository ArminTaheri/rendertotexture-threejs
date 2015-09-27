function Application () {
    var scene;
    var camera;
    var renderer;
    
    var wavemap;
    
    var waveMat;
    var wavePlane;
	
	var light;
    var init = function () {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        
        scene.add(camera);
        
        renderer = new THREE.WebGLRenderer();
        
        THREEx.WindowResize(renderer, camera);
        document.body.appendChild(renderer.domElement)
        
        wavemap = WaveMap();
        
        /* waveMat = new THREE.ShaderMaterial({
        uniforms: THREE.UniformsUtils.merge([
            THREE.UniformsLib['lights'],
            {
                color: {type: 'f', value: 1.0},
                heightMul: {type: 'f', value: 1.0},
                heightmap: {type: 't', value: wavemap.getNextWaveMap()}
            }
        ]),
        vertexShader: document.getElementById('waveVert').text,
        fragmentShader: document.getElementById('waveFrag').text,
        transparent: true,
        lights: true
        }); */
        
        wavePlane = new THREE.Mesh(new THREE.PlaneGeometry(6,6,64,64), wavemap.getWaveMaterial());
        scene.add(wavePlane);
        
        light = new THREE.PointLight(0xffffff, 1, 100);
        light.position.set(0,2,-1);
        scene.add(light);
        
        camera.position.z = 6;
        //camera.position.y = 5;
        //camera.rotation.x = -0.7;
    };
	
	var render = function () {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
	}
    
    init();
    
	return {
        run: function () {
            render()
        }
    }
}