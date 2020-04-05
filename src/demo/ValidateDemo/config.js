export const validators = {
  name: [value => !value && "请输入姓名"],
  age: [
    value => !value && "请输入年龄",
    (value, setValue) =>
      !/^[0-9]+$/.test(value) && setValue(parseInt(value) || 0)
  ],
  email: [
    value => !value && "必填",
    value =>
      !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(
        value
      ) && "请输入正确的邮箱"
  ]
};
