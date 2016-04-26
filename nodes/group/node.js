on.start = function start() {
  state.group = chix_group.recv.create()
  state.$ = null
  state.group.on('group', function groupHandler(group) {
    var p = state.$.create(group.map((p) => p.read(p.owner)))
    p.removeMeta('chix-group')
    output({out: p})
  })
}

on.input.in = function () {
  state.group.add($.get('in'))
  state.$ = $
};

on.input.xin = function () {
  state.group.receive($.get('xin'))
  state.$ = $
};
