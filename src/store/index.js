import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
import url from "../util/url";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: false,
    blogEntries: []
  },
  mutations: {
    login(state) {
      state.loggedIn = true;
    },
    logout(state) {
      state.loggedIn = false;
    },
    setBlogEntries(state, blogs) {
      state.blogEntries = blogs;
    },
    pushBlogEntry(state, blog) {
      state.blogEntries.push(blog);
    },
    deleteBlog(state, _id) {
      const index = state.blogEntries.findIndex(x => {
        return x._id === _id;
      });
      state.blogEntries.splice(index, 1);
    },
    editBlogChangeCover(state, payload) {
      const index = state.blogEntries.findIndex(x => {
        return x._id.toString() === payload._id;
      });
      if (index != -1) {
        state.blogEntries[index].content = payload.content;
        state.blogEntries[index].title = payload.title;
        state.blogEntries[index].keywords = payload.keywords;
        state.blogEntries[index].coverImageUrl = payload.coverImageUrl;
      }

    },
    editBlog(state, payload) {
      const index = state.blogEntries.findIndex(x => {
        return x._id.toString() === payload._id;
      });
      if (index != -1) {
        state.blogEntries[index].content = payload.content;
        state.blogEntries[index].title = payload.title;
        state.blogEntries[index].keywords = payload.keywords;
      }

    }
  },
  actions: {
    async checkLogin({ commit, state }) {
      await axios.post(url+"/auth/giris-kontrol", {}, {
        withCredentials: true
      }).then(res => {
        commit("login");
      }).catch(err => {
        commit("logout");
      });
    },
    logout({ commit, state }, vm) {
      axios.post(url+"/auth/cikis", {}, {
        withCredentials: true
      }).then(res => {
        vm.$bvToast.toast("Çıkış yapıldı");
        commit("logout");
      }).catch(err => {
        if (err.response) {
          vm.$bvToast.toast(err.response.data.message);
        } else {
          vm.$bvToast.toast("Çıkış yapılamadı : " + JSON.stringify(err));
        }
      });
    },
    login({ commit, state }, vm) {
      axios
        .post(url+"/auth/giris", vm.form)
        .then(res => {
          vm.$bvToast.toast(res.data.message);
          vm.loading = false;
          commit("login");
          if (vm.redirect) {
            vm.$router.push(vm.redirect);
          } else {
            vm.$router.push("/");
          }
        })
        .catch(err => {
          if (err.response) {
            if (
              err.response.data.error.statusCode == 422 &&
              err.response.data.error.problems.length > 0
            ) {
              let s = "";
              err.response.data.error.problems.forEach(x => {
                s += " * " + x.msg;
              });
              vm.$bvToast.toast(err.response.data.message + ":     " + s);
            } else {
              vm.$bvToast.toast(err.response.data.message);
            }
          } else {
            vm.$bvToast.toast("Hata : " + JSON.stringify(err));
          }
          vm.loading = false;
        });
    },
    fetchBlogs({ commit, state }, vm) {
      axios
        .get(url+"/blog/blogEntries")
        .then(res => {
          commit("setBlogEntries", res.data.blogEntries);
          vm.blogsLoading = false;
        })
        .catch(err => {
          if (err.response) {
            vm.$bvToast.toast(err.response.data.message);
          } else {
            vm.$bvToast.toast("Bloglar getirilemedi : " + JSON.stringify(err));
          }
          vm.blogsLoading = false;
        });
    },
    addBlogEntry({ commit, state }, vm) {
      axios
        .post(url+"/blog/addBlogEntry", {
          content: vm.content,
          title: vm.title,
          keywords: vm.keywords,
          coverImageUrl: vm.coverImageBase64
        })
        .then(res => {
          vm.$bvToast.toast(res.data.message);
          commit("pushBlogEntry", {
            content: vm.content,
            title: vm.title,
            keywords: vm.keywords,
            coverImageUrl: vm.coverImageBase64,
            _id: res.data._id
          });
          vm.newBlogLoading = false;
        })
        .catch(err => {
          if (err.response) {
            if (
              err.response.data.error.statusCode == 422 &&
              err.response.data.error.problems.length > 0
            ) {
              let s = "";
              err.response.data.error.problems.forEach(x => {
                s += " * " + x.msg;
              });
              vm.$bvToast.toast(err.response.data.message + ":     " + s);
            } else {
              vm.$bvToast.toast(err.response.data.message);
            }
          } else {
            vm.$bvToast.toast("Bir hata oldu: " + JSON.stringify(err));
          }
          vm.newBlogLoading = false;
        });
    },
    deleteBlog({ commit, state }, { vm, _id }) {
      axios
        .delete(url+"/blog/deleteBlogEntry/" + _id.toString())
        .then(res => {
          vm.$bvToast.toast(res.data.message);
          const node = document.querySelector("#blog" + _id.toString());
          node.parentNode.removeChild(node);
          vm.deleteLoading = false;
          commit("deleteBlog", _id);
        })
        .catch(err => {
          if (err.response) {
            if (
              err.response.data.error.statusCode == 422 &&
              err.response.data.error.problems.length > 0
            ) {
              let s = "";
              err.response.data.error.problems.forEach(x => {
                s += " * " + x.msg;
              });
              vm.$bvToast.toast(err.response.data.message + ":     " + s);
            } else {
              vm.$bvToast.toast(err.response.data.message);
            }
          } else {
            vm.$bvToast.toast("Bir hata oldu: " + JSON.stringify(err));
          }
          vm.deleteLoading = false;
        });
    }
  }
});
