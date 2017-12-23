import { Sequential, Layers, Optimizers, Losses } from '../src'; 

let model = new Sequential();
model.add(Layers.input([4,4,1]));
model.add(Layers.activation('relu'));
model.add(Layers.conv2D(2,{outputDepth: 8}));
model.add(Layers.activation('relu'));
model.add(Layers.maxPooling2D(2));
model.add(Layers.flatten());
model.add(Layers.activation('relu'));
model.add(Layers.output(2));
model.add(Layers.activation('softmax'));

console.log(model);

model.compile({
    optimizer: Optimizers.adamax(),
    loss: Losses.meanSquared()
});

model.fit({
    input: [
        [[[0],[0],[0],[0]],[[0],[1],[0],[1]],[[0],[0],[0],[0]],[[0],[1],[0],[1]]],
        [[[1],[0],[1],[0]],[[1],[1],[1],[1]],[[1],[0],[1],[0]],[[1],[1],[1],[1]]]
    ],
    target: [
        [0,1],
        [1,0]
    ],
    epochs: 100
})
.then(() => {
    return model.predict({
        input: [[[0],[0],[0],[0]],[[0],[1],[0],[1]],[[0],[0],[0],[0]],[[0],[1],[0],[1]]],
    })
})
.then(res => {
    console.log('done',res);
})

