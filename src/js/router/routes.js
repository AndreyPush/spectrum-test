// main
import Login from 'Views/pages/login.vue';
import Dashboard from 'Views/pages/dashboard.vue';

export const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/dashboard',
    component: Dashboard
  },
  {
    path: '*',
    redirect: '/login'
  }

]
