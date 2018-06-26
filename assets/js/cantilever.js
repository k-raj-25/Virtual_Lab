// Declare All Variables

	// 1 - variables of experiment
		var _cantileverShape;

		var _cantileverLength ,_cantileverLengthUnit  ,_cantileverLengthMultipicationFactor;
		var  _cantileverBreath , _cantileverBreathUnit , _cantileverBreathMultipicationFactor ;
		var  _cantileverDepth , _cantileverDepthUnit , _cantileverDepthMultipicationFactor;
		var _cantileverRadius, _cantileverRadiusUnit , _cantileverRadiusMultipicationFactor ;

		var _cantileverLoadApplied , _cantileverLoadAppliedUnit , _cantileverLoadAppliedMultipicationFactor ;

		var _cantileverMaterial , _cantileverElasticity ; 

		var _cantileverInertia;

	// 2 - variables of output
		var _cantileverDeflection , _cantileverDeflectionUnit , _cantileverDeflectionMultipicationFactor ;
		var _cantileverSlope , _cantileverSlopeUnit ;
		var _cantileverBendingMoment;

	// 3 - variables of animation
		var _animationScene , _animationCamera , _animationRenderer ;
		
		var _animationControls;

		var _animationWidthPercent ; 
		var _animationHeightPercent ;

		var _animationAngle;

		var _animationLeftCantileverCuboidal, _animationRightCantileverCuboidal;
		var _animationLeftCantileverCylinderical, _animationRightCantileverCylinderical;

		var _animationLeftBigCubeCuboidal , _animationRightBigCubeCuboidal;
		var _animationLeftBigCubeCylinderical , _animationRightBigCubeCylinderical;

	// 4- variables of graph
		var _graphBendingMomentX , _graphBendingMomentY = new Array;

	// variables to Re-draw animation
		var attempt = "first";
		var change = 0;


// UI Functions
	function ReShapeTheCanvas() {
		//alert("ReShapeTheCanvas");
		_animationRenderer.setSize(window.innerWidth * .985, window.innerHeight * .97);
		_animationRenderer.render(_animationScene,_animationCamera);

	}


		// function to  draw the graph
	function drawGraph(){
		var x = 	document.getElementById("BendingMomentGraph").getContext("2d");
		console.log(x);
		x.width = 500;
		x.height = 500;
		new Chart(document.getElementById('BendingMomentGraph'),{
						type:'line',
						data: {
							labels : _graphBendingMomentX,
							datasets:[{
								data:_graphBendingMomentY,
								label:"Bending Moment ",
								borderColor : "#3e95cd",
								fill:false
							}]
						},
						options:{
							title:{
								display:true,
								text:'Bending Moment Graph'
							}
						}
					});
	}


// Function to restore all variables to default
	function restoreAllVariables() {
		document.getElementById("AllOutputs").hidden = false;
		 _graphBendingMomentX = [] , _graphBendingMomentY = [];	

		 if(attempt != "first"){
		 	change = 1;		 	
		 }

		 initializeVariables();	
	}



