<template>

  <div>
    <router-view></router-view>
  </div>

</template>

<script>
  import md5 from 'md5'
  import Cookie from 'js-cookie'
  import {db} from '@db/database'

  export default {
    created() {
      if(Cookie.get('sessionID')){
        for(let item in db.users){
          if(Cookie.get('sessionID')===md5(db.users[item].id)){
            this.$router.push('/dashboard');
          }
        }
      }
    }
  }

</script>
