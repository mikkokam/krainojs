### Image classification: cat or dog?

Install parcel-bundler first: `npm install -g parcel-bundler`.

then, run `parcel index.html` in this directory. Leave it running.
Open Chrome and point it at http://localhost:1234/dist/index.html
Please note that http://localhost:1234 will **not** work - it won't have access to the images.

Open developer tools - console to see the output.

Edit `img.ts` in this folder to test different scenarios and models.

For example; you could edit 
* the amount of samples, 
* the model layers and their parameters, 
* the optimizer and its parameters, 
* the fit parameters (training).

You can train more after the first training. The results might improve with more training.
If the loss (error) gets stuck above 0.4, Reset and build the model, then train again. More training will not help for a network gone wrong.

Please note that the parameters and the model for this demo are WIP, not very optimal defaults yet...

The sample size is also very low now. A larger sample size requires more parameter tuning. Nevertheless, already these settings seem to sometimes predict quite well the two images fed to the network when you hit Predict.

### Utils to help with images

Gradually Kraino should have more utilities for preprocessing images, sound and text. 
Now, there is a simple helper for preprocessing images; to extract pixel data and normalize it.
This should be expanded to support streaming of images for a more performant solution for large amounts of images.