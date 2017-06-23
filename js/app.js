var app = new Vue({
  el: '#test4',
  data: {
    appointments: []
  }
});

app.$on('appointments', function (data) {
    this.appointments = data;
});