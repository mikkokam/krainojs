import { Sequential, Layers, Optimizers, Losses } from '../src'; 

let model = new Sequential();

model.add(Layers.input(2));
model.add(Layers.dense(16,{activation: 'relu'}));// test Activation in layer definition
model.add(Layers.dense(10)); // Test one with a separate Activation layer
model.add(Layers.activation('relu'));
model.add(Layers.output(1));

model.compile();

model.fit({
    input: [[0,0],[0,1],[1,0],[1,1]],
    target: [[0],[1],[1],[1]],
    epochs: 100,
    log: 25
})
.then(() => {
    // Can continue training the same network
    return model.fit({
        input: [[0,0],[0,1],[1,0],[1,1]],
        target: [[0],[1],[1],[1]],
        epochs: 600,
        log: 25,
        targetLoss: 0.0001
    });
})
.then(() => {
    return model.predict({
        input: [0,1]
    })
})
.then(res => {
    console.log('done',res);
})