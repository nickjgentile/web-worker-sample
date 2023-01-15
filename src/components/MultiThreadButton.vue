<template>
  <button @click="onButtonClicked()">Multi Threaded Execution!</button>
</template>

<script setup>
const emit = defineEmits(['clicked', 'executionComplete', 'turnCheckmarkGreen'])
function onButtonClicked(params) {
  var startTime = performance.now()
  emit('clicked')
  // Simple Mainthread execution
  var randomSingleDigit = Math.floor(Math.random() * 10);
  // Long WorkerThread execution 
  var worker = new Worker(
    new URL('../workers/countWorker.js', import.meta.url),
    { type: 'module' }
  );

  worker.onmessage = function (data) {
    console.log('Turn the button green to indicate the worker has finished!')
    emit('turnCheckmarkGreen')
    worker.terminate();
  }

  worker.postMessage({ type: 'countToOneHundredThousand' });

  var endTime = performance.now()
  emit('executionComplete', { type: 'multi', randomSingleDigit, startTime, endTime })
}
</script>

<style scoped>
.item {
  margin-top: 2rem;
  display: flex;
}

.details {
  flex: 1;
  margin-left: 1rem;
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  width: 32px;
  height: 32px;

  color: var(--color-text);
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

@media (min-width: 1024px) {
  .item {
    margin-top: 0;
    padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
  }

  i {
    top: calc(50% - 25px);
    left: -26px;
    position: absolute;
    border: 1px solid var(--color-border);
    background: var(--color-background);
    border-radius: 8px;
    width: 50px;
    height: 50px;
  }

  .item:before {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:after {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:first-of-type:before {
    display: none;
  }

  .item:last-of-type:after {
    display: none;
  }
}
</style>
