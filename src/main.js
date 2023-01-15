import { createApp } from 'vue';
import App from './App.vue';

import './assets/main.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faSpinner, faCheckCircle);

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app');
