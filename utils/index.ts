type Option = {
  label: string;
  value: string;
};

export function fuzzySearch(options: Option[], keyword: string) {
  const regex = new RegExp(keyword, "i"); // 'i'表示不区分大小写
  return options.filter((item) => regex.test(item.label));
}
