import 'jimp/browser/lib/jimp.min';
declare var Jimp: any;

export class Utils{
    /**
     * Load image as a typed (Float32Array), normalized (0...1) Array of RGB values.
     * @param url The url of the image to load.
     * @param shape An Array of the output image dimensions: [x,y,channels] - i.e. [64,64,3] means fit in 64x64 px, and output only RGB values (skip Alpha channel).
     * @returns 1D Array of the normalized pixel RGB values.
     */
    static async loadImage(url, shape: number[]): Promise<Float32Array>{
        return Jimp.read(url)
        .then(img => {
            return img.contain(shape[0], shape[1]);
        })
        .then(img => {
            let data = new Float32Array(img.bitmap.data);
            // TODO: shape 1 = b/w
            if(shape[2] == 4) return data;
            let i=-1;
            // normalize and drop alpha channel (rgba --> rgb)
            return data.map(el => el/255).filter(el => {
                i++;
                return (i>0 && i % 4 !== 0);
            });
        })
    }
    /**
     * Load many images as a an Array of typed (Float32Array), normalized (0...1) Array of RGB values.
     * @param urls An Array of the url's to load: ['http://somedomain.com/img/someimage.jpg','subdir/img.png']
     * @param shape An Array of the output image dimensions: [x,y,channels] - i.e. [64,64,3] means fit in 64x64 px, and output only RGB values (skip Alpha channel).
     * @returns An Array of the images. Each image is a 1D Array of the normalized (0...1) pixel RGB values.
     */
    static async loadImages(urls: string[], shape: number[]){
        return Promise.all(urls.map(url => Utils.loadImage(url, shape)));
    }
}