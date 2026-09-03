/**
 * RADAR NEXUS
 * Nexus Team · Desafio dos Dados 2026
 */

(function () {
  "use strict";

  /* =========================================================
     MENU MOBILE
     ========================================================= */

  const menuBtn = document.getElementById("menuBotao");
  const menu = document.getElementById("menuPrincipal");

  if (menuBtn && menu) {
    menuBtn.addEventListener("click", function () {
      const isOpen = menu.classList.toggle("aberto");

      menuBtn.setAttribute(
        "aria-expanded",
        String(isOpen)
      );
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("aberto");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", function (event) {
      const clicouNoMenu = menu.contains(event.target);
      const clicouNoBotao = menuBtn.contains(event.target);

      if (!clicouNoMenu && !clicouNoBotao) {
        menu.classList.remove("aberto");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* =========================================================
     ANIMAÇÕES DE ENTRADA
     ========================================================= */

  const elementosAnimados = document.querySelectorAll(
    "[data-animate], .timeline-item"
  );

  if ("IntersectionObserver" in window) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, index) {
          if (entry.isIntersecting) {
            setTimeout(function () {
              entry.target.classList.add("visivel");
            }, index * 80);

            observer.unobserve(entry.target);
          }
        });
      },
      observerOptions
    );

    elementosAnimados.forEach(function (element) {
      observer.observe(element);
    });
  } else {
    elementosAnimados.forEach(function (element) {
      element.classList.add("visivel");
    });
  }

  /* =========================================================
     TERRITÓRIOS
     ========================================================= */

  const territorios = [
    {
      nome: "Montezuma — Sede",
      meta: "Município · MG · Zona urbana central",
      V: 62,
      F: 55,
      C: 38,
      D: 28,
      P: 70,
      barreiras: [
        "Formação desalinhada à economia local",
        "Conectividade intermediária"
      ],
      playbook: "Playbook 2 — Trilhas Conectadas",
      canais:
        "Presencial + digital onde a conectividade permitir",
      indicador:
        "Inscrições qualificadas · Encaminhamentos · Permanência 30/60/90 dias"
    },

    {
      nome: "Montezuma — Zona Rural Norte",
      meta: "Comunidades dispersas · Economia sazonal",
      V: 84,
      F: 78,
      C: 82,
      D: 88,
      P: 45,
      barreiras: [
        "Deslocamento elevado",
        "Conectividade muito baixa",
        "Vulnerabilidade socioeconômica alta"
      ],
      playbook:
        "Playbook 3 — Núcleos de Oportunidade",
      canais:
        "Presencial em espaços comunitários + atendimento telefônico",
      indicador:
        "Frequência · Permanência · Encaminhamentos regionais"
    },

    {
      nome: "Montezuma — Zona Rural Sul",
      meta: "Agricultura familiar · baixa cobertura de cursos",
      V: 76,
      F: 70,
      C: 75,
      D: 80,
      P: 55,
      barreiras: [
        "Distância formação-demanda",
        "Deslocamento",
        "Conectividade limitada"
      ],
      playbook:
        "Playbook 3 — Núcleos de Oportunidade",
      canais:
        "Rádio comunitária + pontos de acesso fixos",
      indicador:
        "Alcance territorial · Permanência 30/60/90 dias"
    },

    {
      nome: "Montezuma — Periferia Leste",
      meta: "Alta vulnerabilidade · baixa conectividade",
      V: 88,
      F: 60,
      C: 78,
      D: 40,
      P: 60,
      barreiras: [
        "Vulnerabilidade socioeconômica muito alta",
        "Conectividade baixa"
      ],
      playbook:
        "Playbook 1 — Busca Ativa Multicanal",
      canais:
        "Presencial, telefone, SMS, rádio comunitária, materiais impressos",
      indicador:
        "Pessoas contatadas por canal · Frequência 30/60/90 dias"
    },

    {
      nome: "Montezuma — Bairro Centro-Oeste",
      meta: "Conectividade razoável · economia ativa",
      V: 48,
      F: 52,
      C: 42,
      D: 22,
      P: 78,
      barreiras: [
        "Formação parcialmente desalinhada"
      ],
      playbook:
        "Playbook 2 — Trilhas Conectadas",
      canais:
        "Digital + presencial",
      indicador:
        "Taxa de conversão · Permanência · Conclusão"
    }
  ];

  function calcularIPT(territorio) {
    return Math.round(
      0.30 * territorio.V +
      0.25 * territorio.F +
      0.20 * territorio.C +
      0.15 * territorio.D +
      0.10 * territorio.P
    );
  }

  function getPrioridade(ipt) {
    if (ipt >= 70) {
      return {
        label: "Alta prioridade",
        classe: "alta"
      };
    }

    if (ipt >= 45) {
      return {
        label: "Média prioridade",
        classe: "media"
      };
    }

    return {
      label: "Prioridade moderada",
      classe: "baixa"
    };
  }

  /* =========================================================
     ELEMENTOS DO DASHBOARD
     ========================================================= */

  const select = document.getElementById("territorio");
  const nomeEl = document.getElementById("nomeTerritorio");
  const metaEl = document.getElementById("territorioMeta");
  const iptValorEl = document.getElementById("iptValor");
  const iptPrioEl = document.getElementById("iptPrioridade");
  const barrasEl = document.getElementById("barrasDimensoes");
  const barreirasEl = document.getElementById("listaBarreiras");
  const playbookEl = document.getElementById("recomendacao");
  const canaisEl = document.getElementById("canais");
  const indicadorEl = document.getElementById("indicador");
  const cadeiaEl = document.getElementById("cadeia");

  const dimensoes = [
    {
      chave: "V",
      nome: "Vulnerabilidade (V)"
    },
    {
      chave: "F",
      nome: "Formação–demanda (F)"
    },
    {
      chave: "C",
      nome: "Conectividade (C)"
    },
    {
      chave: "D",
      nome: "Deslocamento (D)"
    },
    {
      chave: "P",
      nome: "Parceria local (P)"
    }
  ];

  /* =========================================================
     PREENCHER SELECT
     ========================================================= */

  if (select) {
    territorios.forEach(function (territorio, index) {
      const option = document.createElement("option");

      option.value = String(index);
      option.textContent = territorio.nome;

      select.appendChild(option);
    });
  }

  /* =========================================================
     RENDERIZAÇÃO DO TERRITÓRIO
     ========================================================= */

  function renderTerritorio(index) {
    if (
      !territorios[index] ||
      !nomeEl ||
      !metaEl ||
      !iptValorEl ||
      !iptPrioEl ||
      !barrasEl ||
      !barreirasEl ||
      !playbookEl ||
      !canaisEl ||
      !indicadorEl ||
      !cadeiaEl
    ) {
      return;
    }

    const territorio = territorios[index];

    const ipt = calcularIPT(territorio);
    const prioridade = getPrioridade(ipt);

    nomeEl.textContent = territorio.nome;
    metaEl.textContent = territorio.meta;

    /* =======================================================
       IPT
       ======================================================= */

    iptValorEl.style.opacity = "0";

    setTimeout(function () {
      iptValorEl.textContent = String(ipt);
      iptValorEl.style.opacity = "1";
    }, 150);

    iptPrioEl.textContent = prioridade.label;
    iptPrioEl.className =
      "priority-tag " + prioridade.classe;

    /* =======================================================
       DIMENSÕES
       ======================================================= */

    barrasEl.innerHTML = "";

    dimensoes.forEach(function (dimensao, indexDimensao) {
      const valor = territorio[dimensao.chave];

      const item = document.createElement("div");
      item.className = "dimension-item";

      const label = document.createElement("span");
      label.className = "dimension-label";
      label.textContent = dimensao.nome;

      const bar = document.createElement("div");
      bar.className = "dimension-bar";

      const fill = document.createElement("div");
      fill.className = "dimension-fill";
      fill.style.width = "0%";

      const value = document.createElement("span");
      value.className = "dimension-value";
      value.textContent = String(valor);

      bar.appendChild(fill);

      item.appendChild(label);
      item.appendChild(bar);
      item.appendChild(value);

      barrasEl.appendChild(item);

      requestAnimationFrame(function () {
        setTimeout(function () {
          fill.style.width = valor + "%";
        }, 80 + indexDimensao * 60);
      });
    });

    /* =======================================================
       BARREIRAS
       ======================================================= */

    barreirasEl.innerHTML = "";

    territorio.barreiras.forEach(function (barreira) {
      const li = document.createElement("li");

      li.textContent = barreira;

      barreirasEl.appendChild(li);
    });

    /* =======================================================
       PLAYBOOK
       ======================================================= */

    playbookEl.textContent = territorio.playbook;
    canaisEl.textContent = territorio.canais;
    indicadorEl.textContent = territorio.indicador;

    /* =======================================================
       CADEIA DE DECISÃO
       ======================================================= */

    cadeiaEl.innerHTML = "";

    const etapas = [
      {
        titulo: "Dado",
        texto: "IBGE · DataViva · EPT"
      },
      {
        titulo: "IPT",
        texto: ipt + "/100"
      },
      {
        titulo: "Playbook",
        texto:
          territorio.playbook
            .split("—")[0]
            .trim()
      },
      {
        titulo: "Decisão",
        texto: "Humana e revisável"
      }
    ];

    etapas.forEach(function (etapa, index) {
      const link = document.createElement("div");
      link.className = "chain-link";

      const titulo = document.createElement("b");
      titulo.textContent = etapa.titulo;

      const texto = document.createElement("span");
      texto.textContent = etapa.texto;

      link.appendChild(titulo);
      link.appendChild(texto);

      cadeiaEl.appendChild(link);

      if (index < etapas.length - 1) {
        const arrow = document.createElement("span");

        arrow.className = "chain-arrow";
        arrow.textContent = "→";
        arrow.setAttribute("aria-hidden", "true");

        cadeiaEl.appendChild(arrow);
      }
    });
  }

  if (select) {
    select.addEventListener("change", function (event) {
      const index = Number.parseInt(
        event.target.value,
        10
      );

      renderTerritorio(index);
    });

    renderTerritorio(0);
  }

  /* =========================================================
     GRÁFICOS
     ========================================================= */

  function criarBarra(
    container,
    label,
    valor,
    classe
  ) {
    if (!container) {
      return;
    }

    const linha = document.createElement("div");
    linha.className = "bar-row";

    const nome = document.createElement("span");
    nome.textContent = label;
    nome.title = label;

    const track = document.createElement("div");
    track.className = "bar-track";

    const fill = document.createElement("div");

    fill.className =
      "bar-fill " +
      (classe || "default");

    fill.style.width = "0%";

    const numero = document.createElement("b");
    numero.textContent = valor + "%";

    track.appendChild(fill);

    linha.appendChild(nome);
    linha.appendChild(track);
    linha.appendChild(numero);

    container.appendChild(linha);

    requestAnimationFrame(function () {
      setTimeout(function () {
        fill.style.width = valor + "%";
      }, 150);
    });
  }

  /* =========================================================
     GRÁFICO 1
     ========================================================= */

  const g1 = document.getElementById(
    "graficoSemSem"
  );

  if (g1) {
    criarBarra(
      g1,
      "Urbano 15–29",
      25,
      "default"
    );

    criarBarra(
      g1,
      "Rural 15–29",
      38,
      "rural"
    );

    criarBarra(
      g1,
      "Urbano 18–24",
      22,
      "default"
    );

    criarBarra(
      g1,
      "Rural 18–24",
      42,
      "rural"
    );
  }

  /* =========================================================
     GRÁFICO 2
     ========================================================= */

  const g2 = document.getElementById(
    "graficoInternet"
  );

  if (g2) {
    criarBarra(
      g2,
      "Centro urbano",
      82,
      "default"
    );

    criarBarra(
      g2,
      "Periferia",
      58,
      "default"
    );

    criarBarra(
      g2,
      "Rural Norte",
      12,
      "rural"
    );

    criarBarra(
      g2,
      "Rural Sul",
      15,
      "rural"
    );
  }

  /* =========================================================
     GRÁFICO 3 — TOP 10
     ========================================================= */

  const g3 = document.getElementById(
    "graficoTop"
  );

  if (g3) {
    const top10 = [
      {
        nome: "Periferia Leste",
        ipt: 78
      },
      {
        nome: "Rural Norte",
        ipt: 76
      },
      {
        nome: "Rural Sul",
        ipt: 71
      },
      {
        nome: "Com. Ribeirinha",
        ipt: 68
      },
      {
        nome: "Distrito Oeste",
        ipt: 62
      },
      {
        nome: "Sede — bolsões",
        ipt: 58
      },
      {
        nome: "Centro-Oeste",
        ipt: 52
      },
      {
        nome: "Vila Nova",
        ipt: 47
      },
      {
        nome: "Bairro Alto",
        ipt: 42
      },
      {
        nome: "Zona Mista Sul",
        ipt: 38
      }
    ];

    top10.forEach(function (territorio) {
      criarBarra(
        g3,
        territorio.nome,
        territorio.ipt,
        territorio.ipt >= 70
          ? "rural"
          : "default"
      );
    });
  }

  /* =========================================================
     GRÁFICO 4 — ECONOMIA
     ========================================================= */

  const g4 = document.getElementById(
    "graficoEconomia"
  );

  if (g4) {
    criarBarra(
      g4,
      "Agroindústria — emprego",
      72,
      "economy"
    );

    criarBarra(
      g4,
      "Agroindústria — formação",
      28,
      "training"
    );

    criarBarra(
      g4,
      "Comércio — emprego",
      65,
      "economy"
    );

    criarBarra(
      g4,
      "Comércio — formação",
      40,
      "training"
    );

    criarBarra(
      g4,
      "Turismo rural — emprego",
      48,
      "economy"
    );

    criarBarra(
      g4,
      "Turismo rural — formação",
      15,
      "training"
    );

    criarBarra(
      g4,
      "Serviços púb. — emprego",
      35,
      "economy"
    );

    criarBarra(
      g4,
      "Serviços púb. — formação",
      55,
      "training"
    );
  }

  /* =========================================================
     GARANTIA CONTRA OVERFLOW
     ========================================================= */

  function corrigirOverflow() {
    document.documentElement.style.maxWidth = "100%";
    document.body.style.maxWidth = "100%";
  }

  corrigirOverflow();

  window.addEventListener(
    "resize",
    corrigirOverflow,
    { passive: true }
  );
})();