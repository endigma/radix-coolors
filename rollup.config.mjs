import typescript from "@rollup/plugin-typescript";
import * as radix from "@radix-ui/colors";
import fs from "fs";
import path from "path";
import { defineConfig } from "rollup";

export default defineConfig({
  input: "src/index.ts",
  plugins: [
    {
      name: "generate coolors",
      buildStart() {
        const outputDir = "src/gen/";

        const coolors = { light: {}, dark: {}, lightP3: {}, darkP3: {} };
        let scales = [];

        function cleanScaleSteps(scale) {
          const newScale = {};

          for (const step in scale) {
            const match = step.match(/(\w+?)(A*)(\d{1,2})/);

            newScale[match[3] + match[2]] = scale[step];
          }

          return newScale;
        }

        for (const r_color in radix) {
          if (
            r_color == "__esModule" ||
            r_color == "default" ||
            r_color == "module.exports"
          ) {
            continue;
          }

          let pattern = /^([a-z]+)(Dark)?(P3)?(A)?$/;

          let [_, base, dark, p3, _alpha] = r_color.match(pattern);

          let name = base;
          let theme = (dark ? "dark" : "light") + (p3 ? "P3" : "");

          coolors[theme][name] = coolors[theme][name] || {};

          for (const [step, value] of Object.entries(
            cleanScaleSteps(radix[r_color])
          )) {
            coolors[theme][name][step] = value;
          }

          if (!scales.includes(name)) {
            scales.push(name);
          }
        }

        // Add black/white to the dark themes, they don't have dark mode equivalents
        coolors["dark"]["black"] = cleanScaleSteps(radix["blackA"]);
        coolors["dark"]["white"] = cleanScaleSteps(radix["whiteA"]);
        coolors["darkP3"]["black"] = cleanScaleSteps(radix["blackP3A"]);
        coolors["darkP3"]["white"] = cleanScaleSteps(radix["whiteP3A"]);

        fs.writeFileSync(
          path.join(outputDir, "coolors.ts"),
          "export const coolors = " +
            JSON.stringify(coolors, null, 2) +
            " as const"
        );

        console.log("Generated coolors.ts");

        fs.writeFileSync(
          path.join(outputDir, "scales.ts"),
          "export const scales = " +
            JSON.stringify(scales, null, 2) +
            " as const"
        );

        console.log("Generated scales.ts");
      },
    },
    typescript({
      tsconfig: "./tsconfig.json",
    }),
  ],
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
    },
    {
      file: "dist/index.mjs",
      format: "es",
    },
  ],
});
