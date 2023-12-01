// Extended Euclidean Algorithm
// Given two numbers a and b, find their greatest common divisor (GCD) and coefficients x, y such that ax + by = GCD.
function extendedGCD(a: number, b: number): [number, number, number] {
    if (a === 0) {
        // If a is 0, the GCD is b, and x, y are 0 and 1, respectively.
        return [b, 0, 1];
    } else {
        // Recursively apply the extended GCD algorithm.
        const [g, x, y] = extendedGCD(b % a, a);
        // Return GCD and coefficients for the current step.
        return [g, y - Math.floor(b / a) * x, x];
    }
}

// Modular Inverse
// Given a number a and a modulus m, find the modular inverse of a (if it exists) such that (a * x) % m = 1.
function modInverse(a: number, m: number): number {
    // Use the extended GCD to find coefficients x, y such that (a * x) + (m * y) = 1.
    const [g, x] = extendedGCD(a, m);
    // If the GCD is not 1, the modular inverse does not exist.
    if (g !== 1) {
        throw new Error('Modular inverse does not exist');
    } else {
        // Ensure the result is non-negative by adding m and taking the modulo.
        return (x % m + m) % m;
    }
}

// Chinese Remainder Theorem
// Given a set of divisors and corresponding remainders, find a number that satisfies all modular congruences.
function chineseRemainderTheorem(modules: number[], remainders: number[]): number {
    // Check if the number of modules and remainders is the same.
    if (modules.length !== remainders.length) {
        throw new Error('Number of modules and remainders must be the same');
    }

    // Calculate the product of all divisors.
    const N = modules.reduce((product, mod) => product * mod, 1);

    let result = 0;
    // Apply the Chinese Remainder Theorem formula to find the solution.
    for (let i = 0; i < modules.length; i++) {
        const ni = N / modules[i];
        const ai = remainders[i];
        // Calculate the modular inverse of ni modulo the current divisor.
        const mi = modInverse(ni, modules[i]);
        // Accumulate the partial results.
        result += ai * ni * mi;
    }

    // Ensure the result is non-negative by taking the modulo of the product.
    return result % N;
}

// Example usage:
const modules = [5, 2];
const remainders = [1, 0];

const result = chineseRemainderTheorem(modules, remainders);
console.log(`The solution is ${result}`);
