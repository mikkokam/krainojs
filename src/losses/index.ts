export interface LossOptions{
    target: any // for softmaxCrossEntropyCost; the target Tensor ---- TODO: add support for this in compile !
}
export class Loss{

    static types = [
        'meanSquared',
        'softmaxCrossEntropy'
    ];
        // NOT AVAILABLE IN DEAPLEARN.JS YET:
        // 'meanAbsoluteError', 
        // 'meanAbsolutePercentageError',
        // 'meanSquaredLogarithmicError',
        // 'squaredHinge',
        // 'hinge',
        // 'categoricalHinge',
        // 'logcosh',
        // 'categorical_crossentropy',
        // 'sparse_categorical_crossentropy',
        // 'binary_crossentropy',
        // 'kullback_leibler_divergence',
        // 'poisson',
        // 'cosine_proximity'

    public type: string;
    public options: LossOptions;
    
    constructor(type: string, options?: LossOptions){
        if(Loss.types.map(t => t.toUpperCase()).indexOf(type.toUpperCase()) === -1) throw(`Unknown type ${type}`);
        this.type = type;
    }
}