// function to initialize variables and change in si units

	function initializeVariables() {
		_cantileverShape = document.getElementById("shapeOfCantilever").value;


		_cantileverLength = document.getElementById("lengthOfCantilever").value;
		_cantileverLength = Number(_cantileverLength);
		 document.getElementById("BenPosition").value = _cantileverLength;
		 document.getElementById("lenPosition").value = _cantileverLength;
		

		_cantileverLengthUnit = document.getElementById("cantileverLengthUnit").value;
		 document.getElementById("BenPositionUnit").value = _cantileverLengthUnit;
		 document.getElementById("lenPositionUnit").value = _cantileverLengthUnit;

		switch(_cantileverLengthUnit){
			case "mm" : _cantileverLengthMultipicationFactor =  1.0 / 1000.0; break;
			case "cm" : _cantileverLengthMultipicationFactor =  1.0 / 100.0 ; break;
			case "m" : _cantileverLengthMultipicationFactor =  1; break;
		}
		_cantileverLength *= _cantileverLengthMultipicationFactor;


		switch(_cantileverShape){
			case "Cuboidal" : 	_cantileverBreath = document.getElementById("breathOfCantilever").value;
								_cantileverBreath = Number(_cantileverBreath);
								_cantileverBreathUnit = document.getElementById("cantileverBreathUnit").value;
								switch(_cantileverBreathUnit){
									case "mm" : _cantileverBreathMultipicationFactor =  1.0 / 1000.0; break;
									case "cm" : _cantileverBreathMultipicationFactor =  1.0 / 100.0 ; break;
									case "m" : _cantileverBreathMultipicationFactor =  1; break;
								}
								_cantileverBreath *= _cantileverBreathMultipicationFactor;

								_cantileverDepth = document.getElementById("depthOfCantilever").value;
								_cantileverDepth = Number(_cantileverDepth);
								_cantileverDepthUnit = document.getElementById("cantileverDepthUnit").value;
								switch(_cantileverDepthUnit){
									case "mm" : _cantileverDepthMultipicationFactor =  1.0 / 1000.0; break;
									case "cm" : _cantileverDepthMultipicationFactor =  1.0 / 100.0 ; break;
									case "m" : _cantileverDepthMultipicationFactor =  1; break;
								}
								_cantileverDepth *= _cantileverDepthMultipicationFactor;
								
								_cantileverInertia = (_cantileverBreath * Math.pow(_cantileverDepth,3)/12);

								break;

			case "Cylinderical" :   _cantileverRadius = document.getElementById("radiusOfCantilever").value;
									_cantileverRadius = Number(_cantileverRadius);
									_cantileverRadiusUnit = document.getElementById("cantileverRadiusUnit").value;
									switch(_cantileverRadiusUnit){
										case "mm" : _cantileverRadiusMultipicationFactor =  1.0 / 1000.0; break;
										case "cm" : _cantileverRadiusMultipicationFactor =  1.0 / 100.0 ; break;
										case "m" : _cantileverRadiusMultipicationFactor =  1; break;
									}
									_cantileverRadius *= _cantileverRadiusMultipicationFactor;

									_cantileverInertia = (_cantileverRadius * 2 * Math.pow(_cantileverRadius * 2,3)/12);

 
									break;
		}
		
		_cantileverLoadApplied = document.getElementById("loadApplied").value;
		_cantileverLoadApplied = Number(_cantileverLoadApplied);
		_cantileverLoadAppliedUnit = document.getElementById("loadAppliedUnit").value;
		switch(_cantileverLoadAppliedUnit){
			case "N"  : _cantileverLoadAppliedMultipicationFactor =  1.0 ; break;
			case "KN" : _cantileverLoadAppliedMultipicationFactor =  1000 ; break;
			case "MN" : _cantileverLoadAppliedMultipicationFactor =  1000000; break;
		}
		_cantileverLoadApplied *= _cantileverLoadAppliedMultipicationFactor;

		_cantileverMaterial = document.getElementById("elasticityOfBeam").value;
		switch(_cantileverMaterial){
			case "Steel" :  	_cantileverElasticity = 2000000; break;
			case "Aluminium" :  _cantileverElasticity = 2000000; break;
			case "Iron" :  		_cantileverElasticity = 3000000; break;
			case "Concrete" :   _cantileverElasticity = 4000000; break;
		}


		calculateOutput();
	}


	function calculateDeflection(){
		var len = document.getElementById("lenPosition").value;
		len = Number(len);

		var unit = document.getElementById("lenPositionUnit").value;
		var mfactor;
		switch(unit){
			case "mm" : mfactor = 1.0/1000.0;break;
			case "cm" : mfactor = 1.0/100.0;break;
			case "m" : mfactor = 1.0;break;
		}
		len *= mfactor;

		if(len > _cantileverLength){
			alert("Error \nValue Greater than Actual Length of Cantilver");
			return;
		}
		else{
			var def = _cantileverLoadApplied / (_cantileverElasticity * _cantileverInertia);
			def = def * ( (_cantileverLength * Math.pow(len,2) / 2) - (Math.pow(len,3)/6) );

			var OUnit = document.getElementById("lenPositionUnitOutput").value;
			switch(OUnit){
				case "mm" : mfactor = 1000.0;break;
				case "cm" : mfactor = 100.0;break;
				case "m" : mfactor = 1.0;break;
			}
			def *= mfactor;
			document.getElementById("cantileverDeflection").value = def;

		}
	}

	function calculateBenMoment(){ 
		var len = document.getElementById("BenPosition").value;
		len = Number(len);

		var unit = document.getElementById("BenPositionUnit").value;
		var mfactor;
		switch(unit){
			case "mm" : mfactor = 1.0/1000.0;break;
			case "cm" : mfactor = 1.0/100.0;break;
			case "m" : mfactor = 1.0;break;
		}
		len *= mfactor;

		if(len > _cantileverLength){
			alert("Error \nValue Greater than Actual Length of Cantilver");
			return;
		}
		else{
			var bmoment = len * _cantileverLoadApplied;
			var OUnit = document.getElementById("BenPositionUnitOutput").value;
			switch(OUnit){
				case "mm" : mfactor = 1000.0;break;
				case "cm" : mfactor = 100.0;break;
				case "m" : mfactor = 1.0;break;
			}
			bmoment *= mfactor;

			document.getElementById("bendingMoment").value = bmoment;

		}
	}



