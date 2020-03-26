<template>

  <aside class="dashboard_aside">
    <router-link class="dashboard_aside_logo" to="/">Demo application</router-link>

    <nav class="dashboard_aside_menu">
      <ul class="dashboard_aside_menu_list">
        <router-link
          to="/"
          v-slot="{ href, navigate, isActive }"
        >
          <li
            class="dashboard_aside_menu_item"
            :class="{'dashboard_aside_menu_item--active':isActive}"
          >
            <a
              :href="href"
              class="dashboard_aside_menu_lnk"
              :class="{'dashboard_aside_menu_lnk--active':isActive}"
              @click="navigate"
            >
              Список отчётов
            </a>
          </li>
        </router-link>
        <li class="dashboard_aside_menu_item">
          <span class="dashboard_aside_menu_lnk" @click="logout">Выход</span>
        </li>
      </ul>
    </nav>

  </aside>

</template>

<script>
  import Cookies from 'js-cookie'

  export default{
    methods:{
      logout(){
        Cookies.remove('sessionID');
        this.$router.push('/login')
      }
    }
  }

</script>
