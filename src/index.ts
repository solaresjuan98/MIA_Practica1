import {App} from './app'
//const 

async function main() {
    
    const app = new App(4000);
    await app.listen();

}


main();