// function to calculate the output
	
	function calculateOutput(){
		//Bending Moment graph
			var NoOfPoints = 100;
			
			for(var i = _cantileverLength / NoOfPoints; i < _cantileverLength  ; i = i + _cantileverLength/NoOfPoints ){
				_graphBendingMomentX.push(i);
				_graphBendingMomentY.push(-_cantileverLoadApplied * ( _cantileverLength - i ));
			}


		_cantileverBendingMoment = _cantileverLoadApplied * _cantileverLength;

		_cantileverDeflection = ( _cantileverLoadApplied * Math.pow( _cantileverLength,3)) / (3 * _cantileverElasticity * _cantileverInertia);
			

		_cantileverSlope = ( _cantileverLoadApplied * Math.pow( _cantileverLength,2) ) / ( 2 * _cantileverElasticity * _cantileverInertia );		


		_animationAngle = (Math.atan( _cantileverDeflection / _cantileverLength) * 180 / Math.PI);

		document.getElementById("BenPositionUnitOutput").value = "mm";
		document.getElementById("bendingMoment").value = _cantileverBendingMoment * 1000 ;


		document.getElementById("lenPositionUnitOutput").value = "mm";
		document.getElementById("cantileverDeflection").value = _cantileverDeflection * 1000 ;

		
		document.getElementById("cantileverSlope").value = _cantileverSlope + "  Radians";

		drawGraph();

		if(attempt == "first"){
			attempt = "Second"
			drawAnimation();
		}
		if(change == 1){
			//startAnimation();
		}
	}

