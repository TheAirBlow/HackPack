# 🤖 Методы взлома ЦДЗ сайтов
Это мои догадки о работе некоторых ЦДЗ сайтов.

## 📕 [МЭШ](https://uchebnik.mos.ru)
Метода не обнаружено

## 📕 [SkyEng](https://skyeng.ru)
Метода не обнаружено

## 📕 [ЯКласс](https://yaklass.ru)
Метода не обнаружено

## 📕 [LearningApps](https://learningapps.org)
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
<prototype>: Object { … }
2: Object { name: "v1_2", xmlName: "v1_#", xmlValue: "image|https://dbimg.eu/i/qqdsse0tni.png||0", … }
... еще много такой же фигни
52: Object { name: "feedback", xmlName: "feedback", xmlValue: "Супер! Всё верно.", … }
find: function find(name)
groupByListIndex: function groupByListIndex()
length: 53
remove: function remove(i)
```
