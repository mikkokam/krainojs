import { Sequential, Layers, Optimizers, Losses } from '../../src'; 
import { Utils } from '../../src/utils';

// import * as Kraino from '../../dist';

// let Layers = Kraino.Layers;
// let Sequential = Kraino.Sequential;
// let Utils = Kraino.Utils;

let model = new Sequential();
model.add(Layers.input([32,32,3]));
model.add(Layers.conv2D(3,{outputDepth: 8, stride: 3, zeroPad: 2}));
model.add(Layers.activation('relu'));
model.add(Layers.maxPooling2D(2, {stride: 2, zeroPad: 0}));
model.add(Layers.conv2D(3,{outputDepth: 16, stride: 1, zeroPad: 2}));
model.add(Layers.activation('relu'));
model.add(Layers.maxPooling2D(2, {stride: 2, zeroPad: 0}));
model.add(Layers.flatten());
model.add(Layers.output(2));
model.add(Layers.activation('softmax'));

let urls = {cats: [], dogs: []};
let images = [];
let targets = [];
let samples = 50;

console.clear();
console.log(`Loading ${samples} samples each. Please wait...`);
for (let i=0; i < samples; i++){
    urls.cats.push(`train/cat.${i}.jpg`);
    targets.push([1,0]); // cat
}
for (let i=0; i < samples; i++){
    urls.dogs.push(`train/dog.${i}.jpg`);
    targets.push([0,1]); // dog
}
// Load cats
console.log('Loading cats...');
Utils.loadImages(urls.cats, [32,32,3])
.then(imgs => {
    console.log('Cats OK. Loading dogs...');
    images = imgs;
    // Load dogs
    return Utils.loadImages(urls.dogs, [32,32,3])
})
.then(imgs => {
    // Add dogs
    images = images.concat(imgs);
    console.log('Dogs OK. Now you can Reset and build model.');
});

let compiled = false;
let trained = false;

window["reset"] = () => {
    model.compile({
        optimizer: Optimizers.adam(),
        loss: Losses.softmaxCrossEntropy()
    });
    compiled = true;
    console.log('Model OK, Untrained. You can train now.');
}
window["predict"] = () => {
    if(!trained) {
        console.log('Please train first');
        return;
    }
    console.log('%c\nLoading a cat.','color: purple');
    Utils.loadImage('train/cat.2000.jpg',[32,32,3])
    .then(img =>{
        console.log('Predicting...');
        return model.predict({input: img})
    })
    .then(res => {
        console.log('Result: ',res);
        console.log(`The network thinks it is ${Math.round(res[0]*100)}% cat, ${Math.round(res[1]*100)}% dog.`);
        console.log('%c\nLoading a dog.', 'color: green');
        Utils.loadImage('train/dog.2000.jpg',[32,32,3])
        .then(img =>{
            console.log('Predicting...');
            return model.predict({input: img})
        })
        .then(res => {
            console.log('Result: ',res);
            console.log(`The network thinks it is ${Math.round(res[0]*100)}% cat, ${Math.round(res[1]*100)}% dog.\n`);
        })
    })
}

window["fit"] = () => {
    if(!compiled) {
        console.log('Please reset and build model first');
        return;
    }
    console.log('Training model, please wait...');
    model.fit({
        input: images,
        target: targets,
        epochs: 400,
        batchSize: 10,
        targetLoss: 0.01
    })
    .then(() => {
        trained = true;
        console.log('Training OK, you can train more or Predict now.');
    })
}