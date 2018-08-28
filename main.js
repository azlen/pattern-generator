let container = document.querySelector('#container');

let random = {
	int: function(a, b) {
		return Math.floor(Math.random() * (b - a + 1) + a);
	},
	choice: function(A) {
		return A[random.int(0, A.length - 1)];
	}
}

let combinations = [
	function(M1, M2) { // clone 4 times
		return glueY([
			glueX([M1, M2]),
			glueX([M2, M1])
		])
	},
	/*function(M1, M2, M3, M4) {
		return glueY([
			glueX([M1, M2]),
			glueX([M3, M4])
		])
	},*/
	/*function(M1, M2) { // horizontal symmetry
		return glueY([
			glueX([M1, flipX(M1)]),
			glueX([M2, flipX(M2)])
		])
	},
	function(M1, M2) { // vertical symmetry
		return glueY([
			glueX([M1, M2]),
			glueX([flipY(M1), flipY(M2)])
		])
	},*/
	function(M1, M2) { // horizontal and vertical symmetry
		return glueY([
			glueX([M1, flipX(M2)]),
			glueX([flipY(M1), flipX(flipY(M2))])
		])
	},
	function(M1, M2) { // rotating around centre
		return glueY([
			glueX([rotate(M1, 0), rotate(M2, 1)]),
			glueX([rotate(M2, 3), rotate(M1, 2)])
		])
	},/*
	function(M1, M2, M3, M4) { // rotating around centre
		return glueY([
			glueX([rotate(M1, 0), rotate(M2, 1)]),
			glueX([rotate(M3, 3), rotate(M4, 2)])
		])
	},
	function(M1, M2) { // rotating away from centre
		return glueY([
			glueX([rotate(M1, 2), rotate(M2, 3)]),
			glueX([rotate(M2, 1), rotate(M1, 0)])
		])
	},*/
];

function createSVG(M, gridType, gridSize) {
	let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

	let topLeft = createPath(gridType(0, 0));
	let bottomRight = createPath(gridType(getWidth(M) - 1, getHeight(M) - 1));

	svg.appendChild(topLeft);
	svg.appendChild(bottomRight);
	document.body.appendChild(svg);

	let topLeftBBox = topLeft.getBBox();
	let bottomRightBBox = bottomRight.getBBox();

	let width = topLeftBBox.x + bottomRightBBox.x + bottomRightBBox.width;
	let height = topLeftBBox.y + bottomRightBBox.y + bottomRightBBox.height;

	document.body.removeChild(svg);
	svg.removeChild(topLeft);
	svg.removeChild(bottomRight);

	svg.setAttribute('width', width * gridSize);
	svg.setAttribute('height', height * gridSize);
	svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
	return svg;
}

function createPath(d) {
	let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	path.setAttribute('d', d);
	return path;
}

function createCanvas(width, height) {
	let canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;

	return canvas;
}


/*function scaleCanvas(canvas, scale) {
	canvas.style.setProperty('width', `${canvas.width * scale}px`);
	canvas.style.setProperty('height', `${canvas.height * scale}px`);

	return canvas;
}*/

function renderMatrix(M, scale=10) {
	let canvas = createCanvas(getWidth(M) * scale, getHeight(M) * scale);
	let ctx = canvas.getContext('2d');

	for(let y = 0; y < getHeight(M); y++) {
		for(let x = 0; x < getWidth(M); x++) {
			let value = M[y][x];

			ctx.fillStyle = colors[value];

			ctx.fillRect(x * scale, y * scale, scale, scale);
		}
	}
	
	// scaleCanvas(canvas, scale);

	container.appendChild(canvas);

	return canvas;
}

let grids = {
	square: function(x, y) {
		return `M${x} ${y}l1 0l0 1l-1 0`;
	},
	triangle: function(x, y) { // squished triangles
		return `M${Math.floor(x/2) * 2 /*- 2 * (y%2)*/} ${y}` + (x%2===0 ? 'l2 0l0 1l-2 0' : 'l0 1l2 0');
	},
	hex: function(x, y) {
		y = x%2===0 ? y + Math.cos(Math.PI/3) : y;
		x = x * Math.sin(Math.PI/3);
		let d = `M${x} ${y}`;
		for(let i = 0; i <= 6; i ++) {
			d += `L${x + Math.cos(Math.PI/3*i) * 0.6} ${y + Math.sin(Math.PI/3*i) * 0.6}`
		}
		return d;
	}
}

function renderMatrix(M, gridType, gridSize=10, colors) {

	//let svg = createSVG(getWidth(M) * gridSize, getHeight(M) * gridSize);
	let svg = createSVG(M, gridType, gridSize);
	

	for(let y = 0; y < getHeight(M); y++) {
		for(let x = 0; x < getWidth(M); x++) {
			let value = M[y][x];

			let path = createPath(gridType(x, y));
			path.setAttribute('fill', colors[value]);

			svg.appendChild(path);
		}
	}

	// container.appendChild(svg);

	return svg;
}

