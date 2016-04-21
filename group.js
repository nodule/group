module.exports = {
  name: "group",
  ns: "group",
  async: true,
  description: "Groups input into an array",
  phrases: {
    active: "Grouping object"
  },
  ports: {
    input: {
      xin: {
        title: "In Group",
        type: "any",
        fn: function __XIN__(data, source, state, input, $, output, chix_group) {
          var r = function() {
            state.group.receive($.get('xin'))
            state.$ = $
          }.call(this);
          return {
            state: state,
            return: r
          };
        }
      },
      "in": {
        title: "Object",
        type: "any",
        fn: function __IN__(data, source, state, input, $, output, chix_group) {
          var r = function() {
            state.group.add($.get('in'))
            state.$ = $
          }.call(this);
          return {
            state: state,
            return: r
          };
        }
      }
    },
    output: {
      xout: {
        title: "Xout",
        type: "array"
      },
      out: {
        title: "out",
        group: "result",
        type: "any"
      }
    }
  },
  dependencies: {
    npm: {
      "chix-group": require('chix-group')
    }
  },
  state: {},
  on: {
    start: function __ONSTART__(data, source, state, input, $, output, chix_group) {
      var r = function() {
        state.group = chix_group.recv.create()
        state.$ = null
        state.group.on('group', function groupHandler(group) {
          var p = state.$.create(group)
          p.removeMeta('chix-group')
          output({
            out: p
          })
        })
      }.call(this);
      return {
        state: state,
        return: r
      };
    }
  }
}