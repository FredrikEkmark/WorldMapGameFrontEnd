"use strict";

function getMap() {

    let worldMap = [];

    let tileType = "grasland";

    for (let y = 0; y < 100; y++) {
        let evenOdd = 0;
        let longitude = [];
        if (y % 2 === 0) {
            tileType = "sea";
            evenOdd = 1;
        } else {
            tileType = "grasland";
            evenOdd = 0;
        }
        for (let x = 0; x < 99 + evenOdd; x++) {
            let tileType1 = tileType;
            if (x % 2 === 0) {
                tileType1 = "sea";
            } else if (x % 5 === 0) {
                tileType1 = "desert";
            }
            let coordinate = (y + (x * 0.0001));
            let tile = { coordinate: coordinate, tileType: tileType1 };
            longitude.push(tile);
        }
        worldMap.push(longitude);
    }

    /*
    fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(data => writeMap(data));
        */

    writeMap(worldMap);
}

function writeMap(map) {

    let centerPoint = { x: 50, y: 40 }

    let even;
    let odd;

    if (centerPoint.y % 2 === 0) {
        even = 1;
        odd = 0;
    } else {
        even = 0;
        odd = 1;
    }

    



    for (let y = centerPoint.y - 10; y < centerPoint.y + 11; y++) {
        let evenOdd = 0;
        if (y % 2 === 0) {
            evenOdd = even;
        } else {
            evenOdd = odd;
        }
        let lineEdge = "";
        if (y === centerPoint.y - 10) {
            lineEdge = " topEdge";
        } else if (y === centerPoint.y + 10) {
            lineEdge = " bottomEdge";
        }

        for (let x = centerPoint.x - 10; x < centerPoint.x + 9 + evenOdd; x++) {
            let edge = "";
            if (lineEdge !== "") {
                edge = lineEdge;
                if (x + 1 - evenOdd === centerPoint.x - 10) {
                    if (lineEdge === " topEdge") {
                        edge = " leftTopEdge";
                    } else if (lineEdge === " bottomEdge") {
                        edge = " leftBottomEdge";
                    }
                } else if (x === centerPoint.x + 9) {
                    if (lineEdge === " topEdge") {
                        edge = " rightTopEdge";
                    } else if (lineEdge === " bottomEdge") {
                        edge = " rightBottomEdge";
                    }
                }

            } else if (x + 1 - evenOdd === centerPoint.x - 10) {
                edge = " leftEdge";
            } else if (x === centerPoint.x + 9) {
                edge = " rightEdge";
            }

            document.getElementById(`container`).innerHTML += `
    <div id="${map[y][x].coordinate}" class="${map[y][x].tileType}${edge}" onmouseover="getCoordinate(this.id)"></div>`;
        }
    }

}

function getCoordinate(id) {
    let y = parseInt(Math.floor(id));
    let x = parseInt((id - y) * 10000);
    document.getElementById("coordinates").innerHTML = id + "<br>" + y + "." + x;
}

getMap();
