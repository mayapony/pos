type Option = {
  label: string;
  value: string;
};

export function fuzzySearch(options: Option[], keyword: string) {
  const regex = new RegExp(keyword, "i"); // 'i'表示不区分大小写
  return options.filter((item) => regex.test(item.label));
}

export function isValidate(obj: any) {
  for (const key in obj) {
    if (!obj[key] && typeof obj[key] !== "number") {
      console.log(`${key}: ${obj[key]}`);
      return false;
    }
  }
  return true;
}
