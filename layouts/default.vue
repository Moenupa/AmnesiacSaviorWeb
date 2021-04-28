<template>
  <Nuxt />
</template>

<style>
body {
	min-height: 100vh;
  display: -webkit-flex;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
*::-webkit-scrollbar {
  width: .8rem;
  height: .6rem;
}

*::-webkit-scrollbar-track {
  background: transparent;
}

*::-webkit-scrollbar-thumb {
  background-color: rgba(var(--dark-rgb),.5);
  border-radius: .4rem;
  border: .15rem solid var(--light);
}

body::-webkit-scrollbar {
  display: none;
}
</style>
