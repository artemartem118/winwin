import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        images: []
    },
    mutations: {},
    actions: {
        async setImageIntoDB( { dispatch }, file ) {
            try {
                const ref = firebase.storage().ref()
                const metaData = {
                    contentType: file.type
                }
                const task = await ref.child(file.name).put(file, metaData)
                const imageUrl = await task.ref.getDownloadURL()

                const imageId = Date.now()
                await firebase.database().ref('images/' + imageId).set({
                    imageId,
                    imageUrl
                })
            } catch ( e ) {
                console.log(e)
            }
        },
    },
    modules: {}
})
