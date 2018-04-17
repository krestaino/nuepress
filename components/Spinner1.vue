<template>
  <div class="spinner">
    <div class="double-bounce1"></div>
    <div class="double-bounce2"></div>
  </div>
</template>

<style lang="scss" scoped>
@import '~assets/css/vars.scss';

.spinner {
  width: 40px;
  height: 40px;

  @media (max-width: 700px) {
    transform: scale(0.6);
  }
}

.double-bounce1, .double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #adadad;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  animation: sk-bounce 2.0s infinite ease-in-out;
}

.double-bounce2 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}

@keyframes sk-bounce {
  0%, 100% { 
    transform: scale(0.0);
  } 50% { 
    transform: scale(1.0);
  }
}

.infinite-status-prompt {
  color: rgba($primary, .65);
  font-size: 0.8rem;
  font-family: 'Roboto', sans-serif;
  margin: 64px auto;
  text-align: center;
}
</style>
