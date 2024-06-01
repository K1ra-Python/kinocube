export default defineNuxtRouteMiddleware((to, from) => {
    const { $auth } = useNuxtApp();
  
    if (!$auth.isAuthenticated()) {
      // Перенаправить пользователя на страницу входа
      return navigateTo('/login');
    }
  });