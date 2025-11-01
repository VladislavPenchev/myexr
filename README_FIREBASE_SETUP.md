# Firebase Setup Guide

## Стъпка 1: Създаване на Firebase проект

1. Отидете на [Firebase Console](https://console.firebase.google.com/)
2. Кликнете на "Add project" или изберете съществуващ проект
3. Следвайте инструкциите за създаване на проект

## Стъпка 2: Добавяне на Firebase конфигурация

1. В Firebase Console отидете на **Project Settings** (⚙️ иконката)
2. В секцията **Your apps** кликнете на иконката за **Web** (`</>`)
3. Регистрирайте приложението с име (например: "MyExR Mobile")
4. Копирайте конфигурационните данни

## Стъпка 3: Конфигуриране на `config/firebase.ts`

Отворете `config/firebase.ts` и заменете placeholder стойностите:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",  // Заменете с вашия API ключ
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",  // Заменете с вашия auth domain
  projectId: "YOUR_PROJECT_ID",  // Заменете с вашия project ID
  storageBucket: "YOUR_PROJECT_ID.appspot.com",  // Заменете с вашия storage bucket
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",  // Заменете с вашия messaging sender ID
  appId: "YOUR_APP_ID",  // Заменете с вашия app ID
};
```

## Стъпка 4: Настройка на Firestore Database

1. В Firebase Console отидете на **Firestore Database**
2. Кликнете на **Create database**
3. Изберете **Start in test mode** (за начало, по-късно ще настроите security rules)
4. Изберете локация за базата данни
5. Кликнете **Enable**

## Стъпка 5: Security Rules (по избор, за разработка)

За разработка може да използвате тези правила:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null || true; // Временно разрешение за тестване
    }
  }
}
```

**ВНИМАНИЕ:** Тези правила са разрешителни само за тестване! За production трябва да настроите правилна автентикация и security rules.

## Стъпка 6: Тестване

След като попълните конфигурацията, приложението ще:
- Автоматично създава потребителски профил при първо отваряне
- Запазва промените в профила в Firebase
- Зарежда данни от Firebase при отваряне на екраните

## Структура на данните в Firestore

```
users/
  {userId}/
    - account: string
    - name: string
    - gender: string
    - age: string
    - height: string
    - weight: string
    - units: string
    - badges: Array<{name: string, unlocked: boolean}>
    - createdAt: Timestamp
    - updatedAt: Timestamp
```

## Следващи стъпки

- Добавете Firebase Authentication за реална автентикация
- Настройте Security Rules за production
- Добавете още функции за запазване на данни (упражнения, journal entries, и т.н.)

