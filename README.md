## Instructions

To install on your computer, clone the repository and install
dependencies.

```bash
$ git clone https://gitlab.com/torakku/torakku_1.0.0.git
$ cd Torakku
$ npm install
$ bower install
```

Start the server.

```bash
$ node app.js
```

Open a web browser and navigate to [http://localhost:3002/](http://127.0.0.1:3002/)
to see the example in action.  Log in using the following details.

Mentee: username `jack` and password `secret`.
Mentor: username `john` and password `secret`.
Mentee: username `jill` and password `secret`.


```bash
To make sure the following error does not show up, follow the instruction below:

Error:
Cannot find module '../build/Release/bson'] code: 'MODULE_NOT_FOUND' } js-bson: Failed to load c++ bson extension, using pure JS version

Instruction:
1. Search in your workspace for the text: `"../build/Release/bson"`
2. Replace `bson = require('../build/Release/bson');` with `bson = require('bson');`
```