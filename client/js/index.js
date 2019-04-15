const baseURL = "http://localhost:3000";

new Vue({
    el: "#app",
    components: {
        wysiwyg: vueWysiwyg.default.component,
    },
    data: {
        image: "",
        registForm: false,
        loginForm: false,
        usernameRegist: "",
        emailRegist: "",
        passRegist: "",
        emailLogin: "",
        passLogin: "",
        logStatus: false,
        drafts: [],
        fixDrafts: [],
        published: [],
        fixPublished: [],
        fixArticles: [],
        content: "",
        title: "",
        form: false,
        isDraft: false,
        isPublished: true,
        searchText: "",
        openSearch: false,
        newArticle: false,
        editDraft: false,
        editPublish: false
    },
    methods: {
        onPublished() {
            this.isPublished = true;
            this.isDraft = false;
        },
        onDraft() {
            this.isPublished = false;
            this.isDraft = true;
        },
        openRegistForm() {
            this.form = true;
            this.newArticle = true;
        },
        openEditPostForm(id) {
            this.form = true;
            this.editPublish = true;
            let data = this.fixPublished.filter(article => article.id === id)[0];
            this.title = data.title;
            this.content = data.content;
        },
        openEditDraftForm(id) {
            this.form = true;
            this.editDraft = true;
            let data = this.fixDrafts.filter(article => article.id === id)[0];
            this.title = data.title;
            this.content = data.content;
        },
        closeRegistForm() {
            this.form = false;
            this.title = '';
            this.content = '';
            this.newArticle = false;
            this.editDraft = false;
            this.editPublish = false;
        },
        searching() {
            this.openSearch = !this.openSearch;
            this.searchText = '';
        },
        publish(publish) {
            let createObj = {}
            console.log(publish);
            if (publish) {
                createObj = {
                    title: this.title,
                    content: this.content,
                    published: true,
                }
            } else {
                createObj = {
                    title: this.title,
                    content: this.content,
                    published: false,
                }
            }

            axios
                .post(baseURL + '/articles', createObj)
                .then(({
                    data
                }) => {
                    this.fixArticles.push(data);
                    this.title = '';
                    this.article = '';
                    this.form = false;
                    this.newArticle = false;
                    this.editDraft = false;
                    this.editPublish = false;
                })
                .catch(err => {
                    console.log(err);
                })
        },
        publishFromDraft() {
            axios
                .put(baseURL + '/articles', {
                    title: this.title,
                    content: this.content,
                    publishStatus: true,
                })
                .then(({
                    data
                }) => {
                    this.fixDrafts.push(data);
                    this.title = '';
                    this.article = '';
                    this.form = false;
                    this.newArticle = false;
                    this.editDraft = false;
                    this.editPublish = false;
                })
                .catch(err => {
                    console.log(err);
                })
        },
        deletePost(id) {
            console.log(id);
            axios
                .delete(baseURL + '/articles/' + id)
                .then(({
                    data
                }) => {
                    this.fixArticles = this.fixArticles.filter(article => article.id !== id);
                })
                .catch(err => {
                    console.log(err);
                })
        },
        deleteDraft(id) {
            console.log(id);
            axios
                .delete(baseURL + '/articles/' + id)
                .then(({
                    data
                }) => {
                    this.fixDrafts = this.fixDrafts.filter(draft => draft.id !== id);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    },
    created() {
        axios
            .get(baseURL + '/articles')
            .then(({
                data
            }) => {
                this.fixArticles = [...data]
                this.fixPublished = data.filter(article => article.publishStatus);
                this.published = this.fixPublished;
                this.fixDrafts = data.filter(article => !article.publishStatus);
                this.drafts = this.fixDrafts;
            })
            .catch(err => {
                console.log(err);
            })



    },
    watch: {
        searchText(val) {
            this.published = this.fixPublished.filter(one => one.title.match(val) !== null)
            this.drafts = this.fixDrafts.filter(one => one.title.match(val) !== null)
        },
        fixArticles(val) {
            this.fixPublished = this.fixArticles.filter(article => article.published);
            this.fixDrafts = this.fixDrafts.filter(article => !article.published);
        }

    }
})

Vue.config.devtools = true;