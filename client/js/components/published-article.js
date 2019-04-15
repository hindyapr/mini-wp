Vue.component('published-article', {
    props: ['article'],
    data: function() {
        return {
            search: ''
        }
    },
    template: `
    <div style=" width: 100%; margin: 8px auto">
        <b-card v-bind:title="article.title">
            <b-card-text v-html="article.content">
            </b-card-text>
        <b-button href="#" variant="dark">READ MORE</b-button>
    </b-card>
    </div>
    
    `
})