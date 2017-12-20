import { Sequential, Layers, Optimizers, Losses } from '../src'; 

let model = new Sequential();

model.add(Layers.input(2));
model.add(Layers.dense(16,{activation: 'relu'}));// test Activation in layer definition
model.add(Layers.dense(8)); // Test one with a separate Activation layer
model.add(Layers.activation('relu'));
model.add(Layers.output(1));

model.compile();

model.fit({
    input: [[0,0],[0,1],[1,0],[1,1]],
    target: [[0],[1],[1],[1]],
    epochs: 500,
    log: 25
})
.then(() => {
    return model.predict({
        input: [0,1]
    })
})
.then(res => {
    console.log('done',res);
})

