# Radix Coolors

Radix Coolors is a more easily machine readable (cooler) version of [radix-ui/colors](https://github.com/radix-ui/colors). Redundant naming is reduced greatly and scales belonging to the same family are grouped more closely. It also disincludes a bunch of CSS files that are in the upstream bundle.

This project does not depend on or require the installation of radix-ui/colors, as the transformation happens during the build process to create a totally independent package.

The structure used here is not necessarily what you'd like to work with, but it should be a lot easier to transform into the structure you want than the original package. This package also exports a few types to help you work with the color system in TypeScript, including a list of scale names and types for the steps of each scale.

# Contributing

I'm fairly happy with what this package exports and the format it exports it in, however if you have a suggestion for stricter types, supplementary exports or anything else, feel free to make an issue or a PR. Generated files are committed, so don't minify.

Some low hanging fruit:

- Find a way to export each scale as its own ES module (this likely means using a templating engine :sigh:)
- Export the whole system in different layouts
- Export the whole system in different color formats
	- HSL
- Make the rollup config less weird by finding a way to factor out the generator without bundling it.