# 🤖 Методы взлома ЦДЗ сайтов
Это мои догадки о работе некоторых ЦДЗ сайтов.

## 📕 [МЭШ](https://uchebnik.mos.ru)
Метода не обнаружено

## 📕 [SkyEng](https://skyeng.ru)
Метода не обнаружено

## 📕 [ЯКласс](https://yaklass.ru)
Метода не обнаружено

## 📒 [FoxFord](https://foxford.ru)
1) Мы должны войти в аккаунт
2) Мы должны отправить фейк ответы
3) Завершаем тест, получаем ответы
### Получить ID заданий в тесте
```
GET /api/trainings/<ID теста>
Host: foxford.ru
Accept: application/json, text/plain, */*
X-Requested-With: XMLHttpRequest
Connection: keep-alive
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: same-origin
Pragma: no-cache
Cache-Control: no-cache
```

Ответ: https://gist.github.com/TheAirBlow/5089bf6bbd4221984bdbdadb60bc15be
### Получить ответы на задание
```
GET /api/trainings/<ID теста>/tasks/<ID задания>
Host: foxford.ru
Accept: application/json, text/plain, */*
X-Requested-With: XMLHttpRequest
Connection: keep-alive
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: same-origin
```

Ответ: https://gist.github.com/TheAirBlow/36ab847428276564d5a000d75464fd38
### Отправить ответы
Обычный POST-запрос через дефолтный `form` HTML. \
Работает довольно странно - использует скрытые \
`input` для сохранения выбранных ответов

## 📒 [Uchi.ru](https://uchi.ru)
### Тест со ссылкой https://uchi.ru/homeworks/student/lesson/<ID теста>
Метода не обнаружено
### Тест со ссылкой https://uchi.ru/b2t/student/lesson/<ID теста>
1) Мы должны войти в аккаунт
2) Дальше получаем ответы
#### Получить ID заданий в тесте
Забыл про это :(
#### Получить ответы на задания
```
POST /b2t/api/v1/students/check_sessions/<ID задания>
Accept: application/json
Content-type: application/json
Origin: https://uchi.ru
Connection: keep-alive
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: same-origin
```

Ответ: https://gist.github.com/TheAirBlow/62ae32473dc7d6a4a875e1f61dfc9a5a

## 📒 [LearningApps](https://learningapps.org)
Функция `AppClient.getParameters()` содержит все ответы.
```
0: Object { name: "v1_1", xmlName: "v1_#", xmlValue: "image|https://dbimg.eu/i/dppxnkvs0.png||0", … }
card: Object { attached: null, attachedTo: null, innerHTML: "<img src=\"https://dbimg.eu/i/dppxnkvs0.png\" alt=\"\"/>", … }
hint: ""
hintTTS: "0"
isEqual: function isEqual(v)
list: Object { index: 1, name: "pairs" }
media: "image"
name: "v1_1"
type: "media"
value: "https://dbimg.eu/i/dppxnkvs0.png"
xmlName: "v1_#"
xmlValue: "image|https://dbimg.eu/i/dppxnkvs0.png||0"
1: Object { name: "v2_1", xmlName: "v2_#", xmlValue: "text|Мяч в \"АУТ\"||0", … }
card: Object { attached: null, attachedTo: null, innerHTML: "<span unselectable=\"on\" class=\"resizeText\">Мяч в \"АУТ\"</span>", … }
hint: ""
hintTTS: "0"
isEqual: function isEqual(v)
list: Object { index: 1, name: "pairs" }
media: "text"
name: "v2_1"
type: "media"
value: "Мяч в \"АУТ\""
xmlName: "v2_#"
xmlValue: "text|Мяч в \"АУТ\"||0"
2: Object { name: "v1_2", xmlName: "v1_#", xmlValue: "image|https://dbimg.eu/i/qqdsse0tni.png||0", … }
... еще много такой же фигни
52: Object { name: "feedback", xmlName: "feedback", xmlValue: "Супер! Всё верно.", … }
```
