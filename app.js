const app = new Vue({
    el: '#app',
    data: {
        config: true,
        offline: false,
        filter: '',
        vlayout: false,
        isDark: true
    },
    created: async function () {
        let that = this;

        this.isDark = 'overrideDark' in localStorage ?
            JSON.parse(localStorage.overrideDark) : matchMedia("(prefers-color-scheme: dark)").matches;

        if ('vlayout' in localStorage) {
            this.vlayout = JSON.parse(localStorage.vlayout)
        }

        this.checkOffline();
        try {
            this.config = await this.getConfig();
        } catch (error) {
            this.offline = true;
        }

        // Look for a new message if an endpoint is provided.
        if (this.config.message && this.config.message.url) {
            this.getMessage(this.config.message.url).then(function (message) {
                // keep the original config value if no value is provided by the endpoint
                for (const prop of ['title', 'style', 'content']) {
                    if (prop in message && message[prop] !== null) {
                        that.config.message[prop] = message[prop];
                    }
                }
            });
        }

        document.addEventListener('visibilitychange', function () {
            if (document.visibilityState == "visible") {
                that.checkOffline();
            }
        }, false);
    },
    methods: {
        checkOffline: function () {
            let that = this;
            return fetch(window.location.href + "?alive", {
                method: 'HEAD',
                cache: 'no-store'
            }).then(function () {
                that.offline = false;
            }).catch(function () {
                that.offline = true;
            });
        },
        getConfig: function (event) {
            return fetch('config.yml').then(function (response) {
                if (response.status != 200) {
                    return
                }
                return response.text().then(function (body) {
                    return jsyaml.load(body);
                });
            });
        },
        getMessage: function (url) {
            return fetch(url).then(function (response) {
                if (response.status != 200) {
                    return;
                }
                return response.json();
            });
        },
        toggleTheme: function () {
            this.isDark = !this.isDark;
            localStorage.overrideDark = this.isDark;
        },
        toggleLayout: function () {
            this.vlayout = !this.vlayout;
            localStorage.vlayout = this.vlayout;
        },
    }
});

Vue.component('service', {
    props: ['item'],
    template: `<div>
    <div class="card">
        <a :href="item.url" :target="item.target">
            <div class="card-content">
                <div class="media">
                    <div v-if="item.logo" class="media-left">
                        <figure class="image is-32x32">
                            <img :src="item.logo" />
                        </figure>
                    </div>
                    <div v-if="item.icon" class="media-left">
                        <figure class="image is-32x32">
                            <i style="font-size: 26px" :class="item.icon"></i>
                        </figure>
                    </div>
                    <div class="media-content">
                        <p class="title is-6">{{ item.name }}</p>
                    </div>
                </div>
                <div class="tag" :class="item.tagstyle" v-if="item.tag">
                    <strong class="tag-text">#{{ item.tag }}</strong>
                </div>
            </div>
        </a>
    </div></div>`
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('worker.js');
    });
}

function randomImage() {
    var images = [
        '/img/bg.jpg',
        '/img/bg1.jpg',
        '/img/bg2.jpg',
        '/img/bg3.jpg',
        '/img/bg4.jpg',
        '/img/bg5.jpg',
        '/img/bg6.jpg'
    ];
    var size = images.length;
    var x = Math.floor(size * Math.random());
    console.log(x);
    var element = document.getElementsByClassName('bgImage');
    element[0].style["background"] = "url('" + images[x] + "')";
}



document.addEventListener("DOMContentLoaded", randomImage);