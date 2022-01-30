## Pages Plugins

# Core

This library is a bit of a hack to pull in all the static assets of a project's plugins.

## Installation

```sh
npm install --save-dev @cfpreview/pages-plugins-installer
```

## Usage

```sh
npx @cfpreview/pages-plugin-installer [directory]
```

Add the installer to your build step. This could either be with a prebuild npm script, or directly in your Pages project on the Cloudflare dashboard.

The directory should be the directory of your static assets.
