import { Sequential } from "../src/models/sequential";
import { Layers } from "../src/layers";


let model = new Sequential();
model.add(Layers.input([2,2]));
model.add(Layers.activation('relu'));
model.add(Layers.flatten());
model.add(Layers.reshape([4,1]));
model.add(Layers.flatten());
model.add(Layers.dense(2,{activation: 'sigmoid'}));

model.add(Layers.output(1));

console.log(model);

model.compile({
    optimizer: 'Adamax',
    loss: 'meanSquared'
});

model.fit({
    input: [
        [[0,0],[0,1]],
        [[1,0],[1,1]]
    ],
    target: [
        [0],
        [1]
    ],
    epochs: 500
})
.then(() => {
    return model.predict({
        input: [[1,0],[1,1]]
    })
})
.then(res => {
    console.log('done',res);
})

