on.start = function () {
  state.sync = chix_group.sync.create(['out1', 'out2'])
  state.sync.on('sync', function (itemId, set) {
    var $ = state.$
    var out = {}
    Object.keys(set).forEach(function (port) {
      out[port] = set[port]
    })
    output(out)
  })
}

on.input.in1 = function () {
  state.sync.add('out1', $.get('in1'))
}

on.input.in2 = function () {
  state.sync.add('out2', $.get('in2'))
}

on.input.xin = function () {
  state.$ = $
  state.sync.receive($.get('xin'))
}
