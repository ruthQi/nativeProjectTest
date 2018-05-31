'use strict';

const fs = require('fs-extra');
const child_process = require('child_process');

const entry = './index.js'
const bundleOutputDir = './dist/android/assets';
const bundleOutput = bundleOutputDir + '/index.android.bundle';
const assetsDest = './dist/android/res';


fs.removeSync(bundleOutputDir);
fs.removeSync(assetsDest);
console.log(`删除目录：`, bundleOutputDir, assetsDest);

fs.mkdirsSync(bundleOutputDir);
fs.mkdirsSync(assetsDest);
console.log(`创建目录：`, bundleOutputDir, assetsDest);

child_process.exec(`react-native bundle --platform android --dev false --entry-file ${entry} --bundle-output ${bundleOutput} --assets-dest ${assetsDest}`,
   (error, stdout, stderr) => {
      if (error) {
         console.error(`exec error: ${error}`);
         return;
      }
      console.log(`${stdout}`);
      console.log(`${stderr}`);
   });