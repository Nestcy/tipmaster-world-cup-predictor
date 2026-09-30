import { appState, AppState } from './state.ts';
import { PredictionCategory } from './types.ts';

export function renderApp(root: HTMLElement): void {
  const state = appState.getState();
  const currentUser = appState.getCurrentUser();
  const isSettled = state.isSettled;
  const match = state.featuredMatch;
  const summary = state.settlementSummary;

  // Category badge helper
  const renderCategoryBadge = (cat?: PredictionCategory, pts?: number) => {
    if (cat === 'exact') {
      return `
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          Exact Score ${pts !== undefined ? `<span class="font-mono-num font-bold text-emerald-200">+${pts}</span>` : ''}
        </span>
      `;
    }
    if (cat === 'outcome') {
      return `
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md bg-amber-950/80 text-amber-300 border border-amber-500/30">
          <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          Correct Outcome ${pts !== undefined ? `<span class="font-mono-num font-bold text-amber-200">+${pts}</span>` : ''}
        </span>
      `;
    }
    return `
      <span class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md bg-neutral-900 text-neutral-400 border border-neutral-800">
        <span class="w-1.5 h-1.5 rounded-full bg-neutral-500"></span>
        Incorrect ${pts !== undefined ? `<span class="font-mono-num text-neutral-400">+${pts}</span>` : ''}
      </span>
    `;
  };

  root.innerHTML = `
    <!-- Top Bar Navigation (Strict 3-Zone Contract) -->
    <header class="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        <!-- Zone 1: Brand Wordmark -->
        <a href="#world-cup" class="flex items-center gap-2 group">
          <div class="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-neutral-950 font-black text-lg shadow-sm shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            ⚡
          </div>
          <span class="text-xl font-bold tracking-tight text-white font-display">
            tipmaster<span class="text-emerald-400 font-normal">.de</span>
          </span>
        </a>

        <!-- Zone 2: Navigation Links -->
        <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
          <a href="#world-cup" class="hover:text-emerald-400 transition-colors py-1 text-white border-b-2 border-emerald-400">World Cup</a>
          <a href="#featured-match" class="hover:text-emerald-400 transition-colors py-1">Matches</a>
          <a href="#leaderboard" class="hover:text-emerald-400 transition-colors py-1">Leaderboard</a>
          <a href="#settle-section" class="hover:text-emerald-400 transition-colors py-1 flex items-center gap-1.5">
            <span>Settle Match</span>
            ${isSettled ? '<span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>' : ''}
          </a>
        </nav>

        <!-- Zone 3: Actions & Profile -->
        <div class="flex items-center gap-3">
          <button id="btn-reset-demo-top" class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-300 bg-neutral-900 hover:bg-neutral-800 hover:text-white border border-neutral-700/60 rounded-lg transition-colors cursor-pointer" title="Reset all state to initial demo state">
            <svg class="w-3.5 h-3.5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            Reset Demo
          </button>

          <a href="#user-stats" class="flex items-center gap-2.5 pl-2 py-1 pr-3 bg-neutral-900/90 hover:bg-neutral-800/90 border border-neutral-800 rounded-full transition-colors">
            <div class="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold text-xs">
              EZ
            </div>
            <div class="flex flex-col text-left">
              <span class="text-xs font-semibold text-neutral-200 leading-none">Ernest Z.</span>
              <span class="text-[10px] text-emerald-400 font-mono-num mt-0.5">${currentUser.points} pts · #${currentUser.rank}</span>
            </div>
          </a>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12" id="world-cup">

      <!-- SECTION 2: HERO -->
      <section class="relative rounded-2xl overflow-hidden border border-neutral-800 bg-gradient-to-b from-neutral-900/90 via-neutral-900/50 to-neutral-950 p-8 sm:p-12 pitch-grid-pattern">
        <div class="absolute inset-0 subtle-pitch-lines pointer-events-none"></div>
        
        <!-- Subtle pitch center circle ornament -->
        <div class="absolute -right-16 -bottom-16 w-80 h-80 rounded-full border border-emerald-500/10 pointer-events-none flex items-center justify-center">
          <div class="w-32 h-32 rounded-full border border-emerald-500/10"></div>
        </div>

        <div class="relative z-10 max-w-3xl space-y-6">
          <div class="flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-400 uppercase">
            <span>FIFA World Cup Prediction Platform</span>
            <span aria-hidden="true" class="text-neutral-600">·</span>
            <span>Live Settlement Engine</span>
          </div>

          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-display leading-[1.1]" style="text-wrap: balance;">
            Your Prediction.<br />
            Your Tournament.<br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Your Ranking.</span>
          </h1>

          <p class="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl font-normal">
            Predict the biggest matches of the World Cup, earn points and climb the leaderboard with instant match reconciliation.
          </p>

          <!-- CTAs -->
          <div class="flex flex-wrap items-center gap-4 pt-2">
            <a href="#featured-match" class="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:-translate-y-0.5 cursor-pointer font-display">
              Make a Prediction
            </a>
            <a href="#leaderboard" class="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-neutral-200 bg-neutral-900/90 hover:bg-neutral-800 hover:text-white border border-neutral-700/80 rounded-xl transition-all cursor-pointer">
              View Leaderboard
            </a>
            <a href="#settle-section" class="inline-flex items-center justify-center px-4 py-3 text-sm font-medium text-emerald-400 hover:text-emerald-300 hover:underline transition-colors">
              Go to Settle Engine →
            </a>
          </div>

          <!-- Product Loop Bar -->
          <div class="pt-6 border-t border-neutral-800/80 grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-xs">
            <div class="p-2 rounded-lg bg-neutral-950/60 border border-neutral-800/60">
              <span class="text-emerald-400 font-bold block">01</span>
              <span class="text-neutral-400 text-[11px]">PREDICT</span>
            </div>
            <div class="p-2 rounded-lg bg-neutral-950/60 border border-neutral-800/60">
              <span class="text-neutral-500 font-bold block">02</span>
              <span class="text-neutral-400 text-[11px]">MATCH</span>
            </div>
            <div class="p-2 rounded-lg bg-neutral-950/60 border border-neutral-800/60">
              <span class="text-neutral-500 font-bold block">03</span>
              <span class="text-neutral-400 text-[11px]">RESULT</span>
            </div>
            <div class="p-2 rounded-lg bg-neutral-950/60 border border-neutral-800/60">
              <span class="text-emerald-400 font-bold block">04</span>
              <span class="text-neutral-400 text-[11px]">SETTLE</span>
            </div>
            <div class="p-2 rounded-lg bg-neutral-950/60 border border-neutral-800/60">
              <span class="text-neutral-500 font-bold block">05</span>
              <span class="text-neutral-400 text-[11px]">EARN PTS</span>
            </div>
            <div class="p-2 rounded-lg bg-neutral-950/60 border border-neutral-800/60">
              <span class="text-emerald-400 font-bold block">06</span>
              <span class="text-neutral-400 text-[11px]">CLIMB RANK</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 2-COLUMN MAIN CONTENT GRID -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- LEFT COLUMN: Featured Match & Prediction & Settle (8 cols) -->
        <div class="lg:col-span-7 space-y-8">
          
          <!-- SECTION 3 & 4: FEATURED MATCH -->
          <section id="featured-match" class="rounded-2xl border ${isSettled ? 'border-emerald-500/40 bg-neutral-900/90' : 'border-neutral-800 bg-neutral-900/60'} p-6 sm:p-8 backdrop-blur-sm transition-all shadow-xl">
            
            <!-- Header Meta -->
            <div class="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
              <div class="flex items-center gap-2">
                <span class="text-xs font-bold uppercase tracking-wider ${isSettled ? 'text-emerald-400' : 'text-amber-400'} flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full ${isSettled ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}"></span>
                  ${isSettled ? 'FINAL · MATCH SETTLED' : 'NEXT MATCH'}
                </span>
                <span class="text-neutral-600">/</span>
                <span class="text-xs text-neutral-400 font-medium">FIFA WORLD CUP · ${match.stage}</span>
              </div>
              <div class="text-xs font-mono-num text-neutral-400">
                ${isSettled ? 'Settled Today' : match.kickoffTime}
              </div>
            </div>

            <!-- Teams Face-off -->
            <div class="grid grid-cols-3 items-center py-4 text-center">
              <!-- Home Team: Germany -->
              <div class="flex flex-col items-center space-y-2">
                <span class="text-4xl sm:text-5xl filter drop-shadow-md">🇩🇪</span>
                <span class="text-lg sm:text-xl font-bold text-white font-display">Germany</span>
                <span class="text-xs font-mono-num text-neutral-400">GER</span>
              </div>

              <!-- Center Score / VS Area -->
              <div class="flex flex-col items-center justify-center space-y-1">
                ${
                  isSettled
                    ? `
                    <div class="px-4 py-2 bg-neutral-950 border border-emerald-500/40 rounded-xl text-2xl sm:text-3xl font-black font-mono-num text-emerald-400 shadow-inner">
                      ${match.actualHomeScore} : ${match.actualAwayScore}
                    </div>
                    <span class="text-[11px] font-semibold text-emerald-400/90 tracking-wide uppercase mt-1">Official Result</span>
                  `
                    : `
                    <div class="text-2xl sm:text-3xl font-black font-display text-neutral-500">
                      VS
                    </div>
                    <span class="text-xs text-neutral-400 font-medium">${match.stadium}</span>
                  `
                }
              </div>

              <!-- Away Team: Argentina -->
              <div class="flex flex-col items-center space-y-2">
                <span class="text-4xl sm:text-5xl filter drop-shadow-md">🇦🇷</span>
                <span class="text-lg sm:text-xl font-bold text-white font-display">Argentina</span>
                <span class="text-xs font-mono-num text-neutral-400">ARG</span>
              </div>
            </div>

            <!-- SECTION 4: PREDICTION INTERACTION AREA -->
            <div class="mt-8 pt-6 border-t border-neutral-800/80 bg-neutral-950/70 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-6 sm:p-8 rounded-b-2xl">
              
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                <div>
                  <h3 class="text-base font-bold text-white font-display">Your Prediction</h3>
                  <p class="text-xs text-neutral-400">Enter predicted score before kickoff</p>
                </div>
                ${
                  isSettled && summary
                    ? `<div>${renderCategoryBadge(summary.userResultCategory, summary.userPointsEarned)}</div>`
                    : ''
                }
              </div>

              <!-- Prediction Form Inputs -->
              <form id="form-prediction" class="space-y-4">
                <div class="flex items-center justify-center gap-4 sm:gap-6">
                  
                  <!-- Home score controls -->
                  <div class="flex items-center gap-2">
                    <button type="button" id="btn-pred-home-dec" class="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-200 hover:bg-neutral-800 hover:text-white font-bold flex items-center justify-center transition-colors cursor-pointer" ${isSettled ? 'disabled' : ''}>-</button>
                    <input 
                      type="number" 
                      id="input-pred-home" 
                      min="0" 
                      max="20" 
                      value="${state.userPredictedHome}" 
                      ${isSettled ? 'disabled' : ''}
                      class="w-16 sm:w-20 h-14 bg-neutral-900 border ${isSettled ? 'border-neutral-700 text-neutral-400' : 'border-neutral-700 text-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400'} rounded-xl text-center text-2xl font-black font-mono-num outline-none transition-all"
                    />
                    <button type="button" id="btn-pred-home-inc" class="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-200 hover:bg-neutral-800 hover:text-white font-bold flex items-center justify-center transition-colors cursor-pointer" ${isSettled ? 'disabled' : ''}>+</button>
                  </div>

                  <span class="text-2xl font-bold text-neutral-500 font-mono">:</span>

                  <!-- Away score controls -->
                  <div class="flex items-center gap-2">
                    <button type="button" id="btn-pred-away-dec" class="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-200 hover:bg-neutral-800 hover:text-white font-bold flex items-center justify-center transition-colors cursor-pointer" ${isSettled ? 'disabled' : ''}>-</button>
                    <input 
                      type="number" 
                      id="input-pred-away" 
                      min="0" 
                      max="20" 
                      value="${state.userPredictedAway}" 
                      ${isSettled ? 'disabled' : ''}
                      class="w-16 sm:w-20 h-14 bg-neutral-900 border ${isSettled ? 'border-neutral-700 text-neutral-400' : 'border-neutral-700 text-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400'} rounded-xl text-center text-2xl font-black font-mono-num outline-none transition-all"
                    />
                    <button type="button" id="btn-pred-away-inc" class="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-200 hover:bg-neutral-800 hover:text-white font-bold flex items-center justify-center transition-colors cursor-pointer" ${isSettled ? 'disabled' : ''}>+</button>
                  </div>
                </div>

                <!-- Submit Button -->
                <div class="flex flex-col items-center pt-2">
                  <button 
                    type="submit" 
                    id="btn-submit-prediction" 
                    ${isSettled ? 'disabled' : ''}
                    class="w-full sm:w-auto min-w-[220px] px-6 py-3 text-sm font-semibold rounded-xl transition-all cursor-pointer font-display ${
                      isSettled
                        ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                        : state.isPredictionSaved
                        ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700'
                        : 'bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold shadow-lg shadow-emerald-500/20'
                    }"
                  >
                    ${state.isPredictionSaved ? 'Update Prediction' : 'Submit Prediction'}
                  </button>
                </div>
              </form>

              <!-- Prediction Confirmation Message -->
              ${
                state.isPredictionSaved
                  ? `
                  <div class="mt-4 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-1">
                    <div class="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-400">
                      <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
                      <span>Prediction Saved ✓</span>
                    </div>
                    <p class="text-sm font-bold text-white font-mono-num">
                      Germany ${state.userPredictedHome} : ${state.userPredictedAway} Argentina
                    </p>
                    <p class="text-xs text-neutral-400">
                      ${state.predictionFeedbackMessage || 'Your prediction has been saved. Good luck!'}
                    </p>
                  </div>
                `
                  : ''
              }

              <!-- Community Distribution Bar -->
              <div class="mt-6 pt-5 border-t border-neutral-800/80 space-y-2.5">
                <div class="flex items-center justify-between text-xs text-neutral-400">
                  <span class="font-medium text-neutral-300">1,248 fans have already predicted this match</span>
                  <span class="font-mono-num text-[11px] text-neutral-500">Live Trend</span>
                </div>

                <!-- Distribution track -->
                <div class="h-2.5 w-full bg-neutral-900 rounded-full overflow-hidden flex">
                  <div style="width: 58%;" class="bg-emerald-500 transition-all" title="Germany wins · 58%"></div>
                  <div style="width: 21%;" class="bg-amber-400 transition-all border-l border-r border-neutral-950" title="Draw · 21%"></div>
                  <div style="width: 21%;" class="bg-sky-400 transition-all" title="Argentina wins · 21%"></div>
                </div>

                <!-- Distribution labels -->
                <div class="flex items-center justify-between text-[11px] text-neutral-400 pt-0.5">
                  <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-emerald-500"></span> Germany wins · <strong class="text-neutral-200">58%</strong></span>
                  <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-amber-400"></span> Draw · <strong class="text-neutral-200">21%</strong></span>
                  <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-sky-400"></span> Argentina wins · <strong class="text-neutral-200">21%</strong></span>
                </div>
              </div>
            </div>
          </section>

          <!-- SECTION 15 & 16: CORE SETTLEMENT ENGINE (MATCH RECONCILIATION) -->
          <section id="settle-section" class="rounded-2xl border-2 ${isSettled ? 'border-emerald-500/50 bg-neutral-900/90' : 'border-emerald-500/30 bg-neutral-900/80'} p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden">
            
            <!-- Glow background decoration -->
            <div class="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-emerald-500/10 filter blur-3xl pointer-events-none"></div>

            <div class="flex items-start justify-between gap-4 mb-4">
              <div>
                <div class="flex items-center gap-2">
                  <span class="inline-flex items-center justify-center w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-400 text-xs font-black">⚙</span>
                  <h2 class="text-xl sm:text-2xl font-bold text-white font-display">Settle Match</h2>
                </div>
                <p class="text-xs sm:text-sm text-neutral-300 mt-1">
                  Enter the final result and automatically evaluate every prediction.
                </p>
              </div>

              ${
                isSettled
                  ? `
                <button id="btn-re-settle" class="px-3 py-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-950/50 hover:bg-emerald-950 border border-emerald-500/40 rounded-lg transition-colors cursor-pointer whitespace-nowrap">
                  Change Score / Re-settle
                </button>
              `
                  : ''
              }
            </div>

            <!-- Settle Input Form -->
            <form id="form-settle-match" class="mt-6 p-5 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-4">
              <div class="flex items-center justify-between text-xs text-neutral-400 pb-2 border-b border-neutral-800">
                <span class="font-medium text-neutral-200">Match: Germany vs. Argentina</span>
                <span>Enter Final Score</span>
              </div>

              <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div class="flex items-center gap-3">
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-bold text-neutral-300">GER</span>
                    <input 
                      type="number" 
                      id="input-actual-home" 
                      min="0" 
                      max="20" 
                      value="${state.actualHomeInput}" 
                      class="w-16 h-12 bg-neutral-900 border border-neutral-700 text-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 rounded-lg text-center text-xl font-black font-mono-num outline-none"
                    />
                  </div>

                  <span class="text-xl font-bold text-neutral-500 font-mono">:</span>

                  <div class="flex items-center gap-2">
                    <input 
                      type="number" 
                      id="input-actual-away" 
                      min="0" 
                      max="20" 
                      value="${state.actualAwayInput}" 
                      class="w-16 h-12 bg-neutral-900 border border-neutral-700 text-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 rounded-lg text-center text-xl font-black font-mono-num outline-none"
                    />
                    <span class="text-xs font-bold text-neutral-300">ARG</span>
                  </div>
                </div>

                <!-- Quick Presets -->
                <div class="flex items-center gap-1.5 text-xs">
                  <span class="text-neutral-500 text-[11px]">Presets:</span>
                  <button type="button" class="btn-score-preset px-2 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-[11px] font-mono-num border border-neutral-800 cursor-pointer" data-home="2" data-away="1">2:1</button>
                  <button type="button" class="btn-score-preset px-2 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-[11px] font-mono-num border border-neutral-800 cursor-pointer" data-home="1" data-away="1">1:1</button>
                  <button type="button" class="btn-score-preset px-2 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-[11px] font-mono-num border border-neutral-800 cursor-pointer" data-home="1" data-away="2">1:2</button>
                </div>

                <button 
                  type="submit" 
                  id="btn-trigger-settle" 
                  class="w-full sm:w-auto px-6 py-3 text-sm font-bold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-lg shadow-emerald-500/20 cursor-pointer whitespace-nowrap font-display flex items-center justify-center gap-2"
                >
                  <svg class="w-4 h-4 text-neutral-950" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  ${isSettled ? 'Re-settle Match' : 'Settle Match'}
                </button>
              </div>

              ${
                state.settlementError
                  ? `<div class="p-2.5 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-medium">${state.settlementError}</div>`
                  : ''
              }
            </form>

            <!-- SECTION 17: SETTLEMENT FEEDBACK PANEL -->
            ${
              isSettled && summary
                ? `
              <div class="mt-6 p-6 rounded-xl bg-gradient-to-br from-emerald-950/60 via-neutral-900 to-neutral-950 border border-emerald-500/40 space-y-6 animate-fadeIn">
                
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-500/20 pb-4">
                  <div class="space-y-1">
                    <div class="flex items-center gap-2">
                      <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                      <h3 class="text-lg font-black text-emerald-300 font-display">Match Settled ✓</h3>
                    </div>
                    <p class="text-xl font-black text-white font-mono-num">
                      ${summary.finalScore}
                    </p>
                  </div>

                  <!-- Points banner -->
                  <div class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/40 rounded-xl">
                    <span class="text-xs font-medium text-emerald-300">Total Settlement:</span>
                    <span class="text-base font-black text-emerald-400 font-mono-num">+${summary.totalPointsAwarded} Points Awarded</span>
                  </div>
                </div>

                <!-- Aggregated Community Settlement Breakdown -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div class="p-3 rounded-lg bg-neutral-950/80 border border-neutral-800">
                    <span class="text-xl sm:text-2xl font-black text-white font-mono-num block">${summary.totalEvaluated}</span>
                    <span class="text-xs text-neutral-400">Predictions Evaluated</span>
                  </div>
                  <div class="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30">
                    <span class="text-xl sm:text-2xl font-black text-emerald-400 font-mono-num block">${summary.exactCount}</span>
                    <span class="text-xs text-emerald-300/80">Exact Scores (+5)</span>
                  </div>
                  <div class="p-3 rounded-lg bg-amber-950/40 border border-amber-500/30">
                    <span class="text-xl sm:text-2xl font-black text-amber-400 font-mono-num block">${summary.outcomeCount}</span>
                    <span class="text-xs text-amber-300/80">Correct Outcomes (+2)</span>
                  </div>
                  <div class="p-3 rounded-lg bg-neutral-950/80 border border-neutral-800">
                    <span class="text-xl sm:text-2xl font-black text-neutral-400 font-mono-num block">${summary.incorrectCount}</span>
                    <span class="text-xs text-neutral-500">Incorrect (0)</span>
                  </div>
                </div>

                <!-- SECTION 18: RECONCILIATION TABLE -->
                <div class="space-y-3 pt-2">
                  <div class="flex items-center justify-between">
                    <h4 class="text-xs font-bold uppercase tracking-wider text-neutral-300 font-display">Player Settlement Breakdown</h4>
                    <span class="text-xs text-neutral-500 font-mono-num">${state.seededPredictions.length} Seeded Competitors Evaluated</span>
                  </div>

                  <div class="overflow-x-auto rounded-xl border border-neutral-800">
                    <table class="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr class="bg-neutral-950 text-neutral-400 border-b border-neutral-800">
                          <th class="py-2.5 px-3 font-semibold">Player</th>
                          <th class="py-2.5 px-3 font-semibold text-center">Prediction</th>
                          <th class="py-2.5 px-3 font-semibold">Result</th>
                          <th class="py-2.5 px-3 font-semibold text-right">Points</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-neutral-800/60 bg-neutral-900/40">
                        ${state.seededPredictions
                          .map((pred) => {
                            const isUser = pred.isCurrentUser || pred.userId === 'current-user-ernest';
                            return `
                            <tr class="${isUser ? 'bg-emerald-950/30 font-semibold' : 'hover:bg-neutral-800/30'} transition-colors">
                              <td class="py-2.5 px-3">
                                <div class="flex items-center gap-2">
                                  ${
                                    isUser
                                      ? '<span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>'
                                      : ''
                                  }
                                  <span class="${isUser ? 'text-emerald-300 font-bold' : 'text-neutral-200'}">${pred.userName} ${isUser ? '(You)' : ''}</span>
                                </div>
                              </td>
                              <td class="py-2.5 px-3 text-center font-mono-num font-bold text-neutral-200">
                                ${pred.predictedHomeScore} : ${pred.predictedAwayScore}
                              </td>
                              <td class="py-2.5 px-3">
                                ${renderCategoryBadge(pred.resultCategory)}
                              </td>
                              <td class="py-2.5 px-3 text-right font-mono-num font-bold ${
                                (pred.pointsAwarded || 0) > 0 ? 'text-emerald-400' : 'text-neutral-500'
                              }">
                                +${pred.pointsAwarded || 0}
                              </td>
                            </tr>
                          `;
                          })
                          .join('')}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            `
                : ''
            }

          </section>

          <!-- SECTION 5: SCORING RULES -->
          <section class="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-base font-bold text-white font-display">How You Earn Points</h3>
              <span class="text-xs text-neutral-400">Standard Rulebook</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <!-- Exact Score -->
              <div class="p-4 rounded-xl bg-neutral-950 border border-emerald-500/30 space-y-1.5">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-semibold text-emerald-400">Exact Score</span>
                  <span class="text-base font-black text-emerald-400 font-mono-num">+5 pts</span>
                </div>
                <p class="text-xs text-neutral-400 leading-snug">
                  Correct exact score prediction
                </p>
              </div>

              <!-- Correct Outcome -->
              <div class="p-4 rounded-xl bg-neutral-950 border border-amber-500/30 space-y-1.5">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-semibold text-amber-400">Correct Outcome</span>
                  <span class="text-base font-black text-amber-400 font-mono-num">+2 pts</span>
                </div>
                <p class="text-xs text-neutral-400 leading-snug">
                  Correct winner or draw, incorrect exact score
                </p>
              </div>

              <!-- Incorrect -->
              <div class="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1.5">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-semibold text-neutral-400">Incorrect Prediction</span>
                  <span class="text-base font-black text-neutral-500 font-mono-num">0 pts</span>
                </div>
                <p class="text-xs text-neutral-500 leading-snug">
                  Wrong match outcome
                </p>
              </div>
            </div>
          </section>

        </div>

        <!-- RIGHT COLUMN: User Stats, Leaderboard & Recent Results (5 cols) -->
        <div class="lg:col-span-5 space-y-8">
          
          <!-- SECTION 6: USER STATISTICS -->
          <section id="user-stats" class="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 space-y-5">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-base font-bold text-white font-display">Your Statistics</h3>
                <span class="text-xs text-neutral-400">Tournament Overview · Ernest Z.</span>
              </div>
              <div class="text-right">
                <span class="text-xs text-neutral-400 block leading-none">Current Rank</span>
                <span class="text-xl font-black ${isSettled ? 'text-emerald-400' : 'text-white'} font-mono-num leading-tight">
                  #${currentUser.rank}
                </span>
              </div>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div class="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80">
                <span class="text-2xl font-black text-emerald-400 font-mono-num block">${currentUser.points}</span>
                <span class="text-xs text-neutral-400 font-medium">Points</span>
              </div>

              <div class="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80">
                <span class="text-2xl font-black text-white font-mono-num block">${currentUser.predictionsCount}</span>
                <span class="text-xs text-neutral-400 font-medium">Predictions</span>
              </div>

              <div class="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80">
                <span class="text-2xl font-black text-amber-400 font-mono-num block">${currentUser.exactScoresCount}</span>
                <span class="text-xs text-neutral-400 font-medium">Exact Scores</span>
              </div>

              <div class="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80">
                <span class="text-2xl font-black text-teal-400 font-mono-num block">${currentUser.accuracyPct}%</span>
                <span class="text-xs text-neutral-400 font-medium">Accuracy</span>
              </div>
            </div>

            ${
              isSettled
                ? `
              <div class="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-300 flex items-center justify-between">
                <span>Updated with Germany vs. Argentina settlement</span>
                <span class="font-mono-num font-bold">+${summary?.userPointsEarned || 0} pts</span>
              </div>
            `
                : ''
            }
          </section>

          <!-- SECTION 7: LEADERBOARD -->
          <section id="leaderboard" class="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-base font-bold text-white font-display">Leaderboard</h3>
                <p class="text-xs text-neutral-400">Who is leading the tournament?</p>
              </div>
              <span class="text-xs text-neutral-500 font-mono-num">Updated Live</span>
            </div>

            <!-- Leaderboard Table -->
            <div class="overflow-x-auto rounded-xl border border-neutral-800">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="bg-neutral-950 text-neutral-400 border-b border-neutral-800">
                    <th class="py-2.5 px-3 font-semibold text-center w-12">Rank</th>
                    <th class="py-2.5 px-3 font-semibold">Player</th>
                    <th class="py-2.5 px-3 font-semibold text-right">Points</th>
                    <th class="py-2.5 px-3 font-semibold text-right">Preds</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-neutral-800/60 bg-neutral-950/40">
                  ${state.users
                    .map((user) => {
                      const isCurrentUser = user.isCurrentUser || user.id === 'current-user-ernest';
                      let rankBadge = `<span class="font-mono-num font-bold text-neutral-400">${user.rank}</span>`;
                      if (user.rank === 1) rankBadge = `<span class="font-mono-num font-bold text-amber-400">🥇 1</span>`;
                      if (user.rank === 2) rankBadge = `<span class="font-mono-num font-bold text-neutral-300">🥈 2</span>`;
                      if (user.rank === 3) rankBadge = `<span class="font-mono-num font-bold text-amber-600">🥉 3</span>`;

                      return `
                      <tr class="${
                        isCurrentUser
                          ? 'bg-emerald-950/40 border-l-2 border-l-emerald-400 font-semibold'
                          : 'hover:bg-neutral-800/30'
                      } transition-colors">
                        <td class="py-3 px-3 text-center">
                          ${rankBadge}
                        </td>
                        <td class="py-3 px-3">
                          <div class="flex items-center gap-2">
                            <span class="${
                              isCurrentUser ? 'text-emerald-300 font-bold' : 'text-neutral-200'
                            }">
                              ${user.name} ${isCurrentUser ? '(You)' : ''}
                            </span>
                          </div>
                        </td>
                        <td class="py-3 px-3 text-right font-mono-num font-bold text-sm ${
                          isCurrentUser ? 'text-emerald-400' : 'text-white'
                        }">
                          ${user.points}
                        </td>
                        <td class="py-3 px-3 text-right font-mono-num text-neutral-400">
                          ${user.predictionsCount}
                        </td>
                      </tr>
                    `;
                    })
                    .join('')}
                </tbody>
              </table>
            </div>

            <!-- Current User Row Highlight Summary Card -->
            <div class="p-3.5 rounded-xl bg-neutral-950 border border-emerald-500/30 flex items-center justify-between text-xs">
              <div class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center font-mono-num text-[11px]">
                  #${currentUser.rank}
                </span>
                <span class="font-bold text-white">Ernest Z.</span>
              </div>
              <div class="flex items-center gap-3 font-mono-num">
                <span class="text-emerald-400 font-bold">${currentUser.points} points</span>
                <span class="text-neutral-500">·</span>
                <span class="text-neutral-400">${currentUser.predictionsCount} predictions</span>
              </div>
            </div>
          </section>

          <!-- SECTION 8: RECENT RESULTS -->
          <section class="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-base font-bold text-white font-display">Recent Results</h3>
              <span class="text-xs text-neutral-400">Settled Matches</span>
            </div>

            <div class="space-y-3">
              ${state.pastResults
                .map((res) => {
                  return `
                  <div class="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2.5">
                    <div class="flex items-center justify-between">
                      <span class="text-sm font-bold text-white font-display">
                        ${res.homeFlag} ${res.match} ${res.awayFlag}
                      </span>
                      <span class="text-[11px] font-semibold text-neutral-400 uppercase tracking-wide px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800">
                        Final
                      </span>
                    </div>

                    <div class="flex items-center gap-2 text-xs text-neutral-400 font-mono-num flex-wrap">
                      <span><strong class="text-emerald-400">${res.exactPredictions}</strong> exact predictions</span>
                      <span class="text-neutral-600">·</span>
                      <span><strong class="text-amber-400">${res.correctOutcomes}</strong> correct outcomes</span>
                      <span class="text-neutral-600">·</span>
                      <span><strong class="text-neutral-400">${res.incorrectPredictions}</strong> incorrect predictions</span>
                    </div>
                  </div>
                `;
                })
                .join('')}
            </div>
          </section>

        </div>

      </div>

    </main>

    <!-- Footer -->
    <footer class="border-t border-neutral-800/80 bg-neutral-950 mt-16 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
        <div class="flex items-center gap-2">
          <span class="font-bold text-neutral-300 font-display">tipmaster.de</span>
          <span>·</span>
          <span>World Cup Prediction Engine</span>
        </div>
        <div>
          <button id="btn-reset-demo-bottom" class="text-xs text-neutral-400 hover:text-emerald-400 transition-colors cursor-pointer">
            Reset Demo State
          </button>
        </div>
      </div>
    </footer>
  `;

  // Attach Event Listeners
  attachEvents(root);
}

