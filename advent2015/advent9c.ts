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

    // console.debug(start + "," + end + "," + distance); 

    addRouteToGraph(start, end, distance);
    addRouteToGraph(end, start, distance);
}

 // console.dir(graph, { depth: null});


 const shuffle = (array: string[]) => {
    {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
 }

const calculateDistance = (cities: string[]) => {
    let totalDistance = 0;
    let prevCity: city| undefined = undefined
    
    for (let cityName of cities) {
        const currentCity = graph.get(cityName);
        if (currentCity && prevCity) {
            for (let route of currentCity.distances.values()) {
                if (route.destination == prevCity.name) {
                    totalDistance += route.distance;
                }
            }
        }
        prevCity = currentCity;
    }

    return totalDistance;
}

 const cities = Array.from(graph.keys());

 let maxDistance = 0;
 let maxRoute: string[] = [];
 for (let i = 0; i < 500000; i++) {
     shuffle(cities);

     const result = calculateDistance(cities);
     // console.dir(cities);
     // console.log(result);

     if (result > maxDistance) {
        maxRoute = Object.assign([], cities);
     }
     maxDistance = Math.max(result, maxDistance);
     
 }

 console.log("max distance: " + maxDistance);
 console.dir(maxRoute);


 




