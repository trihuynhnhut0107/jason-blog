import { defineStore } from 'pinia';

export const usePostToken = defineStore('tokens', () => {
    const userBalance = ref(0); 
    const setUserBalance = (value: number) => {
        userBalance.value = value
    }
    const postToken = ref(0);
    const setPostToken = (value: number) => {
        postToken.value = value
    }
    return {userBalance, setUserBalance, postToken, setPostToken}
})