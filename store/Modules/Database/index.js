
import { database } from '~/plugins/firebase.js';
import { ref, set, onValue, push } from "firebase/database";
export default {
    namespaced: true,
    actions: {
       async write(_, payload) {
            const ListRows = ref(database, payload.row);
            const newRowsRef = push(ListRows);
            const req = await set(newRowsRef, payload.data);
            console.log(req);
            return req
        },
        read({ commit }, payload) {
            console.log(this);
            return new Promise((resolve, reject)=>{
                try{

                    const get = ref(database, payload.row);
                    onValue(get, (snapshot) => {
                        const data = snapshot.val();
                        if (payload.commit) {
                            commit(payload.commit.name, data, { root: payload.commit.root })
                        }
                        resolve(data)
                    });
                }catch(error){
                    reject(error)
                }
            })
        },
        update(_, payload) {
            return set(ref(database, payload.row), payload.data)
        },
        delete(_, payload) {
            return set(ref(database, payload.row), null)
        },
        call({ dispatch }, payload) {
            return new Promise((resolve, reject) => {
                dispatch(payload.action, payload.payload, { root: payload.root || false }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
    }
}
