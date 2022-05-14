/* Стили */
var style1 = 'background: #2000ff; color: #ffffff; border-radius: 3px; padding: 2px'; // белый текст на синем
var style2 = 'background: #222; color: #ffff00; border-radius: 3px; padding: 1px; margin: 1px'; // жёлтый текст на сером
var style3 = 'background: #222; color: #00ff00; border-radius: 3px; padding: 1px; margin: 1px'; // зелёный текст на сером
var style4 = 'background: #222; color: #ff0000; border-radius: 3px; padding: 1px; margin: 1px'; // красный текст на сером
var style5 = 'background: #222; color: #ffffff; border-radius: 3px; padding: 1px; margin: 1px'; // белый текст на сером
var prefix = "TheAirBlow's Template"

/* Выделенная информация */
function l_exinfo(msg) {
    console.warn(`%c[${prefix}]` + `%c ${msg}`, style1, style5);
}

/* Информация */
function l_info(msg) {
    console.log(`%c[${prefix}]` + `%c ${msg}`, style1, style5);
}

/* Предупреждение */
function l_warn(msg) {
    console.warn(`%c[${prefix}]` + `%c ${msg}`, style1, style2);
}

/* Успешно */
function l_success(msg) {
    console.log(`%c[${prefix}]` + `%c ${msg}`, style1, style3);
}

/* Ошибка */
function l_error(msg) {
    console.log(`%c[${prefix}]` + `%c ${msg}`, style1, style4);
}