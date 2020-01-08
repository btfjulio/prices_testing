
module.exports = {
    sleep: async (miliseconds) => {
        return new Promise(resolve => setTimeout(resolve, miliseconds));
    }
} 
