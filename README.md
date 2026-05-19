# خدمة التحويل - Money Transfer Service

موقع احترافي لتقديم خدمات تحويل الأموال عبر أورانج كاش وإنستا باي.

## 📋 الميزات

✅ واجهة مستخدم أنيقة وحديثة
✅ دعم كامل للغة العربية
✅ نموذج إدخال بيانات آمن
✅ إرسال تلقائي للبريد الإلكتروني
✅ رسالة تأكيد فورية
✅ تصميم متجاوب (Responsive)
✅ معالجة آمنة للبيانات

## 🚀 البدء السريع

### Option 1: استخدام Formspree (الأسهل)

1. اذهب إلى [formspree.io](https://formspree.io)
2. أنشئ حساباً وقم بإنشاء نموذج جديد
3. احصل على Form ID
4. في ملف `script.js`، قم بتعديل:

```javascript
const formspreeUrl = 'https://formspree.io/f/YOUR_FORM_ID';
```

### Option 2: استخدام Node.js + Express

1. **تثبيت المتطلبات:**
```bash
npm install
```

2. **إعداد متغيرات البيئة:**
```bash
cp .env.example .env
```

3. **تحديث `.env` بتفاصيل بريدك:**
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

4. **تشغيل السيرفر:**
```bash
npm start
```

5. **الوصول للموقع:**
```
http://localhost:3000
```

### Option 3: استخدام PHP

1. حفظ ملفات المشروع على سيرفر يدعم PHP
2. تحديث اسم الملف في `script.js`:

```javascript
return await fetch('/submit.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
});
```

3. يجب تفعيل دالة `mail()` على السيرفر

## 📧 إعداد Gmail

### للحصول على App Password:

1. اذهب إلى [myaccount.google.com](https://myaccount.google.com)
2. اختر "الأمان" من الجانب الأيسر
3. ابحث عن "كلمات مرور التطبيقات"
4. اختر "البريد" و "جهاز الكمبيوتر"
5. سيظهر لك كلمة مرور 16 حرف
6. استخدمها في `.env`

## 📁 هيكل المشروع

```
transfer-service/
├── index.html          # الصفحة الرئيسية
├── styles.css          # أنماط التصميم
├── script.js           # المنطق الأمامي
├── server.js           # السيرفر (Node.js)
├── submit.php          # معالج البيانات (PHP)
├── package.json        # متطلبات npm
├── .env.example        # مثال متغيرات البيئة
└── README.md           # هذا الملف
```

## 🎨 التخصيص

### تغيير الألوان:
عدّل في `styles.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### تغيير البيانات:
عدّل في `index.html`:
```html
<p class="phone-number">رقمك الثابت للتحويل: <strong>YOUR_NUMBER</strong></p>
```

### تغيير البريد المستقبل:
عدّل في `server.js` أو `submit.php`:
```javascript
to: 'your-email@gmail.com',
```

## 🔒 الأمان

- ✅ التحقق من صحة البيانات على الطرفين
- ✅ استخدام HTTPS في الإنتاج
- ✅ عدم حفظ البيانات الحساسة
- ✅ CORS محدود في الإنتاج

## 📱 التوافقية

- ✅ أجهزة الكمبيوتر
- ✅ الهواتف الذكية
- ✅ الأجهزة اللوحية
- ✅ جميع المتصفحات الحديثة

## 🐛 استكشاف الأخطاء

### البريد لا يصل:
1. تحقق من بيانات البريد في `.env`
2. فعّل "الوصول الأقل أماناً" إذا استخدمت Gmail
3. استخدم App Password بدلاً من كلمة المرور العادية

### الموقع لا يعمل:
1. تأكد من تثبيت `npm install`
2. تحقق من تشغيل السيرفر `npm start`
3. افتح في متصفح آخر

## 📞 الدعم

للمساعدة أو الاستفسارات:
- البريد: mkhatap53@gmail.com
- الهاتف: 01226904832

## 📄 الترخيص

هذا المشروع مرخص تحت MIT License

---

**صُنع بـ ❤️ بواسطة Mohamed777**