// function to draw the animation
	function drawAnimation(){
		_animationRenderer = new THREE.WebGLRenderer();		
		_animationRenderer.setSize(window.innerWidth * .93 , window.innerHeight * .9);

		_animationScene = new THREE.Scene();

		//Creating a Camera
		_animationCamera = new THREE.PerspectiveCamera( 45, (window.innerWidth ) /(window.innerHeight ), 0.1, 10000 );
		_animationScene.add( _animationCamera); //camera Added
		//SETTING CAMERA POSITION
		_animationCamera.position.x += 00;	
		_animationCamera.position.y += 50;
		_animationCamera.position.z += 250;



		// Placing the animation code in body
			//change here if want to change the dom element
		document.getElementById('canvas').appendChild(_animationRenderer.domElement);

		//add controls
			//change here if want to change the dom element
		var r = document.getElementById('canvas');
		_animationControls = new THREE.TrackballControls(_animationCamera,r);
		_animationControls.addEventListener("change", render);

		//document.getElementById('canvas').hidden = true;


		// Adding the Ground
		var lines = new THREE.Geometry();
		var LinesMaterial = new THREE.LineBasicMaterial({color:"red"});
		var lengthOfGrid = 200;
		var step = 10;
		for(var i = -lengthOfGrid ; i <= lengthOfGrid ;i += step ){ 	
			lines.vertices.push(new THREE.Vector3(-lengthOfGrid,0,i));
			lines.vertices.push(new THREE.Vector3(lengthOfGrid,0,i));

			lines.vertices.push(new THREE.Vector3(i,0,-lengthOfGrid));
			lines.vertices.push(new THREE.Vector3(i,0,lengthOfGrid));
		}

		var Grid = new THREE.Line(lines,LinesMaterial,THREE.LinePieces);
		_animationScene.add(Grid);


		// Creating a Stand For cantilever
			// 1 left leg base and right leg base
		var leftBase , rightBase ;
		var baseLength , baseBreath , baseDepth;
		var baseColor = 144545;
		var leftBasePositionX, leftBasePositionY;
		var rightBasePositionX , rightBasePositionY;

		baseLength = 40 ; 
		baseBreath = 8;
		baseDepth = 40 ;

		leftBasePositionX = -120;
		leftBasePositionY = baseBreath / 2;

		rightBasePositionX = 50;
		rightBasePositionY = baseBreath / 2;

		//defining the structure of  Base
			//left base
		leftBase = new THREE.Mesh( new THREE.BoxGeometry(baseLength,baseBreath,baseDepth) , new THREE.MeshBasicMaterial({color:baseColor}));

			//right base
		rightBase = new THREE.Mesh( new THREE.BoxGeometry(baseLength,baseBreath,baseDepth) , new THREE.MeshBasicMaterial({color:baseColor}));

		//placing base at proper position
		leftBase.position.x += leftBasePositionX;	
		leftBase.position.y += leftBasePositionY;
		_animationScene.add(leftBase);

		rightBase.position.x += rightBasePositionX;	
		rightBase.position.y += rightBasePositionY;
		_animationScene.add(rightBase);


		//defining structure of support

		var leftSupport , rightSupport;
		var supportLength , supportBreath , supportDepth;
		var supportColor = 9991134399;
		var leftSupportPositionX, leftSupportPositionY;
		var rightSupportPositionX , rightSupportPositionY;

		supportLength = 10;
		supportBreath = 80;
		supportDepth = 10;

		leftSupportPositionX = leftBasePositionX;
		leftSupportPositionY = supportBreath / 2 + baseBreath /2;

		rightSupportPositionX = rightBasePositionX;
		rightSupportPositionY = supportBreath / 2 + baseBreath /2;

		leftSupport = new THREE.Mesh( new THREE.BoxGeometry(supportLength,supportBreath,supportDepth) ,new THREE.MeshBasicMaterial({color:supportColor})) ;
		
		rightSupport = new THREE.Mesh( new THREE.BoxGeometry(supportLength,supportBreath,supportDepth) ,new THREE.MeshBasicMaterial({color:supportColor})) ;

		leftSupport.position.x += leftSupportPositionX;
		leftSupport.position.y += leftSupportPositionY;
		_animationScene.add(leftSupport);


		rightSupport.position.x += rightSupportPositionX;
		rightSupport.position.y += rightSupportPositionY;
		_animationScene.add(rightSupport);

		//defining structure of cantilever
		var cantileverLength ,cantileverBreath , cantileverDepth  ;
		var cantileverRadius;
		var cantileverColor;
		var cantileverLeftPositionX , cantileverRightPositionX ;
		var cantileverLeftPositionY , cantileverRightPositionY ;
		
		cantileverLength = 75;
		cantileverBreath = 5;
		cantileverDepth = 4;
		cantileverRadius = 3;

		cantileverLeftPositionX = leftSupportPositionX  + cantileverLength / 2 + supportLength /2
		cantileverLeftPositionY = supportBreath - cantileverBreath / 2;

		if(_cantileverShape == "Cuboidal" || 1==1){
			_animationLeftCantileverCuboidal = new THREE.Mesh(new THREE.BoxGeometry(cantileverLength,cantileverBreath,cantileverDepth) , new THREE.MeshBasicMaterial());

			_animationLeftCantileverCuboidal.position.x += cantileverLeftPositionX;
			_animationLeftCantileverCuboidal.position.y += cantileverLeftPositionY;

			_animationScene.add(_animationLeftCantileverCuboidal);

			if(_cantileverShape != "Cuboidal"){
				_animationLeftCantileverCuboidal.visible = false;
			}

		}
		if(_cantileverShape == "Cylinderical"||1==1){
			_animationLeftCantileverCylinderical = new THREE.Mesh(new THREE.CylinderGeometry(cantileverRadius,cantileverRadius,cantileverLength) , new THREE.MeshBasicMaterial());

			_animationLeftCantileverCylinderical.position.x += cantileverLeftPositionX;
			_animationLeftCantileverCylinderical.position.y += cantileverLeftPositionY;

			_animationLeftCantileverCylinderical.rotation.z += 90 * Math.PI / 180;

			_animationScene.add(_animationLeftCantileverCylinderical);

			if(_cantileverShape != "Cylinderical"){
				_animationLeftCantileverCylinderical.visible = false;
			}
		}



		// creating right cantilever
		if(_cantileverShape == "Cuboidal" ||1==1){
			_animationRightCantileverCuboidal = new THREE.Mesh(new THREE.BoxGeometry(cantileverLength,cantileverBreath,cantileverDepth) , new THREE.MeshBasicMaterial());

			_animationRightBigCubeCuboidal  = new THREE.Object3D();

			//warpping rightcantilever in Object3D
			_animationRightBigCubeCuboidal.add(_animationRightCantileverCuboidal);

			//placing Object3D in proper place i.e on the right support
			_animationRightBigCubeCuboidal.position.y = supportBreath - cantileverBreath / 2;
			_animationRightBigCubeCuboidal.position.x = rightSupportPositionX   + supportLength /2 ; 

			// as object3D moved the right cantilver itself , we just have to move it little more and than rotate the object 3d;
			_animationRightCantileverCuboidal.position.x += cantileverLength /2;

			//rotating the cantilever to exact angle
			_animationRightBigCubeCuboidal.rotation.z -= _animationAngle * Math.PI/180;
			_animationScene.add(_animationRightBigCubeCuboidal);

			if(_cantileverShape != "Cuboidal"){
				_animationRightCantileverCuboidal.visible = false;
			}


		}
		if(_cantileverShape == "Cylinderical"||1==1){
			_animationRightCantileverCylinderical = new THREE.Mesh(new THREE.CylinderGeometry(cantileverRadius,cantileverRadius,cantileverLength) , new THREE.MeshBasicMaterial());

			_animationRightBigCubeCylinderical  = new THREE.Object3D();

			//warpping rightcantilever in Object3D
			_animationRightBigCubeCylinderical.add(_animationRightCantileverCylinderical);

			//placing Object3D in proper place i.e on the right support
			_animationRightBigCubeCylinderical.position.y = supportBreath - cantileverBreath / 2;
			_animationRightBigCubeCylinderical.position.x = rightSupportPositionX   + supportLength /2 ; 


			// as object3D moved the right cantilver itself , we just have to move it little more and than rotate the object 3d;

			_animationRightCantileverCylinderical.position.x += cantileverLength /2;


			_animationRightCantileverCylinderical.rotation.z += -90 * Math.PI/180;

			//rotating the cantilever to exact angle
			_animationRightBigCubeCylinderical.rotation.z -= _animationAngle * Math.PI/180;	

			_animationScene.add(_animationRightBigCubeCylinderical);

			if(_cantileverShape != "Cylinderical"){
				_animationRightCantileverCylinderical.visible = false;
			}
		}



		_animationRenderer.render(_animationScene,_animationCamera);
		render();

		window.addEventListener("resize",ReShapeTheCanvas);
		startAnimation();
	}

	function render(){
		_animationRenderer.render(_animationScene,_animationCamera);
	}
	// function to start the animation
	function startAnimation(){
		//console.log("animation");
		requestAnimationFrame(startAnimation);

		if(change == 1){
			change = 0;
			if(_cantileverShape == "Cuboidal"){ 
				_animationRightCantileverCuboidal.visible = _animationLeftCantileverCuboidal.visible = true;
				_animationLeftCantileverCylinderical.visible = _animationRightCantileverCylinderical.visible = false;

				_animationRightBigCubeCuboidal.rotation.z = 0 * Math.PI/180;
				_animationRightBigCubeCuboidal.rotation.z -= _animationAngle * Math.PI/180;

			}
			else if(_cantileverShape == "Cylinderical"){
				_animationLeftCantileverCylinderical.visible = _animationRightCantileverCylinderical.visible = true;
				_animationRightCantileverCuboidal.visible = _animationLeftCantileverCuboidal.visible = false;

				_animationRightBigCubeCylinderical.rotation.z = 0 * Math.PI/180;
				_animationRightBigCubeCylinderical.rotation.z -= _animationAngle * Math.PI/180;
			}
		}

		_animationControls.update();
		_animationRenderer.render(_animationScene,_animationCamera);
	}



	function ShowBendingMomentGraph() {
		document.getElementById("HideOrShowDeflection").hidden = true;
		document.getElementById("canvas").hidden = true;
		document.getElementById("HideOrShowBendingMomentGraph").hidden = false;

	}
	function ShowDeflection() {
		document.getElementById("HideOrShowBendingMomentGraph").hidden = true;
		document.getElementById("HideOrShowDeflection").hidden = false;
		document.getElementById("canvas").hidden = false;


	}


	// funtion to show the output
	/*function showOutput(){
		//initializeVariables();
		//calculateOutput();
		alert("cantilever Deflection = " + _cantileverDeflection);
		alert("cantilever Slope = " + _cantileverSlope);
	}*/

	/*alert(_cantileverShape + " " + _cantileverLength + " " + _cantileverLengthUnit  + " " + _cantileverLengthMultipicationFactor + " " + _cantileverBreath + " " + _cantileverBreathUnit + " " + _cantileverBreathMultipicationFactor + " " + _cantileverDepth + " " + _cantileverDepthUnit + " " + _cantileverDepthMultipicationFactor + " " + _cantileverRadius + " " + _cantileverRadiusUnit + " " + _cantileverRadiusMultipicationFactor + " " + _cantileverLoadApplied + " " + _cantileverLoadAppliedUnit + " " + _cantileverLoadAppliedMultipicationFactor + " " + _cantileverMaterial + " " + _cantileverElasticity);*/


