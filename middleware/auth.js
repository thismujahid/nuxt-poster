export default function (context) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            context.store.dispatch("Auth/checkUserState").then(res => {
                if (!res) {
                    context.redirect('/auth')
                } else if (res && context.route.name === 'auth') {
                    context.redirect('/admin/profile')
                }
                resolve(true)
            }).catch(err => {
                reject(err)
            })
        }, !process.client ? 5000 : 0)
    })
}