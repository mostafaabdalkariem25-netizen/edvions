// lib.js

// دالة اختيار عنصر واحد
function $(selector) {
  return document.querySelector(selector);
}

// دالة اختيار كل العناصر المطابقة
function $all(selector) {
  return document.querySelectorAll(selector);
}

