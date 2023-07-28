export const BRANDS = ["oppo", "vivo", "华为"];

export const AUTOCOMPLETE_S = [
  {
    label: "品牌*",
    name: "brand",
  },
  {
    label: "型号*",
    name: "model",
  },
  {
    label: "颜色*",
    name: "color",
  },
] as const;

export const TEXT_INPUT_S = [
  {
    label: "进价",
    name: "inPrice",
  },
  {
    label: "售价",
    name: "outPrice",
  },
] as const;

export const SELL_TEXT_INPUT_S = [
  {
    label: "姓名",
    name: "name",
  },
  {
    label: "手机号",
    name: "phone",
  },
];
