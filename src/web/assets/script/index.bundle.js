
System.register([], function (_export, _context) {
  "use strict";

  var data;
  return {
    setters: [],
    execute: function () {
      // console.log('this is a script index.js file');
      // var app6 = new Vue({
      //   el: '#app-6',
      //   data: {
      //     message: 'Hello Vue!'
      //   }
      // })
      data = 'this is a script index.js file';

      _export("default", data);
    }
  };
});
