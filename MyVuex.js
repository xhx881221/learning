let _Vue = null;

class Store {
    constructor(options) {
        const state = options.state || {};
        const mutations = options.mutations || {};
        const actions = options.actions || {};
        const getters = options.getters || {};

        this.state = _Vue.observable(state);

        this.getters = Object.create(null);
        Object.keys(getters).forEach((key) => {
            Object.defineProperty(this.getters, key, {
                get: () => {
                    return getters[key].call(this, this.state);
                }
            })
        });

        this.mutations = {};
        Object.keys(mutations).forEach((key) => {
            this.mutations[key] = (params) => {
                mutations[key].call(this, this.state, params);
            }
        });

        this.actions = {};
        Object.keys(actions).forEach((key) => {
            this.actions[key] = (params) => {
                actions[key].call(this, this, params);
            }
        });

        commit = (eventName, params) => {
            this.mutations[eventName](params);
        }

        dispatch = (eventName, params) => {
            this.actions[eventName](params);
        }
    }
}

function install(Vue) {
    _Vue = Vue;
    _Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                _Vue.prototype.$store = this.$options.store;
            }
        }
    })
}

const mapState = (params) => {
    if (!Array.isArray(params)) {
        throw new Error("抱歉，当前是丐版的Vuex，只支持数组参数")
    }
    let obj = {};
    params.forEach((item) => {
        obj[items] = function() {
            return this.$store.state[item];
        }
    });
    return obj;
}

const mapMutations = (params) => {
    if (!Array.isArray(params)) {
        throw new Error("抱歉，当前是丐版的Vuex，只支持数组参数")
    }
    let obj = {};
    params.forEach((item) => {
        obj[items] = function(params) {
            return this.$store.commit(item, params);
        }
    });
    return obj;
}

const mapActions = (params) => {
    if (!Array.isArray(params)) {
        throw new Error("抱歉，当前是丐版的Vuex，只支持数组参数")
    }
    let obj = {};
    params.forEach((item) => {
        obj[items] = function(params) {
            return this.$store.dispatch(item, params);
        }
    });
    return obj;
}

const mapGetters = (params) => {
    if (!Array.isArray(params)) {
        throw new Error("抱歉，当前是丐版的Vuex，只支持数组参数")
    }
    let obj = {};
    params.forEach((item) => {
        obj[items] = function() {
            return this.$store.getters[item];
        }
    });
    return obj;
}

export { mapState, mapMutations, mapActions, mapGetters }

export default {
    install,
    Store,
}