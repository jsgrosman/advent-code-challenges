import * as fs from "fs";
import yargs = require('yargs');

const args = yargs.options({
    'file': { type: 'string', demandOption: true, alias: 'f' },
  }).argv;
  
const fullFilePath = `${process.cwd()}/${args['file']}`;

interface city {
    name: string,
    visited: boolean,
    longestRoute: number,
    distances: {
        destination: string,
        distance: number
    }[]
};
const graph = new Map<string, city>();

const clearVisited = () => {
    for (let elm of graph.values()) {
       elm.visited = false;
       elm.longestRoute = 0;
    }
}

const getFarthestAway = () => {
    let maxDistance = 0;
    let maxCity;

    for (let elm of graph.values()) {
        if (!elm.visited && elm.longestRoute > maxDistance) {
            maxDistance = elm.longestRoute;
            maxCity = elm;
        }
     }
     return maxCity;
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
            longestRoute: 0,
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

    console.debug(start + "," + end + "," + distance); 

    addRouteToGraph(start, end, distance);
    addRouteToGraph(end, start, distance);
}

 //console.dir(graph, { depth: null});


for (let startCity of graph.keys()) {
    clearVisited();
    const finalRoute = [startCity];

    let currentCity = graph.get(startCity);
    if (currentCity) {
        currentCity.visited = true;
        while (finalRoute.length < graph.size) {
            if (currentCity) {
                for (let dests of currentCity.distances) {
                    const possibleDest = graph.get(dests.destination);
                    if (possibleDest && !possibleDest.visited) {
                        const newLongestRoute = currentCity.longestRoute + dests.distance;
                        if (newLongestRoute > possibleDest.longestRoute) {
                            possibleDest.longestRoute = newLongestRoute;
                        }
                    }
                }

                // console.dir(graph, { depth: null});
                currentCity = getFarthestAway();
                if (currentCity) {
                    currentCity.visited = true;
                    finalRoute.push(currentCity.name + ": " + currentCity.longestRoute);
                }
            }
        }
        
        // console.dir(graph, { depth: null});
        console.dir(finalRoute);
    }
}




