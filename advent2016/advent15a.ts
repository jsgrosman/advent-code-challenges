const d1 = (t: number) => {
    return (t+5) % 17 === 0;
}

const d2 = (t: number) => {
    return (t+8) % 19 === 0;
}

const d3 = (t: number) => {
    return (t+1) % 7 === 0;
}

const d4 = (t: number) => {
    return (t+7) % 13 === 0;
}

const d5 = (t: number) => {
    return (t+1) % 5 === 0;
}

const d6 = (t: number) => {
    return (t+3) % 3 === 0;
}

const d7 = (t: number) => {
    return (t+0) % 11 === 0;
}

// const d1 = (t: number) => {
//     return (t+4) % 5 === 0;
// }

// const d2 = (t: number) => {
//     return (t+1) % 2 === 0;
// }

let t = 1;
while (true) {
    if (d1(t+1) && d2(t+2) && d3(t+3) && d4(t+4) && d5(t+5) && d6(t+6) && d7(t+7)) {
        console.log(`time: ${t}`);
        break;
    }

    t++;
}
