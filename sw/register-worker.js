  if ('serviceWorker' in navigator) {
    console.log("in navigator")
    navigator.serviceWorker
             .register('service-worker/service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }else{
    console.log("NO");
  }