import { Sequential } from "../src/models/sequential";
import { Dense, Activation } from "../src/layers";
import { Input, Output, Flatten } from "../src/layers";
import { Reshape } from "../src/layers/reshape";


let model = new Sequential();
model.add(new Input([2,2]));
model.add(new Activation('relu'));
model.add(new Flatten());
model.add(new Reshape([4,1]));
model.add(new Flatten());
model.add(new Dense(2,{activation: 'sigmoid'}));

model.add(new Output(1));

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
