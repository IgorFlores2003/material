import { useEffect, useState } from 'react';
import { FaFilePdf, FaUndo } from 'react-icons/fa';
import { fichaEntrevistado, fichaEntrevistador, vagas } from '../../data/fichas';
import './Fichas.css';

const STORAGE_KEY = 'fichas-preenchidas';

// Respostas que precisam estar preenchidas para salvar o PDF (id = elemento que recebe o foco)
const OBRIGATORIOS = {
  entrevistador: [
    { campo: 'nome', rotulo: 'Nome do entrevistador', id: 'ent-nome' },
    { campo: 'candidato', rotulo: 'Nome do candidato', id: 'ent-candidato' },
    { campo: 'vaga', rotulo: 'Vaga escolhida', id: 'ent-vaga-A' },
    { campo: 'positivo', rotulo: 'Ponto positivo', id: 'ent-positivo' },
    { campo: 'sugestao', rotulo: 'Sugestão para melhorar', id: 'ent-sugestao' },
  ],
  entrevistado: [
    { campo: 'nome', rotulo: 'Nome', id: 'cand-nome' },
    { campo: 'vaga', rotulo: 'Minha escolha de vaga', id: 'cand-vaga-A' },
    { campo: 'resp0', rotulo: 'Pergunta 1', id: 'cand-resp0' },
    { campo: 'resp1', rotulo: 'Pergunta 2', id: 'cand-resp1' },
    { campo: 'resp2', rotulo: 'Pergunta 3', id: 'cand-resp2' },
    { campo: 'melhorar', rotulo: 'O que eu poderia melhorar', id: 'cand-melhorar' },
  ],
};

function camposFaltando(fichaId, r) {
  return OBRIGATORIOS[fichaId].filter(({ campo }) => !String(r[campo] || '').trim());
}

function respostasIniciais() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

// Campo de texto que, na impressão, vira um bloco de texto (textarea corta o conteúdo no PDF)
function Campo({ rotulo, valor, onChange, linhas = 3, id, obrigatorio, erro }) {
  const props = {
    id,
    value: valor,
    onChange: (e) => onChange(e.target.value),
    'aria-required': obrigatorio || undefined,
    'aria-invalid': erro || undefined,
  };
  return (
    <div className={`campo${erro ? ' campo--erro' : ''}`}>
      <label className="campo__rotulo" htmlFor={id}>
        {rotulo}
        {obrigatorio && (
          <span className="campo__obrigatorio" aria-hidden="true">
            {' '}*
          </span>
        )}
      </label>
      {linhas === 1 ? <input type="text" {...props} /> : <textarea rows={linhas} {...props} />}
      {erro && <span className="campo__erro">Preencha este campo.</span>}
      <span className="campo__impressao" aria-hidden="true">
        {valor || ' '}
      </span>
    </div>
  );
}

function Secao({ numero, titulo, children }) {
  return (
    <section className="ficha__secao">
      <h4 className="ficha__secao-titulo">
        <span className="ficha__secao-numero">{numero}</span>
        {titulo}
      </h4>
      {children}
    </section>
  );
}

function Vagas({ prefixo, vaga, onEscolher, rotulo, erro }) {
  return (
    <>
      <div className="vagas" role="radiogroup" aria-label={rotulo} aria-required="true" aria-invalid={erro || undefined}>
        {vagas.map((v) => (
          <label key={v.letra} className={`vaga${vaga === v.letra ? ' vaga--escolhida' : ''}`}>
            <input
              id={`${prefixo}-vaga-${v.letra}`}
              type="radio"
              name={`${prefixo}-vaga`}
              value={v.letra}
              checked={vaga === v.letra}
              onChange={() => onEscolher(v.letra)}
            />
            <span className="vaga__titulo">
              <span className="vaga__letra">{v.letra}</span>
              {v.titulo}
            </span>
            <span className="vaga__empresa">Empresa fictícia: {v.empresa}</span>
            <span className="vaga__texto">Atividades: {v.atividades}</span>
            <span className="vaga__texto">
              <strong>Requisitos:</strong> {v.requisitos}
            </span>
          </label>
        ))}
      </div>
      <p className={`vagas__escolha${erro ? ' vagas__escolha--erro' : ''}`}>
        {rotulo}
        <span className="campo__obrigatorio" aria-hidden="true">
          {' '}*
        </span>{' '}
        <strong>{vaga || '—'}</strong>
        {erro && <span className="campo__erro"> Escolha uma vaga.</span>}
      </p>
    </>
  );
}

function Checklist({ itens, marcados = [], onAlternar }) {
  return (
    <ul className="checklist">
      {itens.map((item, i) => (
        <li key={item}>
          <label>
            <input type="checkbox" checked={marcados.includes(i)} onChange={() => onAlternar(i)} />
            {item}
          </label>
        </li>
      ))}
    </ul>
  );
}

