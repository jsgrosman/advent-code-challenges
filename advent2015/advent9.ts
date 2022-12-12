import * as fs from "fs";
import yargs = require('yargs');

const args = yargs.options({
    'file': { type: 'string', demandOption: true, alias: 'f' },
  }).argv;
  
const fullFilePath = `${process.cwd()}/${args['file']}`;

interface city {
    name: string,
    visited: boolean,
    shortestRoute: number,
    distances: {
        destination: string,
        distance: number
    }[]
};
const graph = new Map<string, city>();

const clearVisited = () => {
    for (let elm of graph.values()) {
       elm.visited = false;
       elm.shortestRoute = 9999999;
    }
}

const getClosest = () => {
    let minDistance = 99999;
    let minCity;

    for (let elm of graph.values()) {
        if (!elm.visited && elm.shortestRoute < minDistance) {
            minDistance = elm.shortestRoute;
            minCity = elm;
        }
     }
     return minCity;
}

const addRouteToGraph = (start: string, end: string, distance: number) => {
    if (graph.has(start)) {
        const graphElm = graph.get(start);
        if (graphElm && graphElm.distances) {
            graphElm.distances.push({
                destination: end,
                distance
            });
        }
    } else {
        graph.set(start, {
            name: start,
            visited: false,
            shortestRoute: 9999999,
            distances: [
                {
                    destination: end,
                    distance
                }
            ]
        });
    }
}


if (!fs.existsSync(fullFilePath)) {
    console.error("No such file: " + fullFilePath);
}
const contents = fs.readFileSync(fullFilePath, 'utf8');
const lines = contents.trim().split(/\n/g);

for (let line of lines) {
    const [route, distanceStr] = line.split(' = ', 2);
    const [start, end] = route.split(' to ', 2);

    const distance = parseInt(distanceStr, 10);

    // console.debug(start + "," + end + "," + distance); 

    addRouteToGraph(start, end, distance);
    addRouteToGraph(end, start, distance);
}

 //console.dir(graph, { depth: null});


for (let startCity of graph.keys()) {
    clearVisited();
    const finalRoute = [startCity];

    let currentCity = graph.get(startCity);
    if (currentCity) {
        currentCity.shortestRoute = 0;
        currentCity.visited = true;
        while (true) {
            if (currentCity) {
                console.log(currentCity.name);
                console.dir(currentCity.distances);
                for (let dests of currentCity.distances) {
                    const possibleDest = graph.get(dests.destination);
                    if (possibleDest && !possibleDest.visited) {
                        const newShortestRoute = currentCity.shortestRoute + dests.distance;
                        if (newShortestRoute < possibleDest.shortestRoute) {
                            possibleDest.shortestRoute = newShortestRoute;
                            console.log("Updating " + possibleDest.name + " with " + newShortestRoute);
                        }
                    }
                }

                //console.dir(graph, { depth: null});
                currentCity = getClosest();
                if (currentCity) {
                    currentCity.visited = true;
                    finalRoute.push(currentCity.name + ": " + currentCity.shortestRoute);
                } else {
                    break;
                }

            }
        }
        
        // console.dir(graph, { depth: null});
        console.dir(finalRoute);
    }
}




