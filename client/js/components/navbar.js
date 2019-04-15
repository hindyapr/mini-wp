Vue.component('navbar-comp', {
    props: ['logStatus'],
    data: function() {
        return {
            search: ''
        }
    },
    template: `
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="#"><i class="fab fa-medium-m"> MINI-WP </i></b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item href="#">Published Article</b-nav-item>
                    <b-nav-item href="#" v-if="logStatus">Dashboard</b-nav-item>
                    
                </b-navbar-nav>
                <b-row align-self="center" style="margin: auto;" fluid>
                    <b-nav-form class="search-box"  >
                        <b-form-input class="" size="sm" class="mx-2 mr-sm-2 search-input" placeholder="Search" v-model="search" ></b-form-input>
                        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                    </b-nav-form>
                </b-row>
                <!-- Right aligned nav items -->
                
                <b-navbar-nav class="ml-auto">
                    

                    <b-row v-if="!logStatus" class="header-item">
                        <b-button variant="light outline-primary" class="header-item"  v-on:click="$emit('regist-form')" >Write Now</b-button>
                        <b-button variant="light outline-primary" class="header-item" v-on:click="$emit('login-form')" >Author Side</b-button>
                    </b-row>

                    <b-row v-if="logStatus" class="header-item">
                        <b-button variant="light outline-primary" class="header-item" v-if="logStatus" v-on:click="$emit('article-form')" >Write</b-button>
                        <b-nav-item-dropdown class="header-item" v-if="logStatus" right>
                            <!-- Using 'button-content' slot -->
                            <template slot="button-content"><i class="fas fa-user-circle"></i></template>
                            <b-dropdown-item href="#">Profile</b-dropdown-item>
                            <b-dropdown-item href="#" v-on:click="$emit('log-out')">Sign Out</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </b-row>

                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
    `
})

{
    /* <b-nav-item-dropdown text="Lang" right>
    <b-nav-item href="#" disabled>Disabled</b-nav-item>
    <b-dropdown-item href="#">EN</b-dropdown-item>
    <b-dropdown-item href="#">ES</b-dropdown-item>
    <b-dropdown-item href="#">RU</b-dropdown-item>
    <b-dropdown-item href="#">FA</b-dropdown-item>
    </b-nav-item-dropdown> */
}