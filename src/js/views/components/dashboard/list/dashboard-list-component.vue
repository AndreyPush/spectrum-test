<template>

  <section class="dashboard_list">

    <h2 class="dashboard_list_head">Все отчёты</h2>

    <section class="dashboard_list_block">

      <div class="dashboard_list_ahead">
        <div class="dashboard_list_col">
          <p class="dashboard_list_ahead_title">Идентификатор</p>
        </div>
        <div class="dashboard_list_col">
          <p class="dashboard_list_ahead_title">Тип идентификатора</p>
        </div>
        <div class="dashboard_list_col">
          <p class="dashboard_list_ahead_title">Дата</p>
        </div>
        <div class="dashboard_list_col">
          <p class="dashboard_list_ahead_title">Статус</p>
        </div>
        <div class="dashboard_list_col"></div>
      </div>

      <section class="dashboard_list_body">

        <dashboard-list-row-component
          v-for="(item, i) in list"
          :key="i"
          :data="item"
          @deleted="syncData"
        ></dashboard-list-row-component>

      </section>

    </section>

  </section>

</template>

<script>
  import {db} from '@db/database'
  import Vue from 'vue';

  export default{
    data: ()=>({
      list: []
    }),
    methods:{
      syncData(){
        this.list = [];
        for(let i in db.reports){
          this.list.push(db.reports[i]);
        }
      }
    },
    created(){
      let th = this;

      for(let i in db.reports){
        th.list.push(db.reports[i]);
      }

      db.exportDataBus = new Vue();

      db.exportDataBus.$on('changeList', ()=>{
        th.syncData();
      })

    }
  }

</script>
