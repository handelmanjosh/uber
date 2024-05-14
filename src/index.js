const { exec } = require("child_process");

// every time you run the script a Mcdonalds water is sent to my house. 
// Please don't run it
async function McWater() {
    // Create new order with McWater from McDonalds
    const scriptPath = './requests/createDraftOrder.sh';
    const response = await new Promise((resolve, reject) => {
        exec(`sh ${scriptPath}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing script: ${error.message}`);
                reject(error.message);
            }
            if (stderr) {
                console.error(`Script error output: ${stderr}`);
            }
            if (stdout) {
                resolve(stdout);
            }
        })
    });
    const json = JSON.parse(response);
    console.log(json);
    // return order uuid
    return json.data.draftOrder.uuid;
}
async function Order(uuid) {
    const scriptPath = "./requests/checkoutDraftOrder.sh";
    const response = await new Promise((resolve, reject) => {
        exec(`sh ${scriptPath} ${uuid}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing script: ${error.message}`)
                reject(error.message)
            }
            if (stderr) {
                console.error(`Script error output: ${stderr}`);
            }
            if (stdout) {
                resolve(stdout);
            }
        })
    });
    console.log(response);
}
async function main() {
    const uuid = await McWater();
    console.log({uuid});
    await Order(uuid);
}


main();