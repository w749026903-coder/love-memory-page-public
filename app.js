(function () {
  const config = window.coupleConfig;
  const storageKeys = {
    unlocked: "our-days-unlocked",
    brandLit: "our-days-brand-lit",
    litWishes: "our-days-lit-wishes",
    litMoments: "our-days-lit-moments",
    litCalendarMonths: "our-days-lit-calendar-months",
  };
  const calendarYears = Array.isArray(config.calendar.years) && config.calendar.years.length
    ? config.calendar.years
    : [config.calendar.initialYear || config.calendar.year || new Date().getFullYear()];
  let activeCalendarYear = calendarYears.includes(config.calendar.initialYear)
    ? config.calendar.initialYear
    : calendarYears[0];

  const icons = {
    paw:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.4 10.4c1.3 0 2.3-1.3 2.3-3S8.7 4.3 7.4 4.3 5.1 5.7 5.1 7.3s1 3.1 2.3 3.1Zm9.2 0c1.3 0 2.3-1.3 2.3-3s-1-3.1-2.3-3.1-2.3 1.4-2.3 3.1 1 3 2.3 3Zm-13.3 4c1.1.5 2.5-.2 3.2-1.6.7-1.4.4-3-.7-3.5-1.1-.6-2.5.1-3.2 1.5-.7 1.4-.4 3 .7 3.6Zm17.4 0c1.1-.6 1.4-2.2.7-3.6-.7-1.4-2.1-2.1-3.2-1.5-1.1.5-1.4 2.1-.7 3.5.7 1.4 2.1 2.1 3.2 1.6ZM12 11.7c-3.1 0-6 3-6 5.8 0 1.5 1.1 2.2 2.5 2.2 1.2 0 2.1-.7 3.5-.7s2.3.7 3.5.7c1.4 0 2.5-.7 2.5-2.2 0-2.8-2.9-5.8-6-5.8Z"/></svg>',
    hug:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.2 9.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7.6 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM4 20.6v-4.1a5 5 0 0 1 8-4 5 5 0 0 1 8 4v4.1H4Zm4.3-7.2a3 3 0 0 0-3 3v2.8h5.6v-2.8a3 3 0 0 0-2.6-3Zm7.4 0a3 3 0 0 0-2.6 3v2.8h5.6v-2.8a3 3 0 0 0-3-3Z"/></svg>',
    heart:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.6-4.8-9.5-10.2C1.2 7 3.4 3.6 7.1 3.6c2 0 3.7 1.1 4.9 2.9 1.2-1.8 2.9-2.9 4.9-2.9 3.7 0 5.9 3.4 4.6 7.2C19.6 16.2 12 21 12 21Z"/></svg>',
    spark:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2Zm6.1 11.8.9 2.5 2.5.9-2.5.9-.9 2.5-.9-2.5-2.5-.9 2.5-.9.9-2.5ZM5.8 14.2l1.1 3.1 3.1 1.1-3.1 1.1-1.1 3.1-1.1-3.1-3.1-1.1 3.1-1.1 1.1-3.1Z"/></svg>',
    rose:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.1 3.3c3.2 0 5.7 2.1 5.7 4.8 0 2.5-2.1 4.5-4.9 4.8v2.4c2.3-.9 4.9-.5 7 1.2-2.5 2.3-5.4 2.7-7.8 1.2V22h-1.8v-4.3c-2.4 1.5-5.3 1.1-7.8-1.2 2.1-1.7 4.7-2.1 7-1.2v-2.4c-2.8-.4-4.9-2.4-4.9-4.8 0-2.7 2.4-4.8 5.7-4.8h1.8Z"/></svg>',
    cake:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.2c1.1 1.2 1.7 2.3 1.7 3.3a1.7 1.7 0 1 1-3.4 0c0-1 .6-2.1 1.7-3.3ZM5.2 10.7h13.6a2 2 0 0 1 2 2v7.1H3.2v-7.1a2 2 0 0 1 2-2Zm.2 5.5v1.9h13.2v-1.9c-.8.4-1.7.4-2.5-.1a2.8 2.8 0 0 1-3.1 0 2.8 2.8 0 0 1-3.1 0 2.8 2.8 0 0 1-3.1 0c-.5.3-1 .4-1.4.1ZM8 7.3h8v2H8v-2Z"/></svg>',
  };

  const iconAssets = {
    paw: "./assets/images/moment-icon-paw.jpg",
    hug: "./assets/images/moment-icon-hug.jpg",
    heart: "./assets/images/moment-icon-heart.jpg",
    spark: "./assets/images/moment-icon-spark.jpg",
    rose: "./assets/images/moment-icon-rose.jpg",
    cake: "./assets/images/moment-icon-cake.jpg",
  };

  const $ = (selector) => document.querySelector(selector);
  let revealObserver;

  const refs = {
    gate: $("#gate"),
    gateForm: $("#gateForm"),
    passwordInput: $("#passwordInput"),
    gateMessage: $("#gateMessage"),
    site: $("#site"),
    brandLoveButton: $("#brandLoveButton"),
    brandMark: $(".brand-mark"),
    brandName: $("#brandName"),
    heroEyebrow: $("#heroEyebrow"),
    heroTitle: $("#heroTitle"),
    heroNote: $("#heroNote"),
    daysCard: $("#daysCard"),
    daysTogether: $("#daysTogether"),
    hoursTogether: $("#hoursTogether"),
    minutesTogether: $("#minutesTogether"),
    secondsTogether: $("#secondsTogether"),
    letterTitle: $("#letterTitle"),
    letterBody: $("#letterBody"),
    calendarTitle: $("#calendarTitle"),
    calendarBoard: $("#calendarBoard"),
    momentGrid: $("#momentGrid"),
    timelineList: $("#timelineList"),
    wishList: $("#wishList"),
    footerText: $("#footerText"),
  };

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function parseLocalDate(date) {
    const [year, month, day] = String(date).split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  function calendarYearIndex(year = activeCalendarYear) {
    return Math.max(0, calendarYears.indexOf(year));
  }

  function startOfToday(now = new Date()) {
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }

  function dayDiff(from, to) {
    const msPerDay = 24 * 60 * 60 * 1000;
    return Math.ceil((startOfToday(to) - startOfToday(from)) / msPerDay);
  }

  function nextYearlyDate(month, day, now = new Date()) {
    const today = startOfToday(now);
    let next = new Date(today.getFullYear(), month - 1, day);
    if (next < today) {
      next = new Date(today.getFullYear() + 1, month - 1, day);
    }
    return next;
  }

  function resolveMomentDate(moment, now = new Date()) {
    if (moment.type === "yearly") {
      return nextYearlyDate(moment.month, moment.day, now);
    }
    return parseLocalDate(moment.date);
  }

  function formatDate(date) {
    if (typeof date === "string" && !date.includes("-")) {
      return date;
    }
    const parsed = typeof date === "string" ? parseLocalDate(date) : date;
    return `${parsed.getFullYear()}.${pad(parsed.getMonth() + 1)}.${pad(parsed.getDate())}`;
  }

  function formatMonthDay(moment) {
    if (moment.type === "yearly") {
      return `每年 ${moment.month} 月 ${moment.day} 日`;
    }
    return formatDate(moment.date);
  }

  function cleanMomentLabel(title) {
    return String(title)
      .replace(/已经/g, "")
      .replace(/还剩/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function normalizeCalendarMark(mark, year) {
    if (mark.year && Number(mark.year) !== Number(year)) return null;
    if (!mark.month || !mark.day || !mark.label) return null;
    return {
      label: mark.label,
      month: Number(mark.month),
      day: Number(mark.day),
      dayText: mark.dayText || pad(mark.day),
      tone: mark.tone || "rose",
      kind: mark.kind || "private",
    };
  }

  function collectCalendarMarks(year) {
    const marks = [];
    const seen = new Set();
    const addMark = (mark) => {
      const normalized = normalizeCalendarMark(mark, year);
      if (!normalized) return;
      const key = `${normalized.month}-${normalized.dayText}-${normalized.label}`;
      if (seen.has(key)) return;
      seen.add(key);
      marks.push(normalized);
    };

    (config.calendar.featured || []).forEach(addMark);
    ((config.calendar.festivalsByYear || {})[year] || []).forEach(addMark);
    ((config.calendar.officialHolidayArrangementsByYear || {})[year] || []).forEach(addMark);
    config.anniversaries.forEach((moment) => {
      if (moment.type === "yearly") {
        addMark({
          label: cleanMomentLabel(moment.title),
          month: moment.month,
          day: moment.day,
          tone: moment.tone,
          kind: "moment",
        });
        return;
      }

      if (!moment.date) return;
      const date = parseLocalDate(moment.date);
      if (date.getFullYear() !== Number(year)) return;
      addMark({
        label: cleanMomentLabel(moment.title),
        month: date.getMonth() + 1,
        day: date.getDate(),
        tone: moment.tone,
        kind: "moment",
      });
    });

    marks.sort((a, b) => a.month - b.month || a.day - b.day || a.label.localeCompare(b.label, "zh-CN"));
    return marks;
  }

  function getLitWishIds() {
    try {
      const stored = JSON.parse(localStorage.getItem(storageKeys.litWishes) || "[]");
      return new Set(Array.isArray(stored) ? stored : []);
    } catch (error) {
      return new Set();
    }
  }

  function saveLitWishIds(ids) {
    localStorage.setItem(storageKeys.litWishes, JSON.stringify(Array.from(ids)));
  }

  function getLitMomentIds() {
    try {
      const stored = JSON.parse(localStorage.getItem(storageKeys.litMoments) || "[]");
      return new Set(Array.isArray(stored) ? stored : []);
    } catch (error) {
      return new Set();
    }
  }

  function saveLitMomentIds(ids) {
    localStorage.setItem(storageKeys.litMoments, JSON.stringify(Array.from(ids)));
  }

  function getLitCalendarMonthIds() {
    try {
      const stored = JSON.parse(localStorage.getItem(storageKeys.litCalendarMonths) || "[]");
      return new Set(Array.isArray(stored) ? stored : []);
    } catch (error) {
      return new Set();
    }
  }

  function saveLitCalendarMonthIds(ids) {
    localStorage.setItem(storageKeys.litCalendarMonths, JSON.stringify(Array.from(ids)));
  }

  function getMomentKey(moment, index) {
    const dateKey = moment.date || `${moment.month || "x"}-${moment.day || "x"}`;
    return `${index}-${dateKey}-${moment.title}`;
  }

  function getCalendarMonthKey(year, month) {
    return `${year}-${pad(month)}`;
  }

  function digitClass(value) {
    const length = String(Math.abs(Number(value) || 0)).length;
    if (length >= 5) return "digits-5";
    if (length === 4) return "digits-4";
    if (length === 3) return "digits-3";
    return "digits-2";
  }

  function setDigitClass(element, value) {
    element.classList.remove("digits-2", "digits-3", "digits-4", "digits-5");
    element.classList.add(digitClass(value));
  }

  function getClockParts(now = new Date()) {
    const start = new Date(config.startedAt);
    const total = Math.max(0, now - start);
    const totalSeconds = Math.floor(total / 1000);
    return {
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor((totalSeconds % 86400) / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
    };
  }

  function renderShellText() {
    document.title = `${config.names.display} 的纪念日`;
    refs.brandName.textContent = config.names.display;
    refs.heroEyebrow.textContent = config.hero.eyebrow;
    refs.heroTitle.textContent = config.hero.title;
    refs.heroNote.textContent = config.hero.note;
    refs.letterTitle.textContent = config.letter.title;
    refs.letterBody.textContent = config.letter.body;
    refs.calendarTitle.textContent = config.calendar.title;
    refs.footerText.textContent = config.footer;
  }

  function renderLoveClock(now = new Date()) {
    const parts = getClockParts(now);
    refs.daysTogether.textContent = String(parts.days);
    refs.hoursTogether.textContent = pad(parts.hours);
    refs.minutesTogether.textContent = pad(parts.minutes);
    refs.secondsTogether.textContent = pad(parts.seconds);
    setDigitClass(refs.daysCard, parts.days);
  }

  function renderCalendar(year = activeCalendarYear, options = {}) {
    refs.calendarBoard.classList.remove("is-leaving", "is-entering");
    activeCalendarYear = calendarYears.includes(year) ? year : calendarYears[0];
    const yearIndex = calendarYearIndex(activeCalendarYear);
    const previousYear = calendarYears[yearIndex - 1];
    const nextYear = calendarYears[yearIndex + 1];
    const litCalendarMonthIds = getLitCalendarMonthIds();
    const marks = collectCalendarMarks(activeCalendarYear);
    const marksByMonth = new Map();
    marks.forEach((event) => {
      const key = String(event.month);
      if (!marksByMonth.has(key)) marksByMonth.set(key, []);
      marksByMonth.get(key).push(event);
    });
    const pendingNotice = (config.calendar.pendingNoticeByYear || {})[activeCalendarYear];
    const holidayCount = marks.filter((mark) => mark.kind === "holiday").length;
    const festivalCount = marks.filter((mark) => mark.kind === "festival").length;
    const yearNote = holidayCount
      ? `${activeCalendarYear} 年节日日期和官方放假调休都已标记。`
      : festivalCount
        ? pendingNotice || `${activeCalendarYear} 年节日日期已标出。`
        : `${activeCalendarYear} 年暂时只显示我们的纪念日。`;

    const months = Array.from({ length: 12 }, (_, index) => {
      const month = index + 1;
      const marks = marksByMonth.get(String(month)) || [];
      const monthKey = getCalendarMonthKey(activeCalendarYear, month);
      const isLit = litCalendarMonthIds.has(monthKey);
      return `
        <article class="calendar-month ${marks.length ? "has-marks" : ""} ${isLit ? "is-lit" : ""} month-${month}" role="button" tabindex="0" aria-pressed="${isLit ? "true" : "false"}" data-calendar-month-id="${escapeHtml(monthKey)}" style="--month-index: ${index};">
          <span class="month-heart" aria-hidden="true">♡</span>
          <div class="month-label">${pad(month)}月</div>
          <div class="month-marks">
            ${
              marks.length
                ? marks
                    .map(
                      (mark) => `
                        <span class="date-pill tone-${mark.tone} kind-${mark.kind}">
                          <b>${escapeHtml(mark.dayText)}</b>${escapeHtml(mark.label)}
                        </span>
                      `,
                    )
                    .join("")
                : '<span class="date-empty">等待好日子</span>'
            }
          </div>
        </article>
      `;
    }).join("");

    refs.calendarBoard.innerHTML = `
      <div class="calendar-year-switcher" aria-label="切换日历年份">
        <button class="calendar-nav" type="button" data-calendar-year="${previousYear || ""}" ${previousYear ? "" : "disabled"} aria-label="上一年"><span aria-hidden="true">‹</span></button>
        <strong>${activeCalendarYear}</strong>
        <button class="calendar-nav" type="button" data-calendar-year="${nextYear || ""}" ${nextYear ? "" : "disabled"} aria-label="下一年"><span aria-hidden="true">›</span></button>
      </div>
      <p class="calendar-year-note">${escapeHtml(yearNote)}</p>
      <div class="calendar-months">${months}</div>
    `;

    refs.calendarBoard.style.setProperty("--calendar-direction", String(options.direction || 1));
    if (options.animate) {
      refs.calendarBoard.classList.add("is-entering");
      window.setTimeout(() => refs.calendarBoard.classList.remove("is-entering"), 560);
    }

    refs.calendarBoard.querySelectorAll("[data-calendar-year]").forEach((button) => {
      button.addEventListener("click", () => {
        const targetYear = Number(button.dataset.calendarYear);
        if (targetYear) switchCalendarYear(targetYear);
      });
    });
    setupCalendarMonthInteractions();
    hydrateInteractive();
  }

  function switchCalendarYear(targetYear) {
    if (!calendarYears.includes(targetYear) || targetYear === activeCalendarYear) return;
    const direction = targetYear > activeCalendarYear ? 1 : -1;
    refs.calendarBoard.style.setProperty("--calendar-direction", String(direction));
    refs.calendarBoard.classList.add("is-leaving");
    window.setTimeout(() => renderCalendar(targetYear, { animate: true, direction }), 150);
  }

  function addCalendarHeartPop(card) {
    const pop = document.createElement("span");
    pop.className = "calendar-heart-pop";
    pop.textContent = "♡";
    card.appendChild(pop);
    window.setTimeout(() => pop.remove(), 720);
  }

  function toggleCalendarMonth(card) {
    const litCalendarMonthIds = getLitCalendarMonthIds();
    const monthId = card.dataset.calendarMonthId;
    const isLit = !litCalendarMonthIds.has(monthId);
    if (isLit) {
      litCalendarMonthIds.add(monthId);
    } else {
      litCalendarMonthIds.delete(monthId);
    }
    saveLitCalendarMonthIds(litCalendarMonthIds);
    card.classList.toggle("is-lit", isLit);
    card.setAttribute("aria-pressed", String(isLit));
    addCalendarHeartPop(card);
  }

  function setupCalendarMonthInteractions() {
    refs.calendarBoard.querySelectorAll(".calendar-month").forEach((card) => {
      card.addEventListener("click", () => toggleCalendarMonth(card));
      card.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        toggleCalendarMonth(card);
      });
    });
  }

  function renderMoments(now = new Date()) {
    const litMomentIds = getLitMomentIds();
    refs.momentGrid.innerHTML = config.anniversaries
      .map((moment, index) => {
        const target = resolveMomentDate(moment, now);
        const isElapsedType = moment.type === "elapsed";
        const isPastCountdown = !isElapsedType && moment.type !== "yearly" && target < startOfToday(now);
        const elapsed = isElapsedType || isPastCountdown;
        const days = elapsed
          ? Math.max(0, Math.floor((startOfToday(now) - startOfToday(target)) / 86400000))
          : Math.max(0, dayDiff(now, target));
        const meta = elapsed ? formatDate(moment.date) : formatMonthDay(moment);
        const label = elapsed ? "已经" : "还剩";
        const tone = moment.tone || ["peach", "rose", "blue", "gold"][index % 4];
        const momentKey = getMomentKey(moment, index);
        const isLit = litMomentIds.has(momentKey);
        const iconSrc = iconAssets[moment.icon];
        return `
          <article class="moment-card pet-card tone-card-${tone} ${digitClass(days)} ${isLit ? "is-lit" : ""}" role="button" tabindex="0" aria-pressed="${isLit ? "true" : "false"}" data-moment-id="${escapeHtml(momentKey)}">
            <div class="moment-sticker" aria-hidden="true"></div>
            <div class="moment-icon">
              ${iconSrc ? `<img src="${iconSrc}" alt="" loading="lazy" />` : icons[moment.icon] || icons.heart}
            </div>
            <div class="moment-main">
              <h3>${escapeHtml(moment.title)}</h3>
              <p>${escapeHtml(meta)}</p>
              <small>${escapeHtml(moment.note)}</small>
            </div>
            <div class="moment-count" aria-label="${label} ${days} 天">
              <strong>${days}</strong>
              <span>天</span>
            </div>
          </article>
        `;
      })
      .join("");
    observeReveal();
    setupMomentInteractions();
    hydrateInteractive();
  }

  function toggleMomentCard(card) {
    const litMomentIds = getLitMomentIds();
    const momentId = card.dataset.momentId;
    const isLit = !litMomentIds.has(momentId);
    if (isLit) {
      litMomentIds.add(momentId);
    } else {
      litMomentIds.delete(momentId);
    }
    saveLitMomentIds(litMomentIds);
    card.classList.toggle("is-lit", isLit);
    card.setAttribute("aria-pressed", String(isLit));
  }

  function setupMomentInteractions() {
    refs.momentGrid.querySelectorAll(".moment-card").forEach((card) => {
      card.addEventListener("click", () => toggleMomentCard(card));
      card.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        toggleMomentCard(card);
      });
    });
  }

  function renderTimeline() {
    refs.timelineList.innerHTML = config.timeline
      .map(
        (item) => `
          <article class="timeline-item">
            <time>${escapeHtml(formatDate(item.date))}</time>
            <div class="paper-note">
              <h3>${escapeHtml(item.title)}</h3>
              <p>${escapeHtml(item.text)}</p>
            </div>
          </article>
        `,
      )
      .join("");
  }

  function renderWishes() {
    const litWishIds = getLitWishIds();
    refs.wishList.innerHTML = config.defaultWishes
      .map(
        (wish) => `
          <li>
            <button class="wish-item ${litWishIds.has(wish.id) ? "is-lit" : ""}" type="button" data-wish-id="${escapeHtml(wish.id)}" aria-pressed="${litWishIds.has(wish.id) ? "true" : "false"}">
              <span class="wish-heart" aria-hidden="true">♡</span>
              <span>${escapeHtml(wish.text)}</span>
            </button>
          </li>
        `,
      )
      .join("");
    setupWishInteractions();
    hydrateInteractive();
  }

  function setupWishInteractions() {
    refs.wishList.querySelectorAll(".wish-item").forEach((button) => {
      button.addEventListener("click", () => {
        const litWishIds = getLitWishIds();
        const wishId = button.dataset.wishId;
        const isLit = !litWishIds.has(wishId);
        if (isLit) {
          litWishIds.add(wishId);
        } else {
          litWishIds.delete(wishId);
        }
        saveLitWishIds(litWishIds);
        button.classList.toggle("is-lit", isLit);
        button.setAttribute("aria-pressed", String(isLit));
      });
    });
  }

  function addRipple(element, event) {
    const rect = element.getBoundingClientRect();
    const x = event.clientX ? event.clientX - rect.left : rect.width / 2;
    const y = event.clientY ? event.clientY - rect.top : rect.height / 2;
    const ripple = document.createElement("span");
    ripple.className = "liquid-ripple";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.setProperty("--ripple-size", `${Math.max(rect.width, rect.height) * 1.35}px`);
    element.appendChild(ripple);
    window.setTimeout(() => ripple.remove(), 520);
  }

  function syncPointer(element, event) {
    const rect = element.getBoundingClientRect();
    const point = event.touches ? event.touches[0] : event;
    if (!point) return;
    const x = ((point.clientX - rect.left) / rect.width) * 100;
    const y = ((point.clientY - rect.top) / rect.height) * 100;
    element.style.setProperty("--pointer-x", `${Math.max(0, Math.min(100, x))}%`);
    element.style.setProperty("--pointer-y", `${Math.max(0, Math.min(100, y))}%`);
  }

  function resetPointer(element) {
    element.classList.remove("is-pressing");
    element.style.setProperty("--pointer-x", "50%");
    element.style.setProperty("--pointer-y", "50%");
  }

  function hydrateInteractive() {
    const surfaces = document.querySelectorAll(
      ".soft-glass, .interactive-liquid, .wish-item, .moment-card, .paper-note, .calendar-month",
    );
    surfaces.forEach((element) => {
      if (element.dataset.liquidReady) return;
      element.dataset.liquidReady = "true";
      element.addEventListener("pointermove", (event) => syncPointer(element, event));
      element.addEventListener("pointerenter", (event) => syncPointer(element, event));
      element.addEventListener("pointerdown", (event) => {
        syncPointer(element, event);
        element.classList.add("is-pressing");
      });
      element.addEventListener("pointerup", () => element.classList.remove("is-pressing"));
      element.addEventListener("pointercancel", () => resetPointer(element));
      element.addEventListener("pointerleave", () => resetPointer(element));
    });

    document.querySelectorAll(".interactive-liquid").forEach((element) => {
      if (element.dataset.rippleReady) return;
      element.dataset.rippleReady = "true";
      element.addEventListener("click", (event) => addRipple(element, event));
    });
  }

  function showBrandBurst(event) {
    event.preventDefault();
    setBrandLit(true);
    const words = ["♡", "喜欢 +1", "✦"];
    const rect = refs.brandLoveButton.getBoundingClientRect();
    for (let index = 0; index < 3; index += 1) {
      const pop = document.createElement("span");
      pop.className = "brand-pop";
      pop.textContent = words[index];
      const x = rect.left + rect.width * (0.28 + Math.random() * 0.48);
      const y = rect.top + rect.height * (0.28 + Math.random() * 0.42);
      pop.style.left = `${x}px`;
      pop.style.top = `${y}px`;
      pop.style.setProperty("--pop-x", `${Math.round((Math.random() - 0.5) * 80)}px`);
      pop.style.setProperty("--pop-y", `${Math.round(-34 - Math.random() * 44)}px`);
      pop.style.animationDelay = `${index * 36}ms`;
      document.body.appendChild(pop);
      window.setTimeout(() => pop.remove(), 980);
    }
  }

  function setBrandLit(isLit) {
    refs.brandLoveButton.classList.toggle("is-lit", isLit);
    refs.brandLoveButton.setAttribute("aria-pressed", String(isLit));
    refs.brandMark.textContent = "♡";
    if (isLit) {
      localStorage.setItem(storageKeys.brandLit, "true");
    }
  }

  function unlock() {
    refs.gateForm.classList.add("is-unlocking");
    refs.gate.classList.add("is-hidden");
    refs.site.classList.remove("is-locked");
    sessionStorage.setItem(storageKeys.unlocked, "true");
    window.setTimeout(() => {
      refs.gate.setAttribute("hidden", "");
    }, 720);
  }

  function setupGate() {
    if (sessionStorage.getItem(storageKeys.unlocked) === "true") {
      refs.site.classList.remove("is-locked");
      refs.gate.setAttribute("hidden", "");
      return;
    }

    refs.gateForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const attempt = refs.passwordInput.value.trim();
      if (attempt === config.password) {
        refs.gateMessage.textContent = "欢迎回到我们的小窝。";
        unlock();
        return;
      }
      refs.gateMessage.textContent = "暗号不对，再想想那个特别的数字。";
      refs.gateForm.classList.remove("is-shaking");
      refs.gateForm.offsetHeight;
      refs.gateForm.classList.add("is-shaking");
      refs.passwordInput.select();
    });
  }

  function setupBrandLove() {
    setBrandLit(localStorage.getItem(storageKeys.brandLit) === "true");
    refs.brandLoveButton.addEventListener("click", showBrandBurst);
  }

  function observeReveal() {
    if (!revealObserver) return;
    const elements = document.querySelectorAll(
      ".section, .moment-card, .timeline-item, .wish-card, .anniversary-calendar",
    );
    elements.forEach((element) => {
      if (element.dataset.revealReady) return;
      element.dataset.revealReady = "true";
      revealObserver.observe(element);
    });
  }

  function setupReveal() {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.12 },
    );
    observeReveal();
  }

  function boot() {
    renderShellText();
    renderLoveClock();
    renderCalendar();
    renderMoments();
    renderTimeline();
    renderWishes();
    setupGate();
    setupBrandLove();
    setupReveal();
    hydrateInteractive();
    window.setInterval(renderLoveClock, 1000);
  }

  boot();

  window.ourDaysTest = {
    getClockParts,
    digitClass,
    renderLoveClock,
    renderMoments,
    resolveMomentDate,
    dayDiff,
  };
})();
