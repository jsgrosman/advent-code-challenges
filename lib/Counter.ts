export default class Counter<T> {

    private counter: Map<T, number>;

    constructor() {
       this.counter = new Map<T, number>(); 
    }
    
    public increment(key: T, value: number = 1) {
        if (this.counter.has(key)) {
            this.counter.set(key, this.counter.get(key)! + value);
        } else {
            this.counter.set(key, value);
        }
    }
    public decrement(key: T, value: number = 1) {
        if (this.counter.has(key)) {
            this.counter.set(key, this.counter.get(key)! - value);
        } else {
            this.counter.set(key, 0 - value);
        }
    }

    public remove(key: T) {
        this.counter.delete(key);
    }

    public getValue(key: T) {
        return this.counter.get(key);
    }

    public getSum() {
        return Array.from(this.counter.values()).reduce( (p,v) => p + v);
    }

    public getMax() {
        let max = 0;
        let maxKey: T|null = null;
        for (const [key, value] of this.counter.entries()) {
            if (value > max) {
                maxKey = key;
                max = value;
            }
        }

        return maxKey;
    }

    public getMin() {
        let min = Number.MAX_SAFE_INTEGER;
        let minKey: T|null = null;
        for (const [key, value] of this.counter.entries()) {
            if (value < min) {
                minKey = key;
                min = value;
            }
        }

        return minKey;
    }

    public sort() {
        this.counter = new Map([...this.counter.entries()].sort((a, b) => b[1] - a[1]));
    }

    public getValues() {
        return Array.from(this.counter.values());
    }
}