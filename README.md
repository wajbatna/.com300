# سيمون للتسيير — Siymon Business Manager

تطبيق ويب (Next.js 14 + TypeScript + Tailwind + Supabase) لإدارة المحلات والمشاريع الصغيرة في المغرب. عربي RTL بالكامل، العملة DH.

## حالة المشروع

**المرحلة 1 (هذا الإصدار):** الهيكل، قاعدة البيانات الكاملة مع RLS وتريجرز المخزون والديون، تسجيل الدخول/التسجيل/استعادة كلمة السر، الواجهة الرئيسية (Sidebar / Drawer / Bottom Nav / FAB / Dark Mode)، لوحة التحكم ببيانات حقيقية، الصفحة التسويقية، وبيانات تجريبية.

**المراحل التالية:** المنتجات، المخزون، المبيعات POS والفواتير، المشتريات والموردون، المصاريف، العملاء والديون، التقارير، الموظفون والصلاحيات، الإعدادات. الروابط غير المنجزة تعرض صفحة "قيد البناء".

## التشغيل

```bash
npm install
cp .env.example .env.local   # ثم عدّل القيم
npm run dev
```
افتح http://localhost:3000

## ربط Supabase

1. أنشئ مشروعًا على https://supabase.com
2. من **SQL Editor** شغّل محتوى `supabase/schema.sql` كاملًا.
3. من **Project Settings → API** انسخ `Project URL` و `anon public key` إلى `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```
   لا تضع `service_role key` في الواجهة أبدًا.
4. (للتجربة السريعة) من **Authentication → Providers → Email** عطّل "Confirm email".
5. شغّل الموقع وأنشئ حسابًا من `/register`.
6. لعرض بيانات تجريبية: شغّل `supabase/seed.sql` في SQL Editor بعد إنشاء الحساب.

## الأمان

- كل جدول مفعّل عليه Row Level Security، وكل مشروع يرى بياناته فقط عبر `current_business_id()`.
- الحماية في `src/middleware.ts` + التحقق في `(app)/layout.tsx`.
- لا توجد مفاتيح سرية في الواجهة؛ فقط `anon key` العامة.

## الرفع على GitHub

```bash
git init
git add .
git commit -m "Phase 1"
git branch -M main
git remote add origin https://github.com/USERNAME/siymon.git
git push -u origin main
```
ملف `.env.local` مستثنى تلقائيًا في `.gitignore`.
