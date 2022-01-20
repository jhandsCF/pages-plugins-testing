#!/usr/bin/env node

const glob = require("glob");
const { resolve, dirname, join } = require("path");
const { readFileSync, cpSync } = require("fs");
const { argv } = require("process");

const getPackages = () => {
  return glob.sync("./node_modules/**/package.json").map((packageJSON) => ({
    filePath: resolve(packageJSON),
    contents: JSON.parse(readFileSync(packageJSON)),
  }));
};

const main = () => {
  const packagesWithAssets = getPackages().filter(
    (packageJSON) => packageJSON.contents.directories?.assets
  );

  const pluginsAssetsDirectory = join(
    resolve(argv[2]),
    "./cdn-cgi/pages-plugins"
  );

  for (const packageWithAssets of packagesWithAssets) {
    const sourceAssetsDirectory = join(
      dirname(packageWithAssets.filePath),
      packageWithAssets.contents.directories.assets
    );
    const name = packageWithAssets.contents.name;
    const destinationAssetsDirectory = join(pluginsAssetsDirectory, name);

    console.log(`Copying ${name}'s assets...`);
    cpSync(sourceAssetsDirectory, destinationAssetsDirectory, {
      recursive: true,
    });
  }

  console.log("Done!");
};

main();
