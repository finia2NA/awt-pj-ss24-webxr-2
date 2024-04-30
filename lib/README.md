# DVBIlib
*A library allowing for retrieval and parsing of DVBI service descriptions*

- The name can be changed if for example libDVBI is deemed to sound nicer :)

## Getting Started
The project was created following [this](https://www.tsmean.com/articles/how-to-write-a-typescript-library/) tutorial.  

To get started:
- Install the dependencies with `npm i`.
- Create a `config.json` file in the `src` directory and fill out the values.
  - Use the `config.example.json` as a guide.

You can:
- Expose functions you want to be exported from the module by exporting them from the `index.ts` file
- Write tests for parts of the application using jest, in any folder named "tests". Run these tests using `npm test`.
  - There is an example test written for "hello world", which you can take a look at


## Notes
- Right now, only hello world is implemented. I put this here to test the testing and CI. When we actually have working functionality, we can of course remove this.