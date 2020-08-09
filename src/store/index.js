import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        images: []
    },
    mutations: {
        SET_IMAGES( state, payload ) {
            state.images = payload
        }
    },
    actions: {
        async getImagesFromDB( { commit } ) {
            try {
                const ref = await firebase.database().ref('images')
                ref.once('value', ( snapshot ) => {
                    const imagesData = snapshot.val()
                    if ( !imagesData ) {
                        commit('SET_IMAGES', [])
                        return
                    }
                    const data = Object.values(imagesData)
                    commit('SET_IMAGES', data)
                })
            } catch ( e ) {
                console.log(e)
            }
        },
        async updateOrderImagesDB( { state, dispatch }, payload ) {
            try {
                for ( const item of state.images ) {
                    await firebase.database().ref('images/' + item.imageId).remove()
                }
                const newData = {}
                let newId = 0
                payload.forEach(item => {
                    newId++
                    newData[`images/${ newId }`] = {
                        imageId: newId,
                        imageUrl: item.imageUrl
                    }
                })
                await firebase.database().ref().update(newData)
                await dispatch('getImagesFromDB')
            } catch ( e ) {
                console.log(e)
            }
        },
        async updateImageAfterEdit( {}, { file, imageUrl, imageId } ) {
            try {
                const ref = await firebase.storage().refFromURL(imageUrl)
                const help = await ref.put(file)
                const downloadURL = await help.ref.getDownloadURL()

                const newData = {
                    [`imagesData/${ imageId }`]: {
                        imageId,
                        imageUrl: downloadURL
                    }
                }
                await firebase.database().ref().update(newData)
            } catch ( e ) {
                console.log(e)
            }
        },
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
                await dispatch('getImagesFromDB')
            } catch ( e ) {
                console.log(e)
            }
        },
        async deleteImageFromDB( { dispatch }, payload ) {
            try {
                await firebase.database().ref('images/' + payload).remove()
                dispatch('getImagesFromDB')
            } catch ( e ) {
                console.log(e)
            }
        }
    },
    getters: {
        getImages( state ) {
            return state.images
        }
    },
    modules: {}
})
