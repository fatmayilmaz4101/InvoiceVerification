export enum Unit {
  Pc = 1,
  M,
  Sqm,
  Lm,
  Pair,
  Box,
  Roll,
}
export const UnitOptions = [
  { label: "Pc", value: Unit.Pc },
  { label: "M", value: Unit.M },
  { label: "Sqm", value: Unit.Sqm },
  { label: "Lm", value: Unit.Lm },
  { label: "Pair", value: Unit.Pair },
  { label: "Box", value: Unit.Box },
  { label: "Roll", value: Unit.Roll },
];
export const getUnitName = (unitValue: Unit): string => {
  const option = UnitOptions.find((option) => option.value === unitValue);
  return option ? option.label : "Unknown";
};
