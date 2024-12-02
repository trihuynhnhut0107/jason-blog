import { defineStore } from 'pinia';

export const useLoginState = defineStore('loginState', () => {
    const loginState = ref(false)
    const setLoginState = (value: Boolean) => {
        loginState.value = value
    }
    return {loginState, setLoginState}
})