function FichaEntrevistador({ r, set, alternar, faltando }) {
  const f = fichaEntrevistador;
  const erro = (campo) => faltando.includes(campo);
  return (
    <>
      <div className="ficha__nomes">
        <Campo id="ent-nome" obrigatorio erro={erro('nome')} rotulo="Nome do entrevistador:" linhas={1} valor={r.nome || ''} onChange={(v) => set('nome', v)} />
        <Campo id="ent-candidato" obrigatorio erro={erro('candidato')} rotulo="Nome do candidato:" linhas={1} valor={r.candidato || ''} onChange={(v) => set('candidato', v)} />
      </div>

      <Secao numero={1} titulo="Escolha da vaga">
        <p className="ficha__instrucao">
          O candidato deverá escolher uma das quatro oportunidades fictícias abaixo. Leia a descrição e utilize os
          requisitos para orientar a entrevista.
        </p>
        <Vagas prefixo="ent" vaga={r.vaga} onEscolher={(v) => set('vaga', v)} rotulo="Vaga escolhida:" erro={erro('vaga')} />
      </Secao>

      <Secao numero={2} titulo="Condução da entrevista">
        <p className="ficha__instrucao">
          Faça as três perguntas abaixo. Escute com atenção, evite interromper e observe se o candidato consegue
          apresentar informações relacionadas à vaga escolhida.
        </p>
        <div className="perguntas">
          {f.perguntas.map((p, i) => (
            <div key={p.titulo} className="pergunta">
              <span className="pergunta__numero">Pergunta {i + 1}</span>
              <strong className="pergunta__titulo">{p.titulo}</strong>
              <span className="pergunta__pense">Observe se o candidato:</span>
              <Checklist
                itens={p.observe}
                marcados={r[`obs${i}`]}
                onAlternar={(item) => alternar(`obs${i}`, item)}
              />
              <Campo
                id={`ent-anot${i}`}
                rotulo="Anotações:"
                valor={r[`anot${i}`] || ''}
                onChange={(v) => set(`anot${i}`, v)}
              />
            </div>
          ))}
        </div>
      </Secao>

      <Secao numero={3} titulo="Comunicação e postura profissional">
        <p className="ficha__instrucao">Durante a entrevista, observe:</p>
        <Checklist itens={f.postura} marcados={r.postura} onAlternar={(i) => alternar('postura', i)} />
        <p className="ficha__aviso">
          <strong>Atenção:</strong> nervosismo, contato visual reduzido ou gestos diferentes não significam falta de
          competência. Considere a comunicação de maneira contextualizada, respeitando as características individuais.
        </p>
      </Secao>

      <Secao numero={4} titulo="Feedback ao candidato">
        <div className="ficha__colunas">
          <Campo id="ent-positivo" obrigatorio erro={erro('positivo')} rotulo="Um ponto positivo que observei:" valor={r.positivo || ''} onChange={(v) => set('positivo', v)} />
          <Campo id="ent-sugestao" obrigatorio erro={erro('sugestao')} rotulo="Uma sugestão para melhorar na próxima entrevista:" valor={r.sugestao || ''} onChange={(v) => set('sugestao', v)} />
        </div>
        <p className="ficha__aviso">
          <strong>Lembre-se:</strong> o objetivo é praticar a entrevista e oferecer um feedback respeitoso. Não é
          necessário decidir quem seria contratado.
        </p>
      </Secao>
    </>
  );
}

