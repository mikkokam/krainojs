export interface Layer {
    type: string;
    units: number | number[];
    options?: any;
    activation?: string | Layer;
}

export class Layers{
    public static types = ['activation','conv2D','dense','flatten','input','maxPooling2D','output','reshape'];
    public static activations = ['Linear','Softmax','ReLU','LeakyReLU','ELU','Tanh','Sigmoid'];
    
    static activation(activation: string, options?: { alpha: number }):Layer {
        if(!!activation && Layers.activations.map(o => o.toUpperCase()).indexOf(activation.toUpperCase()) === -1) throw(`Unknown activation '${activation}'`);
        let layer:Layer = {
            units: undefined,
            type: 'activation',
            activation: activation,
            options: { alpha: 0.3 }
        };
        // Merge options with defaults
        layer.options = {...layer.options, ...options};
        return layer;
    }

    static conv2D(
        fieldSize: number,
        options: { outputDepth: number, stride: number, zeroPad: number }
    ):Layer {
        let layer:Layer = {
            units: fieldSize,
            type: 'conv2D',
            options: { outputDepth: 1, stride: 1, zeroPad: 0 }
        };
        layer.options = {...layer.options, ...options};
        return layer;
    }

    static dense(units: number, options?: {activation: string | Layer}):Layer {
        let layer:Layer = {
            units: units, type: 'dense', 
            options: { activation: 'linear' }
        };
        layer.options = {...layer.options, ...options};
        layer.options.activation = (typeof(layer.options.activation) == 'string') ? Layers.activation(layer.options.activation) : layer.options.activation;
        return layer;
    }

    static flatten():Layer {
        let layer:Layer = { units: undefined, type: 'flatten' };
        return layer;
    }

    static input(units: number | number[] ):Layer {
        let layer:Layer = { units: units, type: 'input' };
        if(!Array.isArray(layer.units)) layer.units = [layer.units];
        return layer;
    }

    static maxPooling2D(
        fieldSize:number,
        options?: { stride?: number, zeroPad?: number }
    ):Layer {
        let layer:Layer = {
            units: fieldSize,
            type: 'maxPooling2D',
            options: { stride: 1, zeroPad: 0 }
        };
        layer.options = {...layer.options, ...options};
        return layer;
    }

    static output(units: number | number[] ){
        let layer:Layer = { units: units, type: 'output' };
        if(!Array.isArray(layer.units)) layer.units = [layer.units];
        return layer;
    }

    static reshape(outputShape:number[]){
        let layer:Layer = {
            units: outputShape,
            type: 'reshape',
        };
        return layer;
    }

}