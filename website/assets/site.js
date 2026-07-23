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
