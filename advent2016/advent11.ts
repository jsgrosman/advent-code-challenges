
const NUM_OF_COMPONENTS = 4;

type microchip = {
    type: "microchip";
    element: string;
}

type generator = {
    type: "generator";
    element: string;
}

type component = microchip | generator;

const isCompatible = (m: microchip, g: generator) => {
    return m.element === g.element;
}

class State {
    floor1: component[];
    floor2: component[];
    floor3: component[];
    floor4: component[];
    elevator: number;
    steps: number;

    constructor(floor1: component[], floor2: component[], floor3: component[], floor4: component[], elevator: number, steps: number) {
        this.floor1 = Object.assign([], floor1);
        this.floor2 = Object.assign([], floor2);
        this.floor3 = Object.assign([], floor3);
        this.floor4 = Object.assign([], floor4);

        this.floor1.sort();
        this.floor2.sort();
        this.floor3.sort();
        this.floor4.sort();

        this.elevator = elevator;
        this.steps = steps;
      }

      isGoal(): boolean {
        return this.floor4.length > NUM_OF_COMPONENTS && this.elevator == 4;
      }

      isValidFloor(f: component[]): boolean {
        for (let component of f) {
            if (component.type == 'microchip' && !f.includes( {
                type: 'generator',
                element: component.element
            })) {
                if (f.includes)
            }
        }

        return true;
      }
}


const isValidFloor = (floor: string) => {
    const floorComponents = floor.split('|');
    console.dir(floorComponents);
    for (let component of floorComponents) {
        if (component.type == 'microchip' && !floor.includes(component.replace('-M', '-G'))) {
            if (floor.includes('-G')) {
                return false;
            }
        }
    }
    return true;
}



/*
F4 .  .  .  .  .  
F3 .  .  .  LG .  
F2 .  HG .  .  .  
F1 E  .  HM .  LM 

*/

const allComponents = [
    'L-G', 'L-M', 'H-G', 'H-M'
];

const floor1: string = 'H-M|L-M';
const floor2: string = 'H-G';
const floor3: string = 'L-G'
const floor4: string = '';

let elevatorFloor = 1;

// console.log(isValidFloor(floor1));
// console.log(isValidFloor(floor2));
// console.log(isValidFloor(floor3));
// console.log(isValidFloor(floor4));
// console.log(isValidFloor('H-M|H-G|L-G'));
// console.log(isEndState(floor4, 4));

const checkFloor = (stepNum: number, floor1: string, floor2: string, floor3: string, floor4: string, currentFloor: number) {
    if (isEndState(floor4, elevatorFloor)) {
        console.log(`Number of steps: ${stepNum}`);
        return true;
    }

    if (elevatorFloor === 1) {
        const floor1Components = floor1.split('|');
        const floor2Components = floor2.split('|');

        const paths: string[] = Object.assign([], floor1Components);
        for (let f1 = 0; f1 < floor1Components.length; f1++) {
            for (let f2 = f1 + 1; f2 < floor1Components.length; f2++) {
                
            }
        }

    }

}