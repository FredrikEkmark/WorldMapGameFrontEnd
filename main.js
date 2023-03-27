"use strict";

const colors = ["red", "green", "blue", "yellow", "pink", "orange", "purple", "teal"];

const tileType = ["grasland", "forest", "sea", "costalsea", "desert", "mountain"];

const map = []

function generateTile(noiseKey, surroundingKey) {

    let sum = 0;

    let surroundingTilesNr = 0;

    for (let index = 0; index < surroundingKey.length; index++) {
        if (surroundingKey[index] !== null) {
            surroundingTilesNr++;
            sum += surroundingKey[index];
        }
    }

    let avg = sum / surroundingTilesNr;

    let random = ( 0.1 *((Math.floor(21) - Math.floor(21)) + noiseKey));

    let tileValue = avg + random;

    return tileValue

};

function generateMap(mapHeight, mapWidth) {

    const tempMap = []

    const noiseMap = generateNoiseMap(mapHeight, mapWidth);

    for (let i = 0; i < noiseMap[0].length; i++) {
        console.log(noiseMap[0][i]);
        
    }

    for (let y = 0; y < noiseMap.length; y++) {
        const latitude = []
        let length;
        if (y % 2 === 0) {
            length = noiseMap[y].length;
        } else {
            length = (noiseMap[y].length - 1);
        }
        for (let x = 0; x < length; x++) {
            latitude.push(generateTile(noiseMap[y][x], [noiseMap[y-1][x],noiseMap[y-1][x+1]]))
        }
        tempMap.push(latitude); 
    }

    return tempMap;

};

function generateNoiseMap(mapHeight, mapWidth) {

    const numOctaves = 6;
    const frequency = 0.11;
    const amplitude = 0.1;

    let noiseMap = [];

    let perlinArray = generatePerlinNoise(mapWidth, mapHeight, numOctaves, frequency, amplitude);

    console.log("test");

    for (let y = 0; y < mapHeight; y++) {
        let latitude = []
        for (let x = 0; x < mapWidth; x++) {
            var value = perlinArray[x][y];
            var colorValue = Math.floor(value * 255);
            latitude.push(colorValue);
        }
        noiseMap.push(latitude);
    }

    return noiseMap;
};

function generatePerlinNoise(width, height, numOctaves, frequency, amplitude) {
    var perlinArray = [];

    // Generate a random grid of gradient vectors
    var gradientVectors = [];
    for (var i = 0; i < width * height; i++) {
        gradientVectors.push([Math.random() * 2 - 1, Math.random() * 2 - 1]);
    }

    // Generate each octave of noise and combine them
    for (var octave = 0; octave < numOctaves; octave++) {
        var octaveArray = [];
        var octaveFrequency = frequency * Math.pow(2, octave);
        var octaveAmplitude = amplitude / Math.pow(2, octave);

        // Generate the noise values for this octave
        for (var x = 0; x < width; x++) {
            var row = [];
            for (var y = 0; y < height; y++) {
                var sampleX = x / octaveFrequency;
                var sampleY = y / octaveFrequency;

                // Calculate the coordinates of the four corners of the cell
                var cellX1 = Math.floor(sampleX);
                var cellY1 = Math.floor(sampleY);
                var cellX2 = cellX1 + 1;
                var cellY2 = cellY1 + 1;

                // Calculate the dot products between the gradients and the vectors from the corners to the sample point
                let dot1 = dotProduct(gradientVectors[getGradientIndex(cellX1, cellY1)], sampleX - cellX1, sampleY - cellY1);
                var dot2 = dotProduct(gradientVectors[getGradientIndex(cellX2, cellY1)], sampleX - cellX2, sampleY - cellY1);
                var dot3 = dotProduct(gradientVectors[getGradientIndex(cellX1, cellY2)], sampleX - cellX1, sampleY - cellY2);
                var dot4 = dotProduct(gradientVectors[getGradientIndex(cellX2, cellY2)], sampleX - cellX2, sampleY - cellY2);

                // Interpolate between the dot products to get the noise value for this point
                var noiseValue = interpolate(dot1, dot2, dot3, dot4, sampleX - cellX1, sampleY - cellY1);

                // Scale and add the noise value to the octave array
                row.push(noiseValue * octaveAmplitude);
            }
            octaveArray.push(row);
        }

        // Add this octave's noise to the overall array
        perlinArray.push(octaveArray);
    }

    // Combine the octaves into a single array by adding them together
    var finalArray = [];
    for (var x = 0; x < width; x++) {
        var row = [];
        for (var y = 0; y < height; y++) {
            var sum = 0;
            for (var octave = 0; octave < numOctaves; octave++) {
                sum += perlinArray[octave][x][y];
            }
            row.push(sum);
        }
        finalArray.push(row);
    }

    return finalArray;
};

// Helper function to get the index of the gradient vector for a given cell
function getGradientIndex(x, y) {
    return (x * 137 + y * 157) % 256;
};

// Helper function to calculate the dot product between a gradient vector and a point
function dotProduct(gradient, x, y) {
    return gradient[0] * x + gradient[1] * y;
};

// Helper function to interpolate between values using a smoothing function
function interpolate(a, b, c, d, x, y) {
    var smoothX = smoothstep(x);
    var smoothY = smoothstep(y);

    var ab = lerp(a, b, smoothX);
    var cd = lerp(c, d, smoothX);

    return lerp(ab, cd, smoothY);
};

// Helper function to interpolate linearly between two values
function lerp(a, b, t) {
    return a * (1 - t) + b * t;
};

// Helper function to apply a smoothing function to a value
function smoothstep(x) {
    return 3 * x * x - 2 * x * x * x;
};

function printMap(worldMap) {

    console.log("Print world map");

    document.getElementById("container").innerHTML = "";

    for (let y = 0; y < worldMap.length; y++) {
        for (let x = 0; x < worldMap[y].length; x++) {
            let id = `Long: ${y} Lat: ${x}`;
            let tileType;
            console.log(worldMap[y][x])
            
        }
    }
};

function newMap() {

    printMap(generateMap(31, 40));

}

printMap(generateMap(31, 40));





