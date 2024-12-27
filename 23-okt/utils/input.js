import readline from 'node:readline';

export default function input(msg) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve, reject) => {
        rl.question(msg, (userInput) => {
            resolve(userInput);
            rl.close();
        });
    });
}
