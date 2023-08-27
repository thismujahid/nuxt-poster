export default {
    namespaced: true,
    state: {
        posts: [],
        post: {},
        auther: {},
        comments: []
    },
    getters: {
        posts: (state) => state.posts,
        post: (state) => state.post,
        auther: (state) => state.auther,
        comments: (state) => state.comments,
    },
    mutations: {
        set(state, posts) {
            const postsList = [];
            Object.keys(posts || []).forEach(postKey => {
                postsList.push({
                    ...posts[postKey],
                    id: postKey
                })
            })
            state.posts = postsList
        },
        setPost(state, post) {
            state.post = { ...post }
        },
    },
    actions: {
        load({ dispatch }, _) {
            return dispatch("Database/call", {
                action: "Database/read",
                payload: { row: '/posts', commit: { name: "Posts/set", root: true } },
                root: true
            }, { root: true })
        },
        savePost({ dispatch }, payload) {
            return dispatch("Database/call", {
                action: payload.id ? "Database/update" : "Database/write",
                payload: { row: `posts${payload.id ? `/${payload.id}` : ''}`, data: payload },
                root: true
            }, { root: true }).then(res => {
                dispatch("load")
            })
        },
        deletePost({ dispatch }, payload) {
            return dispatch("Database/call", {
                action: "Database/delete",
                payload: { row: `/posts/${payload.id}` },
                root: true
            }, { root: true }).then(res => {
                dispatch("load")
            })
        },
        loadPostDetails({ dispatch, commit }, payload) {
            commit("setPost", null)
            return dispatch("Database/call", {
                action: "Database/read",
                payload: { row: `/posts/${payload}`, commit: { name: "Posts/setPost", root: true } },
                root: true
            }, { root: true })
        },
    }
}