const fs = require('fs');
const path = require('path');

try {
    require('./server/index.js');
} catch (error) {
    const errorLogPath = path.join(__dirname, 'startup_error.log');
    const errorMessage = `[${new Date().toISOString()}] Startup Error: ${error.stack || error}\n`;
    fs.writeFileSync(errorLogPath, errorMessage, { flag: 'a' });
    console.error(errorMessage);
    process.exit(1);
}
