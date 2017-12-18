interface Options{
    learningRate?:number,
    beta1?:number,
    beta2?:number,
    gamma?:number
    momentum?:number
}

export class Optimizer{

    static types = [
        'SGD',
        'Adagrad',
        'Adadelta',
        'Adam',
        'Adamax',
        'Momentum'
    ];

    public type: string = 'SGD';
    
    public options:Options = {
        learningRate: 0.1,
        beta1: 0.9,
        beta2: 0.999,
        gamma: 0.1,
        momentum: 0.1,
    }

    constructor(
        type?: string,
        options?: Options 
    ){
        if(!!type && Optimizer.types.map(o => o.toUpperCase()).indexOf(type.toUpperCase()) === -1) throw(`Unknown type '${type}'`);
        if(!!type) this.type = type;

        // Merge with defaults
        this.options = {...this.options, ...options};
    }
}