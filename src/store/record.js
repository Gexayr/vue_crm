import firebase from "firebase/app";

export default {
    actions: {
        async createRecord({dispatch, commit}, record) {
            try {
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/records`).push(record)
            }
            catch (e) {
                console.log(`e`);
                commit('setError', e)
                throw e
            }
        }
    },
}