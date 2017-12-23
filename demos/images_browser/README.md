### Image classification: cat or dog?

Install parcel-bundler first: `npm install -g parcel-bundler`.

then, run `parcel index.html` in this directory. Leave it running.
Open Chrome and point it at http://localhost:1234/dist/index.html
Please note that http://localhost:1234 will **not** work - it won't have access to the train images.

Open developer tools - console to see the output.

Edit with img.ts in this folder to test different scenarios and models.

Especially; you can edit 
the amount of samples, 
the model layers and their parameters, 
the optimizer and its parameters, 
the fit parameters (training).