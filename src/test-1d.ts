import { Sequential } from "./models/sequential";
import { Layer, Dense, Activation, MaxPooling2D, Input, Output } from "./layers";


let model = new Sequential();
model.add(new Input(2));
model.add(new Dense(32,{activation: 'relu'}));// test Activation in layer definition
model.add(new Dense(16)); // Test one with a separate Activation layer
model.add(new Activation('relu'));
model.add(new Output(1));

console.log(model);

model.compile({
    optimizer: 'Adamax',
    loss: 'meanSquared'
});


model.fit({
    input: [[0,0],[0,1],[1,0],[1,1]],
    target: [[0],[1],[1],[1]],
    epochs: 500
})
.then(() => {
    return model.predict({
        input: [0,1]
    })
})
.then(res => {
    console.log('done',res);
})

