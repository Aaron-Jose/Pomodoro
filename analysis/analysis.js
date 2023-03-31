// app.js

import { totalTime } from '../script.js';

setInterval(() => {
    totalTime += 5;
  console.log(totalTime); // Output: updated value of MAX_SESSION_DURATION
}, 1000);
