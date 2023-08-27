import { auth } from "~/plugins/firebase";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, updateEmail, sendEmailVerification, updatePassword, signOut } from "firebase/auth";
auth.languageCode = 'en';
export default {
    namespaced: true,
    state: {
        user: null,
        token: null
    },
    getters: {
        token: state => state.token,
        user: state => state.user
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        setToken(state, payload) {
            state.token = payload
        },
    },
    actions: {
        login({ dispatch }, pyaload) {
            return new Promise((res, rej) => {
                signInWithEmailAndPassword(auth, pyaload.email, pyaload.password)
                    .then((userCredential) => {
                        dispatch("checkUserState").then(res => {
                            if (!auth.currentUser.emailVerified) {
                                dispatch("verifyUserEmail")
                            }
                        })
                        res(userCredential)
                    })
                    .catch((error) => {
                        rej(error.message)
                    });
            })
        },
        signup({ dispatch }, pyaload) {
            return new Promise((res, rej) => {
                createUserWithEmailAndPassword(auth, pyaload.email, pyaload.password)
                    .then((userCredential) => {
                        dispatch("checkUserState").then(res => {
                            if (!auth.currentUser.emailVerified) {
                                dispatch("verifyUserEmail")
                            }
                        })
                        res(userCredential)
                    })
                    .catch((error) => {
                        console.log(error.response);
                        rej(error.message)
                    });
            })
        },
        update({ dispatch }, payload) {
            return new Promise((res, rej) => {
                updateProfile(auth.currentUser, {
                    displayName: payload.name,
                    photoURL: payload.image_url
                }).then((resp) => {
                    if (payload.email) {
                        updateEmail(auth.currentUser, payload.email).then(emailres => {
                            dispatch("checkUserState").then(res => {
                                if (auth.currentUser && !auth.currentUser.emailVerified) {
                                    dispatch("verifyUserEmail")
                                }
                            })
                            res(emailres)
                        }).catch(err => {
                            rej(err)
                        })
                    }
                    if (payload.new_password) {
                        updatePassword(auth.currentUser, payload.new_password).then(psres => {
                            dispatch("logout");
                            res(psres)
                        }).catch(err => {
                            dispatch("logout");
                            rej(err)
                        })
                    }
                    if (!payload.email && !payload.new_password) {
                        dispatch("checkUserState");
                        res(resp)
                    }
                }).catch((error) => {
                    rej(error)
                });
            })
        },
        verifyUserEmail({ dispatch }) {
            new Promise((resolve, reject) => {
                sendEmailVerification(auth.currentUser).then(res => {
                    this.$router.push("/auth/verify/email")
                    dispatch("checkUserState")
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        logout() {
            return new Promise((resolve, reject) => {
                signOut(auth)
                    .then(res => {
                        this.$router.push("/auth")
                        resolve(res)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        checkUserState({ commit }) {
            return new Promise((resolve) => {
                return onAuthStateChanged(auth, (user) => {
                    if (user) {
                        const userData = {
                            name: user.displayName,
                            email: user.email,
                            is_verified: user.emailVerified,
                            image_url: user.photoURL,
                        }
                        commit("setUser", userData);
                        commit("setToken", user.accessToken);
                    } else {
                            commit("setUser", null);
                            commit("setToken", null);
                    }
                    resolve(user)
                    return user
                })
            })
        }
    }
}