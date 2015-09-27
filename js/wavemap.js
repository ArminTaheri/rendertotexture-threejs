function WaveMap() {
    
    var scene;
    var camera;
    var rtTexture;
    var renderer;
    
    
	var screenQuad;
	var screenMat;
	var outt
	
    
    var init = function () {
		scene = new THREE.Scene();
        camera = new THREE.OrthographicCamera( 1 / - 2, 1 / 2, 1 / 2, 1 / - 2, 1, 1000 );
        rtTexture = new THREE.WebGLRenderTarget(512,512, {format: THREE.RGBFormat});
        renderer = new THREE.WebGLRenderer();
        scene.add(camera);
        
        screenMat = new THREE.ShaderMaterial({
		    vertexShader: document.getElementById( 'hfVert' ).textContent,
        	fragmentShader: document.getElementById( 'hfFrag' ).textContent
		});
		screenQuad = new THREE.Mesh( new THREE.PlaneGeometry( 1, 1, 1, 1 ), screenMat );
		scene.add(screenQuad);
		
		camera.position.z = 5;
		
        renderer.render(scene, camera, rtTexture, true);
        outt = new THREE.MeshBasicMaterial({map: rtTexture});
    }
    
    var updateMap = function (texture) {
    }
    
    init();

    return {
        getNextWaveMap: function () {
            return outt;
        }
    }
}