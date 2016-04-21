on.start = function () {
  state.groupBy = chix_group.groupBy.create()
  state.groupBy.on('group', function (group, by) {
    var $ = state.$
    var g = chix_group.send.create()
    output({xout: g.open()})
    output({out: g.write($.create(group)), by: $.create(by)})
    output({xout: g.close()})
  })
}


on.input.in = function () {
  state.groupBy.add($.get('in'))
}

on.input.by = function () {
  state.groupBy.setBy($.get('by'))
}

on.input.xin = function () {
  state.$ = $
  state.groupBy.receive($.get('xin'))
}
