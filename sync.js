module.exports = {
  name: "sync",
  ns: "group",
  async: true,
  description: "Synchronizes group items on 2 different ports",
  phrases: {
    active: "Synchronizing items"
  },
  ports: {
    input: {
      in1: {
        title: "In 1",
        type: "any",
        fn: function __IN1__(data, source, state, input, $, output, chix_group) {
          var r = function() {
            state.sync.add('out1', $.get('in1'))
          }.call(this);
          return {
            state: state,
            return: r
          };
        }
      },
      in2: {
        title: "In 2",
        type: "any",
        fn: function __IN2__(data, source, state, input, $, output, chix_group) {
          var r = function() {
            state.sync.add('out2', $.get('in2'))
          }.call(this);
          return {
            state: state,
            return: r
          };
        }
      },
      xin: {
        title: "In Group",
        type: "object",
        fn: function __XIN__(data, source, state, input, $, output, chix_group) {
          var r = function() {
            state.$ = $
            state.sync.receive($.get('xin'))
          }.call(this);
          return {
            state: state,
            return: r
          };
        }
      }
    },
    output: {
      out1: {
        title: "Out 1",
        type: "any"
      },
      out2: {
        title: "Out 2",
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
        state.sync = chix_group.sync.create(['out1', 'out2'])
        state.sync.on('sync', function(itemId, set) {
          var $ = state.$
          var out = {}
          Object.keys(set).forEach(function(port) {
            out[port] = $.create(set[port])
          })
          output(out)
        })
      }.call(this);
      return {
        state: state,
        return: r
      };
    }
  }
}