// let colors = [
	// greens
	/*'#2B3D54',
	'#2C5B61',
	'#247065',
	'#60A65F',
	'#FFEC97',*/
	
	/*'#FFFFFF',
	'#EEEEEE',
	'#FFEEEE',
	'#AAAAAA',
	'#FFFFDD'*/

	/*'#2E112D',
	'#540032',
	'#820333',
	'#C9283E',
	'#F0433A'*/

	/*'#000000',
	'#888888',
	'#999999',
	'#AAAAAA',
	'#FFFFFF'*/

	//'#1F2D3D',
	//'#343F4B',
	//'#FFADB9',
	//'#F95F62',
	//'#DC304B',

	/*'#1F2D3D',
	'#FFFFFF',
	'#FFFFFF',
	'#DC304B',*/

	/*'#101010',
	'#101010',
	'#1C1A1A',
	'#241628',
	'#241628',
	'#241628',*/

	/*'#481F38',
	'#CF452F',
	'#F4C473',*/

	/*'#000000',
	'#333333',
	'#392833',*/

	//'#000000',
	//'#331122',
//	'#FFFFFF',
//	'#FFFFFF',
	//'#F8F0FF',
//	'#DC304B'
	//'#DDDDDD'
//]


function generate(options={}) {
	let initSize = options.initSize || 2;
	let perLevel = options.perLevel || [8, 5, 3, 2, 1];
	let scaling = options.scaling || 10;
	let colors = options.colors || ['#FFFFFF', '#000000'];

	let tiling = options.tiling || grids[random.choice(Object.keys(grids))];

	let availableCombinations = [];
	for(let i = 0; i < 7; i++) { availableCombinations.push(random.choice(combinations)) }

	let patterns = [[]];

	for(let i = 0; i < perLevel.length; i++) {
		patterns[i] = [];
		for(let j = 0; j < perLevel[i]; j++) {
			let M;
			if(i === 0) {
				M = customMatrix(initSize, initSize, random.choice.bind(null, Object.keys(colors)));
			} else {
				let pattern1 = random.choice(patterns[i-1]);
				let pattern2 = random.choice(patterns[i-1]);
				let pattern3 = random.choice(patterns[i-1]);
				let pattern4 = random.choice(patterns[i-1]);
				M = random.choice(availableCombinations)(pattern1, pattern2, pattern3, pattern4);
			}
			patterns[i].push(M);
			
		}
		/*let br = document.createElement('br');
		container.appendChild(br);*/
	}

	let svg = renderMatrix(patterns[patterns.length - 1][0], tiling, scaling, colors);
	let svgImage = new Image();

	svgImage.addEventListener('load', function() {
		let canvas = createCanvas(svgImage.width, svgImage.height);
		let ctx = canvas.getContext('2d');
		ctx.drawImage(svgImage, 0, 0);

		let dataUrl = canvas.toDataURL("image/png");
		console.log(dataUrl);

		document.body.style.setProperty('background-image', `url(${dataUrl})`);
	});

	svgImage.src = 'data:image/svg+xml;base64,' + window.btoa(svg.outerHTML);

	

	//container.appendChild(image);
}

function gen() {
	let c = chroma.random();
	let c2 = chroma.random();
	let c3 = chroma.random();
	generate({
		//initSize: 2,
		tiling: grids.square,
		/*perLevel: [
			random.int(1, 10),
			random.int(3,4),
			random.int(2,8),
			random.int(1,6),
			random.int(1,3)
		].concat(random.choice([1], [
			random.int(1,2), 1,
		])),*/
		perLevel: [
			10, 8, 6, 4, 2, 5, 1
		],
		scaling: 3,
		colors: [
			//'#111111', '#111111'
			/*c.desaturate(2).luminance(0.005).hex(),
			c2.desaturate(2).luminance(0.05).hex(),
			c.desaturate(2).luminance(0.1).hex(),
			c.luminance(0.4).hex(),
			c2.luminance(0.5).hex(),
			c.luminance(0.7).hex(),*/
			c.set('hsl.l', 0),
			//c.set('hsl.l', 0.1),

			//c.set('hsl.l', 0.4),
			//c.set('hsl.l', 0.5),
			c.set('hsl.l', 0.5),

			//c2.set('hsl.l', 0.4),
			//c2.set('hsl.l', 0.5),
			c2.set('hsl.l', 0.5),

			//c3.set('hsl.l', 0.4),
			c3.set('hsl.l', 0.5),

			//c.set('hsl.l', 0.9),
			//c.set('hsl.l', 0.9),
			//c.set('hsl.l', 1),
			c.set('hsl.l', 1),
			c.set('hsl.l', 1),
			c.set('hsl.l', 1),

			/*c2.set('hsl.l', 0.1),
			c2.set('hsl.l', 0.2),
			c2.set('hsl.l', 0.3),
			c2.set('hsl.l', 0.3),
			c2.set('hsl.l', 0.4),*/


			//chroma.random().desaturate(1).luminance(0.5).darken(2).hex(),
		]
		/*colors: [
			'#000000',
			'#000000',
			'#D6FE43',
			'#DF4732'
		]*/
	})
}

gen();
