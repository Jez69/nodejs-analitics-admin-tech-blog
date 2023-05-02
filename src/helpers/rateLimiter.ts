// @ts-nocheck

export function limiter(fn, wait) {
   let isCalled = false,
      calls = [];

   const caller = function () {
      if (calls.length && !isCalled) {
         isCalled = true;
         calls.shift().call();
         setTimeout(function () {
            isCalled = false;
            caller();
         }, wait);
      }
   };

   return function () {
      calls.push(fn.bind(this, ...arguments));
      caller();
   };
}