function attachEvents(root: HTMLElement): void {
  // 1. Prediction Inputs & Increments
  const predHomeInput = root.querySelector('#input-pred-home') as HTMLInputElement | null;
  const predAwayInput = root.querySelector('#input-pred-away') as HTMLInputElement | null;
  const btnPredHomeDec = root.querySelector('#btn-pred-home-dec') as HTMLButtonElement | null;
  const btnPredHomeInc = root.querySelector('#btn-pred-home-inc') as HTMLButtonElement | null;
  const btnPredAwayDec = root.querySelector('#btn-pred-away-dec') as HTMLButtonElement | null;
  const btnPredAwayInc = root.querySelector('#btn-pred-away-inc') as HTMLButtonElement | null;
  const formPrediction = root.querySelector('#form-prediction') as HTMLFormElement | null;

  if (predHomeInput && predAwayInput) {
    const handleScoreChange = () => {
      const home = parseInt(predHomeInput.value, 10);
      const away = parseInt(predAwayInput.value, 10);
      if (!isNaN(home) && !isNaN(away)) {
        appState.setUserPrediction(home, away);
      }
    };

    predHomeInput.addEventListener('input', handleScoreChange);
    predAwayInput.addEventListener('input', handleScoreChange);

    btnPredHomeDec?.addEventListener('click', () => {
      const current = parseInt(predHomeInput.value, 10) || 0;
      if (current > 0) {
        predHomeInput.value = (current - 1).toString();
        handleScoreChange();
      }
    });

    btnPredHomeInc?.addEventListener('click', () => {
      const current = parseInt(predHomeInput.value, 10) || 0;
      if (current < 20) {
        predHomeInput.value = (current + 1).toString();
        handleScoreChange();
      }
    });

    btnPredAwayDec?.addEventListener('click', () => {
      const current = parseInt(predAwayInput.value, 10) || 0;
      if (current > 0) {
        predAwayInput.value = (current - 1).toString();
        handleScoreChange();
      }
    });

    btnPredAwayInc?.addEventListener('click', () => {
      const current = parseInt(predAwayInput.value, 10) || 0;
      if (current < 20) {
        predAwayInput.value = (current + 1).toString();
        handleScoreChange();
      }
    });
  }

  formPrediction?.addEventListener('submit', (e) => {
    e.preventDefault();
    appState.submitUserPrediction();
  });

  // 2. Settlement Form & Presets
  const formSettle = root.querySelector('#form-settle-match') as HTMLFormElement | null;
  const actualHomeInput = root.querySelector('#input-actual-home') as HTMLInputElement | null;
  const actualAwayInput = root.querySelector('#input-actual-away') as HTMLInputElement | null;

  if (actualHomeInput && actualAwayInput) {
    const handleActualScoreChange = () => {
      const home = parseInt(actualHomeInput.value, 10);
      const away = parseInt(actualAwayInput.value, 10);
      if (!isNaN(home) && !isNaN(away)) {
        appState.setActualScoreInputs(home, away);
      }
    };

    actualHomeInput.addEventListener('input', handleActualScoreChange);
    actualAwayInput.addEventListener('input', handleActualScoreChange);

    // Presets
    const presetButtons = root.querySelectorAll('.btn-score-preset');
    presetButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const home = parseInt(target.dataset.home || '2', 10);
        const away = parseInt(target.dataset.away || '1', 10);
        actualHomeInput.value = home.toString();
        actualAwayInput.value = away.toString();
        appState.setActualScoreInputs(home, away);
      });
    });
  }

  formSettle?.addEventListener('submit', (e) => {
    e.preventDefault();
    appState.settleMatch();
  });

  // Re-settle button
  const btnReSettle = root.querySelector('#btn-re-settle') as HTMLButtonElement | null;
  btnReSettle?.addEventListener('click', () => {
    const input = root.querySelector('#input-actual-home') as HTMLInputElement | null;
    input?.focus();
    input?.select();
  });

  // 3. Reset Demo Buttons
  const resetTop = root.querySelector('#btn-reset-demo-top');
  const resetBottom = root.querySelector('#btn-reset-demo-bottom');

  resetTop?.addEventListener('click', () => {
    appState.resetDemo();
  });

  resetBottom?.addEventListener('click', () => {
    appState.resetDemo();
  });
}
