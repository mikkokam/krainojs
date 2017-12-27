# Kraino.js

A Keras-like API for deeplearn.js.

Developer friendly GPU accelerated deep learning for the browser.

Kraino is a high-level neural networks API, written in Typescript and capable of running on top of Deeplearn.js now, others later.
Like Keras, Kraino is an API designed for human beings, not machines. It puts developer experience first. Aiming to reduce cognitive load, Kraino offers a consistent and simple API with sensible defaults you can override easily.

**Work in progress.** See docs folder for more info.

**Please do not use the dist folder version yet.**
Instead, clone everything and test the demos first.
Demos have README's to help you test things out.

Package.json has some npm scripts to help with development:

`npm run test`  - Jasmine tests with Karma

`npm run clean` - Clean the dist folder

`npm run watch` - Build with Parcel bundler

`npm run docs`  - Rebuild documentation with Typedoc

### Getting started

The core data structure of Kraino is a model consisting of layers. The first type of model implemented is the Sequential model, a linear stack of layers. More complex architectures will be added later.


```
import { Layers, Sequential } from 'Kraino';

// Build a model
let model = new Sequential();
model.add(Layers.input(2));
model.add(Layers.dense(16));
model.add(Layers.output(1));

// Compile the corresponding deeplearn.js model with default values - skip coding all the MathGPU hassle of deeplearn.js...
model.compile();

// Train it to predict XOR
model.fit({
    input: [ [0,0], [0,1], [1,0], [1,1] ],
    target: [ [0], [1], [1], [0] ],
    epochs: 100
})
.then(() => {
    // Predict with it
    return model.predict({
        input: [0,1]
    })
})
.then(res => {
    console.log('Done, result:', res);
})
```

You can create many types of layers already: activation, convolutional, dense, flatten, input, max pooling, output, and reshape.

Activations supported include: Linear, Softmax, ReLU, LeakyReLU, ELU, Tanh, and Sigmoid.

You can override the default sgd optimizer with an adagrad, adadelta, adam, adamax, or momentum optimizer.

All of these aim to have sensible defaults (you can omit parameters). Overriding is meant to be as easy as providing just the options you need:

```
model.compile();
// Or
model.compile({
    optimizer: Optimizers.adadelta()
});
// or
model.compile({
    optimizer: Optimizers.adadelta({
        learningRate: 0.1,
        gamma: 0.1
    }),
    loss: Losses.meanSquared()
});
```


  