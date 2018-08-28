// Just the stuff I need
// no real matrix math

function copy(o) {
	var output, v, key;
	output = Array.isArray(o) ? [] : {};
	for (key in o) {
		v = o[key];
		output[key] = (typeof v === "object") ? copy(v) : v;
	}
	return output;
}

function customMatrix(sizeX, sizeY, fn) {
	let M = [];
	for(let y = 0; y < sizeY; y++) {
		let A = [];
		for(let x = 0; x < sizeX; x++) {
			A[x] = (fn||Number)();
		}
		M.push(A);
	}
	return M;
}

function glueX(aM) {
	return aM.reduce(function(M1, M2) {
		return M1.map((A,i) => A.concat(M2[i]));
	});
}

function glueY(aM) {
	return rotate(glueX(aM.map(M => rotate(M, -1))), 1);
}

function getWidth(M) {
	return M[0].length;
}

function getHeight(M) {
	return M.length;
}

function flipX(M) {
	return copy(M).map(A => A.reverse());
}

function flipY(M) {
	return copy(M).reverse();
}

function transpose(M) {
	return M[0].map((_, c) => M.map(r => r[c]));
	//return customMatrix(getHeight(M), getWidth(M), (x,y) => M[x][y]);
}

function rotate(M, n=1) {
	n = n % 4;

	if(n === 0) {
		return copy(M);
	} else if(n % 2 === 0) {
		return flipX(flipY(M));
	} else {
		return rotate(flipX(transpose(M)), n - 1);
	}
}