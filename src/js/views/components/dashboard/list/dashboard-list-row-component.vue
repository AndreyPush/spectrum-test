<template>

  <div class="dashboard_list_row">

    <div class="dashboard_list_col">
      <p class="dashboard_list_body_text">{{data.id}}</p>
    </div>
    <div class="dashboard_list_col">
      <p class="dashboard_list_body_text">{{data.type}}</p>
    </div>
    <div class="dashboard_list_col">
      <p class="dashboard_list_body_text">{{computedDate}}</p>
    </div>
    <div class="dashboard_list_col">
      <p class="dashboard_list_body_status" :class="[`dashboard_list_body_status--${data.status}`]">{{data.status}}</p>
    </div>
    <div class="dashboard_list_col">
      <button class="dashboard_list_body_del" @click="removeReport(data.reportID)">
        <img src="/img/delete-icon.svg" alt="delete to trash" class="dashboard_list_body_delIcon">
      </button>
    </div>

  </div>

</template>

<script>
  import moment from 'moment';
  import {db} from '@db/database'

  export default {
    props:{
      data: {
        type: Object,
        required: true
      }
    },
    computed:{
      computedDate(){
        return moment(this.data.date).format('DD.MM.YYYY HH:mm:ss')
      }
    },
    methods:{
      removeReport(id){
        db.reports = db.reports.filter(item=>item.reportID!==id);
        db.exportDataBus.$emit('changeList');
      }
    }
  }

</script>
