import './css/style.css';
import { text } from './components/test';
console.log("123");
var funcName = (params) => {
    params + 2;
    console.log(params + 2);
}
funcName(2);
document.querySelector('#app').innerHTML = text;