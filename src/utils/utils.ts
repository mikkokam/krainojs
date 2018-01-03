import { Array3D, ENV } from 'deeplearn';


/**
 * BROWSER utils to load and manipulate images, text and numbers.
 */
export class Utils{
    /**
     * Load image as a typed Array (Float32Array): a normalized (0...1) Array of RGB values.
     * @param url The url of the image to load.
     * @param shape An Array of the output image dimensions: [x,y,channels] - i.e. [64,64,3] means fit in 64x64 px, and output only RGB values (skip Alpha channel).
     * @returns An Array of the normalized pixel RGB values.
     */
    static async loadImage(url, shape: number[]): Promise<any>{
        return new Promise((resolve, reject) => {
            let img = new Image();   // Create new img element
            img.addEventListener('load', () => {
                resolve(ENV.math.resizeBilinear3D(Array3D.fromPixels(img), [shape[0], shape[1]]));
            }, false);
            img.src = url;
        });

        // TODO: add black&white (1 channel) option and grayscale option
    }
    /**
     * Load many images as an Array of typed Arrays (Float32Array[]) - see loadImage().
     * You can then easily use the images to train a model:
     *  <pre>import { Utils } from 'Kranio/utils';
     *  // set up model with an input of shape [32,32,3] first, then:
     *  Utils.loadImages(['/imgs/0.jpg','/imgs/1.jpg','imgs/2.jpg'], [32,32,3])
     *  .then( images => {
     *      model.fit({
     *          input: images,
     *          target: [[0,1], [1,0], [1,1]] // some target values or label Arrays
     *      });
     *  })</pre>
     * @param urls An Array of the url's to load: ['http://somedomain.com/img/someimage.jpg', 'subdir/img.png']
     * @param shape An Array of the output image dimensions: [x,y,channels] - i.e. [64,64,3] means fit in 64x64 px, and output only RGB values (skip Alpha channel).
     * @returns An Array of the images. Each image is an Array of the normalized (0...1) pixel RGB values.
     */
    static async loadImages(urls: string[], shape: number[]){
        return Promise.all(urls.map(url => Utils.loadImage(url, shape)));
    }
}