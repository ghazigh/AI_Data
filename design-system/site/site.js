/* Datalith site enhancement layer — progressive only.
   Everything here decorates static markup; the site is fully
   usable with JavaScript disabled (html.js gates hidden states). */
(function () {
  'use strict'
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  /* nav: scrolled state + mobile drawer */
  var nav = document.querySelector('[data-nav]')
  if (nav) {
    var onScroll = function () { nav.classList.toggle('is-scrolled', window.scrollY > 4) }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    var toggle = nav.querySelector('[data-nav-toggle]')
    if (toggle) {
      toggle.addEventListener('click', function () {
        var open = nav.classList.toggle('is-open')
        toggle.setAttribute('aria-expanded', String(open))
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
      })
    }
  }

  /* count-up numerals: <span data-countup="87" data-prefix=">" data-suffix="%" data-decimals="0"> */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-countup'))
    if (isNaN(target)) return
    var prefix = el.getAttribute('data-prefix') || ''
    var suffix = el.getAttribute('data-suffix') || ''
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10)
    if (reduced) { el.textContent = prefix + target.toFixed(decimals) + suffix; return }
    var t0 = null
    var DUR = 1200
    function frame(t) {
      if (t0 === null) t0 = t
      var p = Math.min((t - t0) / DUR, 1)
      var eased = 1 - Math.pow(1 - p, 3)
      el.textContent = prefix + (target * eased).toFixed(decimals) + suffix
      if (p < 1) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  }

  /* score meters: sweep the marker and count the numeral */
  function animateMeter(root) {
    var meter = root.querySelector('.dl-scoremeter-scale [role="meter"], .dl-scoremeter-scale')
    var marker = root.querySelector('.dl-scoremeter-marker')
    var value = root.querySelector('.dl-scoremeter-value')
    if (!marker || !value) return
    var target = parseInt(marker.style.left, 10) || 0
    if (reduced) return
    var numNode = value.childNodes[0]
    marker.style.transition = 'none'
    marker.style.left = '0%'
    void marker.offsetWidth
    marker.style.transition = 'left 1.2s cubic-bezier(0.22, 1, 0.36, 1)'
    marker.style.left = target + '%'
    var t0 = null
    function frame(t) {
      if (t0 === null) t0 = t
      var p = Math.min((t - t0) / 1200, 1)
      var eased = 1 - Math.pow(1 - p, 3)
      if (numNode) numNode.nodeValue = String(Math.round(target * eased))
      if (p < 1) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
    void meter
  }

  /* banking use cases: tabs over runs that are all present in the markup, so
     the section is complete with JavaScript off — this only narrows it to one
     at a time and replays the step animation on each switch. */
  var uc = document.querySelector('[data-usecases]')
  if (uc) {
    var tabs = [].slice.call(uc.querySelectorAll('[data-uc-tab]'))
    var panels = [].slice.call(uc.querySelectorAll('[data-uc-panel]'))
    var show = function (id, focus) {
      tabs.forEach(function (t) {
        var on = t.getAttribute('data-uc-tab') === id
        t.classList.toggle('is-active', on)
        t.setAttribute('aria-selected', String(on))
        t.tabIndex = on ? 0 : -1
        if (on && focus) t.focus()
      })
      panels.forEach(function (pn) {
        var on = pn.getAttribute('data-uc-panel') === id
        // removing the class and forcing a reflow restarts the staggered run
        pn.classList.remove('is-active')
        if (!on) return
        void pn.offsetWidth
        pn.classList.add('is-active')
      })
    }
    uc.addEventListener('click', function (e) {
      var t = e.target.closest ? e.target.closest('[data-uc-tab]') : null
      if (t) show(t.getAttribute('data-uc-tab'), false)
    })
    uc.addEventListener('keydown', function (e) {
      var i = tabs.indexOf(document.activeElement)
      if (i < 0) return
      var next = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? i + 1
        : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? i - 1 : -1
      if (next < 0) return
      e.preventDefault()
      var t = tabs[(next + tabs.length) % tabs.length]
      show(t.getAttribute('data-uc-tab'), true)
    })
    tabs.forEach(function (t, i) { t.tabIndex = i === 0 ? 0 : -1 })
  }

  /* banking board: wires the agents a bank wants to the data each one reads.
     The markup is server-rendered and carries the dependencies (data-needs)
     and the amber state, so this only draws the wires and tracks selection —
     with JavaScript off the two columns still read as lists. */
  var board = document.querySelector('[data-board]')
  if (board) {
    var wires = board.querySelector('[data-wires]')
    var agentCol = board.querySelector('[data-agents]')
    var domCol = board.querySelector('[data-domains]')
    var paths = []
    var sel = null
    var hover = null
    var boardSeen = false
    var drawn = false

    var isLow = function (id) {
      var n = domCol.querySelector('[data-dom="' + id + '"]')
      return !!n && n.hasAttribute('data-low')
    }
    var each = function (list, fn) { Array.prototype.forEach.call(list, fn) }

    function animateIn() {
      paths.forEach(function (p, i) {
        var len = p.getTotalLength()
        p.style.strokeDasharray = len
        p.style.strokeDashoffset = len
        p.style.transition = 'stroke-dashoffset 0.7s ease ' + (i * 26) + 'ms, stroke 0.2s, opacity 0.2s'
        requestAnimationFrame(function () { p.style.strokeDashoffset = '0' })
      })
    }

    function drawWires() {
      var cr = board.getBoundingClientRect()
      if (!cr.width || window.getComputedStyle(wires).display === 'none') return
      wires.setAttribute('viewBox', '0 0 ' + cr.width + ' ' + cr.height)
      while (wires.firstChild) wires.removeChild(wires.firstChild)
      paths = []
      each(agentCol.querySelectorAll('[data-agent]'), function (an) {
        var ar = an.getBoundingClientRect()
        an.getAttribute('data-needs').split(' ').forEach(function (id) {
          var dn = domCol.querySelector('[data-dom="' + id + '"]')
          if (!dn) return
          var dr = dn.getBoundingClientRect()
          var x1 = ar.right - cr.left, y1 = ar.top + ar.height / 2 - cr.top
          var x2 = dr.left - cr.left, y2 = dr.top + dr.height / 2 - cr.top
          var dx = (x2 - x1) * 0.5
          var p = document.createElementNS('http://www.w3.org/2000/svg', 'path')
          p.setAttribute('class', 'st-wire')
          p.setAttribute('d', 'M' + x1 + ' ' + y1 + ' C' + (x1 + dx) + ' ' + y1 + ',' +
            (x2 - dx) + ' ' + y2 + ',' + x2 + ' ' + y2)
          p.setAttribute('data-agent', an.getAttribute('data-agent'))
          p.setAttribute('data-dom', id)
          wires.appendChild(p)
          paths.push(p)
        })
      })
      if (boardSeen && !drawn && !reduced) { drawn = true; animateIn() }
      paint()
    }

    function paint() {
      var s = sel || hover
      board.classList.toggle('has-sel', !!sel)
      each(board.querySelectorAll('.st-node'), function (n) {
        n.classList.remove('is-on')
        n.setAttribute('aria-pressed', 'false')
      })
      paths.forEach(function (p) { p.classList.remove('is-on', 'is-warn') })
      if (!s) return
      if (s.agent !== null) {
        var a = agentCol.querySelector('[data-agent="' + s.agent + '"]')
        a.classList.add('is-on')
        if (sel) a.setAttribute('aria-pressed', 'true')
        a.getAttribute('data-needs').split(' ').forEach(function (id) {
          var d = domCol.querySelector('[data-dom="' + id + '"]')
          if (d) d.classList.add('is-on')
        })
        paths.forEach(function (p) {
          if (p.getAttribute('data-agent') !== String(s.agent)) return
          p.classList.add('is-on')
          if (isLow(p.getAttribute('data-dom'))) p.classList.add('is-warn')
        })
      } else {
        var dm = domCol.querySelector('[data-dom="' + s.dom + '"]')
        dm.classList.add('is-on')
        if (sel) dm.setAttribute('aria-pressed', 'true')
        each(agentCol.querySelectorAll('[data-agent]'), function (n) {
          if (n.getAttribute('data-needs').split(' ').indexOf(s.dom) > -1) n.classList.add('is-on')
        })
        paths.forEach(function (p) {
          if (p.getAttribute('data-dom') !== s.dom) return
          p.classList.add('is-on')
          if (isLow(s.dom)) p.classList.add('is-warn')
        })
      }
    }

    var nodeOf = function (t) { return t && t.closest ? t.closest('.st-node') : null }
    var specOf = function (n) {
      return n.hasAttribute('data-agent')
        ? { agent: n.getAttribute('data-agent'), dom: null }
        : { agent: null, dom: n.getAttribute('data-dom') }
    }
    board.addEventListener('click', function (e) {
      var n = nodeOf(e.target)
      if (!n) return
      var next = specOf(n)
      sel = (sel && sel.agent === next.agent && sel.dom === next.dom) ? null : next
      hover = null
      paint()
    })
    /* hover previews without dimming; a click is what holds a selection */
    board.addEventListener('mouseover', function (e) {
      var n = nodeOf(e.target)
      if (sel) return
      hover = n ? specOf(n) : null
      paint()
    })
    board.addEventListener('mouseleave', function () { hover = null; paint() })
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && sel) { sel = null; paint() }
    })

    if ('ResizeObserver' in window) new ResizeObserver(drawWires).observe(board)
    else window.addEventListener('resize', drawWires)
    if ('IntersectionObserver' in window) {
      var boardIO = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting) return
        boardIO.disconnect()
        boardSeen = true
        drawWires()
      }, { threshold: 0.12 })
      boardIO.observe(board)
    } else { boardSeen = true }
    drawWires()
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawWires)
  }

  /* one observer for every scroll-triggered behaviour */
  var seen = new WeakSet()
  function activate(el) {
    if (seen.has(el)) return
    seen.add(el)
    if (el.hasAttribute('data-reveal') || el.hasAttribute('data-draw')) el.classList.add('is-visible')
    if (el.hasAttribute('data-reveal-group')) {
      Array.prototype.forEach.call(el.children, function (child, i) {
        child.style.transitionDelay = reduced ? '' : (i * 90) + 'ms'
        child.classList.add('is-visible')
      })
    }
    if (el.hasAttribute('data-scoremeter')) animateMeter(el)
    el.querySelectorAll('[data-countup]').forEach(animateCount)
    if (el.hasAttribute('data-countup')) animateCount(el)
  }

  var targets = document.querySelectorAll('[data-reveal], [data-reveal-group], [data-draw], [data-scoremeter], [data-countup]')
  // Only observe top-level targets; nested countups are handled by their container.
  var observed = Array.prototype.filter.call(targets, function (el) {
    return !(el.hasAttribute('data-countup') && el.closest('[data-reveal], [data-reveal-group], [data-scoremeter]') !== el && el.parentElement && el.parentElement.closest('[data-reveal], [data-reveal-group], [data-scoremeter], [data-draw]'))
  })

  if (!('IntersectionObserver' in window)) {
    observed.forEach(activate)
    return
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        activate(entry.target)
        io.unobserve(entry.target)
      }
    })
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 })
  observed.forEach(function (el) { io.observe(el) })
})()
