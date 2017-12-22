import { Sequential, Layers, Optimizers, Losses } from '../src'; 
import { Utils } from '../src/utils';


let model = new Sequential();
model.add(Layers.input([64,64,3]));
model.add(Layers.conv2D(5,{outputDepth: 8, stride: 1, zeroPad: 2}));
model.add(Layers.activation('relu'));
model.add(Layers.maxPooling2D(2, {stride: 2, zeroPad: 0}));
model.add(Layers.conv2D(5,{outputDepth: 16, stride: 1, zeroPad: 2}));
model.add(Layers.activation('relu'));
model.add(Layers.maxPooling2D(2, {stride: 2, zeroPad: 0}));
model.add(Layers.flatten());
model.add(Layers.output(2));

let images = [];

Utils.loadImages([
    'dist/0a37bf4244289d7f0b9579fcde44cd89.jpg',
    'dist/653677c3c39ddfd80f8894fcaff219f1.png'
    ],
    [64,64,3]
).then(imgs => {
    images = imgs;
})

window["reset"] = () => {
    model.compile({
        optimizer: Optimizers.adadelta({learningRate: 0.03}),
        loss: Losses.meanSquared()
    });
}
window["predict"] = () => {
    Utils.loadImage('dist/0a37bf4244289d7f0b9579fcde44cd89.jpg',[64,64,3])
    .then(img =>{
        return model.predict({input: img})
    })
    .then(res => {
        console.log('done',res);
    })
}

window["fit"] = () => {
    model.fit({
        input: images,
        target: [[0,1], [1,0]],
        epochs: 100,
        batchSize: 2,
        targetLoss: 0.01
    })
}