function FichaEntrevistado({ r, set, alternar, faltando }) {
  const f = fichaEntrevistado;
  const erro = (campo) => faltando.includes(campo);
  return (
    <>
      <div className="ficha__nomes ficha__nomes--um">
        <Campo id="cand-nome" obrigatorio erro={erro('nome')} rotulo="Nome:" linhas={1} valor={r.nome || ''} onChange={(v) => set('nome', v)} />
      </div>

      <Secao numero={1} titulo="Escolha a oportunidade">
        <p className="ficha__instrucao">
          Leia as quatro vagas e escolha aquela que mais combina com seus interesses, conhecimentos ou objetivos
          profissionais.
        </p>
        <Vagas prefixo="cand" vaga={r.vaga} onEscolher={(v) => set('vaga', v)} rotulo="Minha escolha:" erro={erro('vaga')} />
      </Secao>

      <Secao numero={2} titulo="Prepare suas respostas">
        <p className="ficha__instrucao">
          Você terá alguns minutos para refletir antes da entrevista. Utilize os espaços para escrever palavras-chave,
          sem precisar elaborar respostas completas.
        </p>
        {f.perguntas.map((p, i) => (
          <div key={p.titulo} className="pergunta pergunta--larga">
            <div>
              <span className="pergunta__numero">Pergunta {i + 1}</span>
              <strong className="pergunta__titulo">{p.titulo}</strong>
              <span className="pergunta__pense">{p.pense}</span>
              <ul className="pergunta__dicas">
                {p.dicas.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
            <Campo id={`cand-resp${i}`} obrigatorio erro={erro(`resp${i}`)} rotulo={p.campo} valor={r[`resp${i}`] || ''} onChange={(v) => set(`resp${i}`, v)} />
          </div>
        ))}
      </Secao>

      <Secao numero={3} titulo="Dicas para a entrevista">
        <Checklist itens={f.dicasEntrevista} marcados={r.dicas} onAlternar={(i) => alternar('dicas', i)} />
      </Secao>

      <Secao numero={4} titulo="Após a entrevista">
        <Campo id="cand-melhorar" obrigatorio erro={erro('melhorar')} rotulo="O que eu poderia melhorar na próxima entrevista?" valor={r.melhorar || ''} onChange={(v) => set('melhorar', v)} />
        <p className="ficha__aviso">
          <strong>Lembre-se:</strong> você não precisa decorar respostas nem demonstrar que sabe tudo. Procure explicar
          o que já aprendeu, quais competências desenvolveu e como elas podem contribuir para a oportunidade escolhida.
        </p>
      </Secao>
    </>
  );
}

const FICHAS = [fichaEntrevistador, fichaEntrevistado];

function Fichas() {
  const [ativa, setAtiva] = useState(fichaEntrevistador.id);
  const [respostas, setRespostas] = useState(respostasIniciais);
  // Só mostra os erros depois da primeira tentativa de salvar
  const [tentouSalvar, setTentouSalvar] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(respostas));
    } catch {
      // sem rascunho salvo, mas o preenchimento continua funcionando
    }
  }, [respostas]);

  const ficha = FICHAS.find((f) => f.id === ativa);
  const r = respostas[ativa] || {};
  const faltando = camposFaltando(ativa, r);
  const errosVisiveis = tentouSalvar ? faltando.map((f) => f.campo) : [];

  const trocarFicha = (id) => {
    setAtiva(id);
    setTentouSalvar(false);
  };

  const set = (campo, valor) =>
    setRespostas((atual) => ({ ...atual, [ativa]: { ...atual[ativa], [campo]: valor } }));

  const alternar = (campo, item) => {
    const lista = r[campo] || [];
    set(campo, lista.includes(item) ? lista.filter((x) => x !== item) : [...lista, item]);
  };

  const limpar = () => {
    if (window.confirm('Apagar tudo o que foi preenchido nesta ficha?')) {
      setRespostas((atual) => ({ ...atual, [ativa]: {} }));
      setTentouSalvar(false);
    }
  };

  const salvarPdf = () => {
    if (faltando.length) {
      setTentouSalvar(true);
      document.getElementById(faltando[0].id)?.focus();
      return;
    }
    // O título vira o nome sugerido do arquivo ao salvar como PDF
    const tituloOriginal = document.title;
    const nome = (r.nome || '').trim().replace(/\s+/g, '_');
    document.title = `Ficha_${ficha.nome}${nome ? `_${nome}` : ''}`;
    window.print();
    document.title = tituloOriginal;
  };

  const Conteudo = ativa === fichaEntrevistador.id ? FichaEntrevistador : FichaEntrevistado;

  return (
    <section id="fichas" className="fichas conteudo" aria-labelledby="fichas-titulo">
      <h2 id="fichas-titulo" className="titulo-secao">
        Preencha <span>sua ficha</span>
      </h2>
      <p className="fichas__subtitulo">Escolha a sua ficha, preencha aqui mesmo e salve em PDF.</p>

      <div className="fichas__abas" role="tablist" aria-label="Escolha a ficha">
        {FICHAS.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={ativa === f.id}
            className={`fichas__aba${ativa === f.id ? ' fichas__aba--ativa' : ''}`}
            onClick={() => trocarFicha(f.id)}
          >
            Ficha {f.numero} · {f.nome}
          </button>
        ))}
      </div>

      <form className="ficha" onSubmit={(e) => e.preventDefault()} aria-label={`Ficha ${ficha.numero}: ${ficha.nome}`}>
        <header className="ficha__cabecalho">
          <span className="rotulo">Workshop Open Innovation 2026</span>
          <h3 className="ficha__titulo">
            Ficha {ficha.numero} <span>| {ficha.nome}</span>
          </h3>
          <span className="ficha__subtitulo">{ficha.subtitulo}</span>
        </header>

        <Conteudo r={r} set={set} alternar={alternar} faltando={errosVisiveis} />

        <footer className="ficha__rodape">
          V Open Innovation 2026 · Semana da Administração &amp; Ciências Contábeis · Univás · Murilo e Yasmim
        </footer>
      </form>

      {tentouSalvar && faltando.length > 0 && (
        <div className="fichas__alerta" role="alert">
          <strong>Para salvar o PDF, preencha:</strong> {faltando.map((f) => f.rotulo).join(', ')}.
        </div>
      )}

      <div className="fichas__acoes">
        <button type="button" className="fichas__botao fichas__botao--principal" onClick={salvarPdf}>
          <FaFilePdf aria-hidden="true" /> Salvar em PDF
        </button>
        <button type="button" className="fichas__botao" onClick={limpar}>
          <FaUndo aria-hidden="true" /> Limpar ficha
        </button>
      </div>
      <p className="fichas__dica">
        Campos com * são obrigatórios. Ao clicar em “Salvar em PDF”, escolha <strong>Salvar como PDF</strong> como destino. No celular, use a opção
        de compartilhar/salvar da tela de impressão. O que você digita fica guardado só neste aparelho.
      </p>
    </section>
  );
}

export default Fichas;
