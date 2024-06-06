export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuth();

  if (!auth.currentUser) {
    return navigateTo('/login');
  }
});