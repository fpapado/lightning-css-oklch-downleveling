import { transform } from "lightningcss";

const DOWNLEVEL_TARGETS = {
  firefox: 100,
};

const matrix = [
  { label: "lch", percentage: "100% 0 223.97", number: "100 0 223.97" },
  { label: "lab", percentage: "100% 0 0", number: "100 0 0" },
  { label: "oklch", percentage: "100% 0 0", number: "1 0 0" },
  { label: "oklab", percentage: "100% 0 0", number: "1 0 0" },
];

for (let { label, percentage, number } of matrix) {
  const inputPercent = `.test{background: ${label}(${percentage});}`;
  const inputNumber = `.test{background: ${label}(${number});}`;

  let outputPercent = transform({
    filename: "style.css",
    code: Buffer.from(inputPercent),
    targets: DOWNLEVEL_TARGETS,
    minify: true,
  }).code.toString();

  let outputNumber = transform({
    filename: "style.css",
    code: Buffer.from(inputNumber),
    targets: DOWNLEVEL_TARGETS,
    minify: true,
  }).code.toString();

  const outputsMatch = outputPercent === outputNumber;
  console.log(
    `[${outputsMatch ? "PASS" : "FAIL"}] ${label}: Outputs must match`
  );
  if (!outputsMatch) {
    console.log(outputPercent, outputNumber);
  }
}
