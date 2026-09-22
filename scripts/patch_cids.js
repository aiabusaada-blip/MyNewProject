const fs = require('fs');
let content = fs.readFileSync('lib/graph/seed-data.ts', 'utf8');

const catMap = {
  'v1': 'c1', 'v2': 'c4', 'v3': 'c3', 'v4': 'c2', 'v5': 'c39',
  'v6': 'c17', 'v7': 'c3', 'v8': 'c17', 'v9': 'c17', 'v10': 'c7',
  'v11': 'c7', 'v12': 'c6', 'v13': 'c1', 'v14': 'c1', 'v15': 'c8',
  'v16': 'c11', 'v17': 'c9', 'v18': 'c9', 'v19': 'c9', 'v20': 'c23',
  'v21': 'c19', 'v22': 'c19', 'v23': 'c19', 'v24': 'c19', 'v25': 'c19'
};

let patched = 0;
Object.entries(catMap).forEach(([vid, cid]) => {
  const old = 'vendor_id: "' + vid + '", name:';
  const re = new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
  if (re.test(content)) {
    content = content.replace(re, 'vendor_id: "' + vid + '", category_id: "' + cid + '", name:');
    patched++;
  }
});
fs.writeFileSync('lib/graph/seed-data.ts', content);
console.log('Patched', patched, 'vendor groups');
