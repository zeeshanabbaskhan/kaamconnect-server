const fs = require('fs');
const path = require('path');

const logPath = 'C:\\Users\\Zeeshan Abbas\\.gemini\\antigravity\\brain\\4abc1615-a645-4927-ac3c-c9afbc03a562\\.system_generated\\logs\\overview.txt';
const lines = fs.readFileSync(logPath, 'utf8').split('\n');

let found = 0;
for (const line of lines) {
  if (!line.includes('write_to_file')) continue;
  
  try {
    const parsed = JSON.parse(line);
    if (!parsed.tool_calls) continue;
    
    for (const tc of parsed.tool_calls) {
      if (tc.name === 'write_to_file' || tc.name === 'default_api:write_to_file') {
        const args = typeof tc.args_json === 'string' ? JSON.parse(tc.args_json) : (typeof tc.args === 'string' ? JSON.parse(tc.args) : tc.args);
        
        if (args && args.TargetFile && args.CodeContent) {
           const tf = args.TargetFile;
           if (tf.includes('src') && tf.endsWith('.js')) {
             console.log('Restoring', tf);
             fs.mkdirSync(path.dirname(tf), { recursive: true });
             fs.writeFileSync(tf, args.CodeContent);
             found++;
           }
        }
      }
    }
  } catch(e) {
  }
}

console.log('Restored files:', found);
