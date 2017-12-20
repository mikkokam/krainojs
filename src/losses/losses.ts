export interface Loss{
    type: string,
    options?: any
}
export class Losses{

    public static types = ['meanSquared','softmaxCrossEntropy'];
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

    
    static meanSquared():Loss{
        let loss = {
            type: 'meanSquared'
        }
        return loss;
    }
    static softmaxCrossEntropy():Loss{
        let loss = {
            type: 'softmaxCrossEntropy'
        }
        return loss;
    }
}