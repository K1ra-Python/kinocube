<template>
    <button @click="logout">Выйти</button>
  </template>
<script setup>
import { signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { getAuth} from 'firebase/auth';

const router = useRouter();
const auth = getAuth();
const logout = async () => {
  await signOut(auth).then(() => {
    // Пользователь успешно вышел из системы
    // Перенаправление на страницу входа или на главную, например
    router.push('/login');
  }).catch((error) => {
    // Обработка возможных ошибок выхода
    console.error("Ошибка при выходе из системы:", error);
  });
}
</script>

