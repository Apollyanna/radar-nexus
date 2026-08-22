/* =========================================================
   Radar Nexus — Interatividade
   Nexus Team · Desafio dos Dados 2026
   ========================================================= */

(function(){
  'use strict';

  /* ---------- MENU MOBILE ---------- */
  const menuBtn = document.getElementById('menuBotao');
  const menu = document.getElementById('menuPrincipal');
  if(menuBtn && menu){
    menuBtn.addEventListener('click', () => {
      const aberto = menu.classList.toggle('aberto');
      menuBtn.setAttribute('aria-expanded', aberto);
    });
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menu.classList.remove('aberto');
        menuBtn.setAttribute('aria-expanded','false');
      });
    });
  }

  /* ---------- ANIMAÇÃO AO ROLAR ---------- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add('visivel');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('[data-animar], .etapa').forEach(el => observer.observe(el));

  /* ---------- DADOS DOS TERRITÓRIOS (PROVA DE CONCEITO) ---------- */
  const territorios = [
    {
      nome: 'Montezuma — Sede',
      meta: 'Município · MG · Zona urbana central',
      V: 62, F: 55, C: 38, D: 28, P: 70,
      barreiras: ['Formação desalinhada à economia local', 'Conectividade intermediária'],
      playbook: 'Playbook 2 — Trilhas Conectadas aos Arranjos Locais',
      canais: 'Presencial + digital onde a conectividade permitir',
      indicador: 'Inscrições qualificadas · Encaminhamentos · Permanência 30/60/90 dias'
    },
    {
      nome: 'Montezuma — Zona Rural Norte',
      meta: 'Comunidades dispersas · Economia sazonal',
      V: 84, F: 78, C: 82, D: 88, P: 45,
      barreiras: ['Deslocamento elevado', 'Conectividade muito baixa', 'Vulnerabilidade socioeconômica alta'],
      playbook: 'Playbook 3 — Núcleos de Oportunidade',
      canais: 'Presencial em espaços comunitários + atendimento telefônico',
      indicador: 'Frequência · Permanência · Encaminhamentos regionais'
    },
    {
      nome: 'Montezuma — Zona Rural Sul',
      meta: 'Agricultura familiar · baixa cobertura de cursos',
      V: 76, F: 70, C: 75, D: 80, P: 55,
      barreiras: ['Distância formação-demanda', 'Deslocamento', 'Conectividade limitada'],
      playbook: 'Playbook 3 — Núcleos de Oportunidade',
      canais: 'Rádio comunitária + pontos de acesso fixos',
      indicador: 'Alcance territorial · Permanência 30/60/90 dias'
    },
    {
      nome: 'Montezuma — Periferia Leste',
      meta: 'Alta vulnerabilidade · baixa conectividade',
      V: 88, F: 60, C: 78, D: 40, P: 60,
      barreiras: ['Vulnerabilidade socioeconômica muito alta', 'Conectividade baixa'],
      playbook: 'Playbook 1 — Busca Ativa Multicanal',
      canais: 'Presencial, telefone, SMS, rádio comunitária, materiais impressos',
      indicador: 'Pessoas contatadas por canal · Frequência 30/60/90 dias'
    },
    {
      nome: 'Montezuma — Bairro Centro-Oeste',
      meta: 'Conectividade razoável · economia ativa',
      V: 48, F: 52, C: 42, D: 22, P: 78,
      barreiras: ['Formação parcialmente desalinhada'],
      playbook: 'Playbook 2 — Trilhas Conectadas aos Arranjos Locais',
      canais: 'Digital + presencial',
      indicador: 'Taxa de conversão · Permanência · Conclusão'
    }
  ];

  /* ---------- CALCULAR IPT ---------- */
  function calcularIPT(t){
    return Math.round(0.30*t.V + 0.25*t.F + 0.20*t.C + 0.15*t.D + 0.10*t.P);
  }
  function prioridade(ipt){
    if(ipt >= 70) return { label:'Alta prioridade', classe:'alta' };
    if(ipt >= 45) return { label:'Média prioridade', classe:'media' };
    return { label:'Prioridade moderada', classe:'baixa' };
  }

  /* ---------- RENDER EXPLORADOR ---------- */
  const select = document.getElementById('territorio');
  const nomeEl = document.getElementById('nomeTerritorio');
  const metaEl = document.getElementById('territorioMeta');
  const iptValorEl = document.getElementById('iptValor');
  const iptPrioEl = document.getElementById('iptPrioridade');
  const barrasEl = document.getElementById('barrasDimensoes');
  const barreirasEl = document.getElementById('listaBarreiras');
  const playbookEl = document.getElementById('recomendacao');
  const canaisEl = document.getElementById('canais');
  const indicadorEl = document.getElementById('indicador');
  const cadeiaEl = document.getElementById('cadeia');

  const dimensoes = [
    { chave:'V', nome:'Vulnerabilidade (V)', peso:0.30 },
    { chave:'F', nome:'Formação–demanda (F)', peso:0.25 },
    { chave:'C', nome:'Conectividade (C)', peso:0.20 },
    { chave:'D', nome:'Deslocamento (D)', peso:0.15 },
    { chave:'P', nome:'Parceria local (P)', peso:0.10 }
  ];

  // popula select
  territorios.forEach((t,i) => {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = t.nome;
    select.appendChild(opt);
  });

  function renderTerritorio(idx){
    const t = territorios[idx];
    const ipt = calcularIPT(t);
    const p = prioridade(ipt);

    nomeEl.textContent = t.nome;
    metaEl.textContent = t.meta;
    iptValorEl.textContent = ipt;
    iptPrioEl.textContent = p.label;
    iptPrioEl.className = 'prioridade-tag ' + p.classe;

    // barras
    barrasEl.innerHTML = '';
    dimensoes.forEach(d => {
      const valor = t[d.chave];
      const item = document.createElement('div');
      item.className = 'dimensao-item';
      item.innerHTML = `
        <span class="dimensao-label">${d.nome}</span>
        <div class="dimensao-barra"><div class="dimensao-preenchimento" style="width:0%"></div></div>
        <span class="dimensao-valor">${valor}</span>
      `;
      barrasEl.appendChild(item);
      // animação
      requestAnimationFrame(() => {
        item.querySelector('.dimensao-preenchimento').style.width = valor + '%';
      });
    });

    // barreiras
    barreirasEl.innerHTML = '';
    t.barreiras.forEach(b => {
      const li = document.createElement('li');
      li.textContent = b;
      barreirasEl.appendChild(li);
    });

    playbookEl.textContent = t.playbook;
    canaisEl.textContent = t.canais;
    indicadorEl.textContent = t.indicador;

    // cadeia de decisão
    cadeiaEl.innerHTML = `
      <div class="cadeia-elo"><b>Dado</b>IBGE · DataViva · EPT</div>
      <span class="cadeia-seta">→</span>
      <div class="cadeia-elo"><b>IPT</b>${ipt}/100</div>
      <span class="cadeia-seta">→</span>
      <div class="cadeia-elo"><b>Playbook</b>${t.playbook.split('—')[0].trim()}</div>
      <span class="cadeia-seta">→</span>
      <div class="cadeia-elo"><b>Decisão</b>Humana e revisável</div>
    `;
  }

  select.addEventListener('change', e => renderTerritorio(+e.target.value));
  renderTerritorio(0);

  /* ---------- GRÁFICOS ---------- */
  function criarBarra(container, label, valor, classe){
    const linha = document.createElement('div');
    linha.className = 'linha-barra';
    linha.innerHTML = `
      <span>${label}</span>
      <div class="trilho"><div class="preenchimento ${classe||''}" style="width:0%"></div></div>
      <b>${valor}%</b>
    `;
    container.appendChild(linha);
    requestAnimationFrame(() => {
      linha.querySelector('.preenchimento').style.width = valor + '%';
    });
  }

  // Gráfico 1: Urbano vs Rural
  const g1 = document.getElementById('graficoSemSem');
  if(g1){
    criarBarra(g1, 'Urbano 15–29', 25, '');
    criarBarra(g1, 'Rural 15–29', 38, 'rural');
    criarBarra(g1, 'Urbano 18–24', 22, '');
    criarBarra(g1, 'Rural 18–24', 42, 'rural');
  }

  // Gráfico 2: Internet
  const g2 = document.getElementById('graficoInternet');
  if(g2){
    criarBarra(g2, 'Centro urbano', 82, '');
    criarBarra(g2, 'Periferia', 58, '');
    criarBarra(g2, 'Rural Norte', 12, 'rural');
    criarBarra(g2, 'Rural Sul', 15, 'rural');
  }

  // Gráfico 3: Top 10 territórios
  const g3 = document.getElementById('graficoTop');
  if(g3){
    const top10 = [
      { nome:'Periferia Leste', ipt: 78 },
      { nome:'Rural Norte', ipt: 76 },
      { nome:'Rural Sul', ipt: 71 },
      { nome:'Comunidade Ribeirinha', ipt: 68 },
      { nome:'Distrito Oeste', ipt: 62 },
      { nome:'Sede — bolsões', ipt: 58 },
      { nome:'Centro-Oeste', ipt: 52 },
      { nome:'Vila Nova', ipt: 47 },
      { nome:'Bairro Alto', ipt: 42 },
      { nome:'Zona Mista Sul', ipt: 38 }
    ];
    top10.forEach(t => {
      criarBarra(g3, t.nome, t.ipt, t.ipt >= 70 ? 'rural' : '');
    });
  }

  // Gráfico 4: Economia × Formação
  const g4 = document.getElementById('graficoEconomia');
  if(g4){
    criarBarra(g4, 'Agroindústria — emprego', 72, 'economia');
    criarBarra(g4, 'Agroindústria — formação', 28, 'formacao');
    criarBarra(g4, 'Comércio — emprego', 65, 'economia');
    criarBarra(g4, 'Comércio — formação', 40, 'formacao');
    criarBarra(g4, 'Turismo rural — emprego', 48, 'economia');
    criarBarra(g4, 'Turismo rural — formação', 15, 'formacao');
    criarBarra(g4, 'Serviços públicos — emprego', 35, 'economia');
    criarBarra(g4, 'Serviços públicos — formação', 55, 'formacao');
  }

})();