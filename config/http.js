import {
  request
} from './config.js';
export function banner(data) {
  return request('api/douyin/index', data, 'POST');
}
export function headnav(data) {
  return request('api/douyin/headnav', data, 'POST');
}
export function chooseNav(data) {
  return request('api/douyin/chooseNav', data, 'POST');
}
export function sendCode(data){
	return request('api/douyin/sendCode', data, 'POST');
}
export function loginD(data){
	return request('api/douyin/login', data, 'POST');
}
export function alipay(data){
	return request('api/Dou_alipay/zijieorder', data, 'POST');
}
export function newIndex(data){
	return request('/api/index/newindex', data, 'POST');
}