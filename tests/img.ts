import { Sequential, Layers, Optimizers, Losses } from '../src'; 

//import * as Jimp from 'jimp';
declare var Jimp: any;

let imgs = [];

function addImage(url){
    return Jimp.read(url)
    .then(img => {
        return img.resize(64, Jimp.AUTO);
    })
    .then(img => {
        let data = new Uint8Array(img.bitmap.data);
        let i=-1;
        // normalize and drop alpha channel (rgba --> rgb)
        return data.map(el => el/255).filter(el => {
            i++;
            return (i>0 && i % 4 !== 0);
        });
    })
}
addImage('dist/0a37bf4244289d7f0b9579fcde44cd89.jpg')
.then(img => {
    imgs[0] = img;
    console.log('0',imgs[0].length);
    return addImage('dist/653677c3c39ddfd80f8894fcaff219f1.png')
})
.then(img => {
    imgs[1] = img;
    console.log('1',imgs[1].length);

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
    
    console.log(model);
    
    model.compile({
        optimizer: Optimizers.adadelta({learningRate: 0.05}),
        loss: Losses.meanSquared()
    });
    
    model.fit({
        input: imgs,
        target: [
            [0,1],
            [1,0]
        ],
        epochs: 200,
        batchSize: 1
    })
    .then(() => {
        return model.predict({
            input: imgs[0],
        })
    })
    .then(res => {
        console.log('done',res);
    })
    
})


