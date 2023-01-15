<script setup>
import SingleThreadButton from './components/SingleThreadButton.vue';
import MultiThreadButton from './components/MultiThreadButton.vue';
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

  </header>

  <main>
    <SingleThreadButton @clicked="this.onButtonExecutionStarted($event)"
      @executionComplete="this.onButtonExecutionComplete">
    </SingleThreadButton>
    <MultiThreadButton @clicked="this.onButtonExecutionStarted($event)"
      @turnCheckmarkGreen="this.onTurnCheckmarkGreen()" @executionComplete="this.onButtonExecutionComplete">
    </MultiThreadButton>
    <div class="spinner-container">
      <font-awesome-icon :class="{ red: isLoading, green: isCheckGreen }" :size="'2x'"
        :icon="['fas', 'check-circle']" />
    </div>
    <span>Grey checkCircle = No mainthread execution happening.</span>
    <span style="color: red">Red checkCircle = Mainthread execution is taking place.</span>
    <span class="green">Green checkCircle = Worker thread has communicated back to the main thread.</span>
    <div></div>
  </main>
</template>

<script>
export default {
  components: {
    SingleThreadButton,
    MultiThreadButton
  },
  data() {
    return {
      isLoading: false,
      isCheckGreen: false
    }
  },
  methods: {
    onButtonExecutionComplete(data) {
      // THE MAIN THREADS EXECUTION IS FINISHED

      // uncomment debugger below to interrogate data arg
      // and look at at start and end time of child click method
      this.isLoading = false;
    },
    onButtonExecutionStarted($event) {
      this.isLoading = true;
      this.isCheckGreen = false;

      setTimeout(() => {
        $event();
      }, 0)
    },
    onTurnCheckmarkGreen() {
      this.isCheckGreen = true;
    }
  }
}
</script>

<style lang="scss">
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 200px;
}

svg.red {
  color: #ff253a;
}

span {
  display: block;
}

button {
  background: hsl(160deg 100% 37%);
  border: none;
  border-radius: 4px;
  margin: 6px;
  display: block;
  padding: 5px 15px;
  color: #f8f8f8;
  width: 200px;
  box-shadow: 0.5px 0.5px 2px #fff;

  &:hover {
    opacity: .8;
    cursor: pointer;
  }
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
