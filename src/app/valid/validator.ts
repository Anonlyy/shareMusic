import {FormControl} from "@angular/forms";
/**
 * Created by Xposean on 2017-9-12.
 */

// 手机号验证器
export function telValidator(control:FormControl):any{
  var reg = /^1(3|4|5|7|8)\d{9}$/;
  let valid = reg.test(control.value);
  return valid?null:{tel:true};
}
