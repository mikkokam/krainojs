import { Sequential, Layers, Optimizers, Losses } from '../../../src'; 
import { Utils } from '../../../src/utils';
import { Array3D, NDArray } from 'deeplearn/dist/math/ndarray';

// import * as Kraino from '../../dist';

// let Layers = Kraino.Layers;
// let Sequential = Kraino.Sequential;
// let Utils = Kraino.Utils;

let model = new Sequential();
model.add(Layers.input([64,64,3]));
model.add(Layers.conv2D(6, {outputDepth: 8, stride: 4, zeroPad: 1}));
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
// samples (dogs / cats) to load
let samples = 200;

console.clear();
console.log(`Loading ${samples} samples each. Please wait...`);
for (let i=0; i < samples; i++){
    urls.cats.push(`dist/train/cat.${i}.jpg`);
    targets.push([1,0]); // cat
}
for (let i=0; i < samples; i++){
    urls.dogs.push(`dist/train/dog.${i}.jpg`);
    targets.push([0,1]); // dog
}
// Load cats
console.log('Loading cats...');

Utils.loadImages(urls.cats, [64,64,3])
.then(imgs => {
    console.log('Cats OK. Loading dogs...');
    images = imgs;
    // Load dogs
    return Utils.loadImages(urls.dogs, [64,64,3])
})
.then(imgs => {
    // Add dogs
    images = images.concat(imgs);
    console.log('Dogs OK. Now you can Reset and build model.');
});

let compiled = false;
let trained = false;


// Bind functions to UI demo buttons
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
    let randomId = samples + Math.round(Math.random() * (12000-samples));
    console.log('%c\nLoading a cat img not seen in training.','color: purple');
    Utils.loadImage(`dist/train/cat.${randomId}.jpg`,[64,64,3])
    .then(img =>{
        console.log('Predicting...');
        displayImg(img, 'pic1');
        return model.predict({input: img})
    })
    .then(res => {
        console.log('Result: ',res);
        displayResult(res,'label1');
        console.log(`The network thinks it is ${Math.round(res[0]*100)}% cat, ${Math.round(res[1]*100)}% dog.`);

        let randomId = samples + Math.round(Math.random() * (12000-samples));
        console.log('%c\nLoading a dog img not seen in training.', 'color: green');
        Utils.loadImage(`dist/train/dog.${randomId}.jpg`,[64,64,3])
        .then(img =>{
            console.log('Predicting...');
            displayImg(img, 'pic2');
            return model.predict({input: img})
        })
        .then(res => {
            console.log('Result: ',res);
            displayResult(res,'label2');
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
        epochs: 100,
        //batchSize: 10,
        targetLoss: 0.01,
        log: 10
    })
    .then(() => {
        trained = true;
        console.log('Training OK, you can train more or Predict now.');
    })
}

// Helper to display Array3D data on a canvas
function displayImg(img:NDArray, canvasId:string):void{
    let c:any = document.getElementById(canvasId);
    let ctx = c.getContext("2d");
    let imgData = ctx.createImageData(64,64);
    let arr:any = img.dataSync();
    let i = -1;
    let j = -1;
    // Add alpha channel
    imgData.data.forEach(val => {
        j++;
        if (j === 0 || ((j+1)%4 !== 0)){
            i++;
            imgData.data[j] = arr[i] || 0;
        } else {
            imgData.data[j] = 255;
        }
    });
    ctx.putImageData(imgData,0,0);
}

// Helper to display labels
function displayResult(res:any, labelId:string):void{
    if(res[0] > res[1])
        document.getElementById(labelId).innerText = `${Math.round(res[0]*100)}% cat`;
    else
        document.getElementById(labelId).innerText = `${Math.round(res[1]*100)}% dog`;
}