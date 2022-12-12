import * as fs from "fs";
import yargs = require('yargs');

const args = yargs.options({
    'file': { type: 'string', demandOption: true, alias: 'f' },
  }).argv;
  
const fullFilePath = `${process.cwd()}/${args['file']}`;

if (!fs.existsSync(fullFilePath)) {
    console.error("No such file: " + fullFilePath);
}
const contents = fs.readFileSync(fullFilePath, 'utf8');
const lines = contents.trim().split(/\n/g);

const getCapacity = () => {
    let total = 0;
    for (let ingredient of allIngredients) {
        total += ingredient.tablespoons * ingredient.capacity 
    }
    return Math.max(0, total);
}

const getDurability = () => {
    let total = 0;
    for (let ingredient of allIngredients) {
        total += ingredient.tablespoons * ingredient.durability 
    }
    return Math.max(0, total);
}

const getFlavor = () => {
    let total = 0;
    for (let ingredient of allIngredients) {
        total += ingredient.tablespoons * ingredient.flavor 
    }
    return Math.max(0, total);
}

const getTexture = () => {
    let total = 0;
    for (let ingredient of allIngredients) {
        total += ingredient.tablespoons * ingredient.texture 
    }
    return Math.max(0, total);
}

const getCalories = () => {
    let total = 0;
    for (let ingredient of allIngredients) {
        total += ingredient.tablespoons * ingredient.calories 
    }
    return Math.max(0, total);
}

const getScore = () => {
    return getCapacity() * getDurability() * getFlavor() * getTexture();
}

interface ingredient {
    name: string,
    capacity:  number,
    durability: number,
    flavor: number,
    texture: number,
    calories: number,
    tablespoons: number
};

const allIngredients: ingredient[] = [];

for (let line of lines) {
    const matches = line.match(/^(\w+): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (\d+)$/) || [];
    
    const name = matches[1] || '';
    const capacity = parseInt(matches[2], 10);
    const durability = parseInt(matches[3], 10);
    const flavor = parseInt(matches[4], 10);
    const texture = parseInt(matches[5], 10);
    const calories = parseInt(matches[6], 10);


    allIngredients.push(
        {
            name,
            capacity,
            durability,
            flavor,
            texture,
            calories,
            tablespoons: 0 
        }
    );
}

// console.dir(allIngredients);



let highScore = 0, highTbsp1 = 0, highTbsp2 = 0, highTbsp3 = 0, highTbsp4 = 0;
for (let i = 0; i < 1000000; i++)
{
    const tbsp1 = Math.floor( Math.random() * 100);
    const tbsp2 = Math.floor( Math.random() * (100 - tbsp1));
    const tbsp3 = Math.floor( Math.random() * (100 - tbsp1 - tbsp2));
    const tbsp4 = 100 - tbsp1 - tbsp2 - tbsp3;

    
    allIngredients[0].tablespoons = tbsp1;
    allIngredients[1].tablespoons = tbsp2;
    allIngredients[2].tablespoons = tbsp3;
    allIngredients[3].tablespoons = tbsp4;

    if (getCalories() !== 500) {
        continue;
    }

    const score = getScore();
    // console.log(`${allIngredients[0].name}: ${tbsp1}, ${allIngredients[1].name}: ${tbsp2}, ${allIngredients[2].name}: ${tbsp3}, ${allIngredients[3].name}: ${tbsp4}, ${tbsp1 + tbsp2 + tbsp3 + tbsp4}, Score: ${highScore}`);


    if (score > highScore) {
        highScore = score;
        highTbsp1 = tbsp1;
        highTbsp2 = tbsp2;
        highTbsp3 = tbsp3;
        highTbsp4 = tbsp4;
    }
}

console.log(`${allIngredients[0].name}: ${highTbsp1}, ${allIngredients[1].name}: ${highTbsp2}, ${allIngredients[2].name}: ${highTbsp3}, ${allIngredients[3].name}: ${highTbsp4}, Score: ${highScore}`);


/*
const totals: number[] = []
opt func = f(allIngredients) = mult(sum(ingredient(capacity)),
sum(ingredient(durability)),sum(ingredient(flavor)),sum(ingredient(texture)))
nested for loops to get totals and calculate this "max" thing

f(1,2,...) = sum(1v,2v,...)*sum(1w,2w,...)*sum(1x,2x,...)*sum(1y,2y,...)

ingredient has five functions
v(c,d,f,t,tb) = c
w(c,d,f,t,tb) = d
...x,y,z

parameter func = g(1,2,...) = sum(1z,2z,...) = 100

gradient f = <df/da,df/db,...,df/dz> (after you get the equation for "max" thing get
partial derivatives)

gradient g = <1, 1,...,1>

df/da = df/db = ... = df/dz

df/dv = df/d1 * d1/dv + df/d2 * d2/dv + ...
df/d1 * d1/dv = df/dv - df/d2 * d2/dv - df/d3 * d3/dv - ...

*/

/*
max = f(1c,1d,1f,1t,1tb,2c,2d,...) = (1c1tb + 2c2tb,...)(1d1tb + 2d2tb,...)
(1f1tb + 2f2tb,...)(1t1tb + 2t2tb,...)
para = g(1c,1d,1f,1t,1tb,2c,2d,...) = 1tb + 2tb,...

grad f = <f1tb/(1c + 2c,...),f1tb/(1d + 2d,...),f1tb/(1f + 2f,...),df/d1tb,
f2tb/(1c + 2c,...),f2tb/(1d + 2d,...),f2tb/(1f + 2f,...),f2tb/(1t + 2t,...),df/d2tb,...>
grad g = <0,0,0,0,1,0,0,0,0,1,...>

lambda = df/d1tb = df/d2tb = ...
= 1c*f/(1c1tb + 2c2tb,...) + 
(1c1tb + 2c2tb,...)*(1d*f/(1c1tb + 2c2tb,...)(1d1tb + 2d2tb,...) +
(1d1tb + 2d2tb,...)*(1f*f/(1c1tb + 2c2tb,...)(1d1tb + 2d2tb,...)(1f1tb + 2f2tb,...) +
(1f1tb + 2f2tb,...)*1t))

*/