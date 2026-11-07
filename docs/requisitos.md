# Requisitos — Feito

**Convenção:** `RF` identifica requisito funcional; `RNF` identifica requisito não funcional. Estes identificadores são estáveis e devem ser preservados em Issues, PRs e alterações documentais.

## Requisitos funcionais

| ID | Requisito | Verificação / rastreabilidade |
|---|---|---|
| **RF01** | O sistema deve permitir cadastrar uma tarefa com título obrigatório de até 120 caracteres, descrição opcional de até 500 caracteres, prioridade (baixa, média ou alta) e prazo opcional. O título deve ser armazenado sem espaços excedentes nas extremidades. | UC01; US01; Issue I-05; testes de criação e validação. |
| **RF02** | O sistema deve exibir as tarefas cadastradas, indicando título, prioridade, prazo quando informado e estado de conclusão. | UC02; US02; Issue I-05. |
| **RF03** | O sistema deve permitir marcar uma tarefa como concluída e reabri-la, mantendo o horário da última atualização e, quando concluída, a data/hora de conclusão. | UC03; US02; Issue I-06. |
| **RF04** | O sistema deve permitir editar título, descrição, prioridade e prazo, sem alterar o identificador ou a data de criação da tarefa. | UC04; US03; Issue I-07. |
| **RF05** | O sistema deve permitir excluir uma tarefa após apresentar confirmação ao usuário. | UC05; US04; Issue I-08. |
| **RF06** | O sistema deve filtrar a lista por todas, tarefas em aberto ou tarefas concluídas. | UC02; US05; Issue I-09. |
| **RF07** | O sistema deve permitir buscar tarefas por texto contido no título ou na descrição, sem diferenciar maiúsculas de minúsculas. | UC02; US05; Issue I-09. |
| **RF08** | O sistema deve persistir e recuperar tarefas no `localStorage` do navegador, para a mesma origem e perfil. Dados ausentes ou inválidos não devem impedir a abertura da aplicação. | UC06; US06; Issue I-10; testes de armazenamento. |
| **RF09** | O sistema deve apresentar totais de tarefas em aberto, concluídas e totais registrados, além do percentual de conclusão. | UC02; US06; Issue I-10. |
| **RF10** | O sistema deve apresentar estados vazios e mensagens de validação/feedback apropriados para cadastro, edição e ações principais. | UC01–UC06; US01–US06; Issue I-11. |

## Requisitos não funcionais

| ID | Categoria | Requisito verificável |
|---|---|---|
| **RNF01** | Tecnologia / portabilidade | A interface deve usar HTML5, CSS3 e JavaScript ES6+, sem framework pesado ou dependências de runtime. Deve funcionar em navegadores atuais com suporte a módulos ES, `localStorage` e `<dialog>`. |
| **RNF02** | Persistência / privacidade | As tarefas devem permanecer no armazenamento local da origem e não ser transmitidas a um backend. O produto deve informar que limpar dados do navegador pode remover as tarefas. |
| **RNF03** | Usabilidade / acessibilidade | Controles devem ter rótulos acessíveis, foco visível, operação por teclado e mensagens de estado adequadas. A interface deve respeitar `prefers-reduced-motion`. |
| **RNF04** | Responsividade | Conteúdo e controles devem se adaptar a telas estreitas (mínimo de referência: 320 px) sem rolagem horizontal da página. |
| **RNF05** | Desempenho | Em navegador moderno, ações locais de cadastro, edição, conclusão, busca e filtro para uma lista de até 1.000 tarefas devem responder em até 500 ms em condições usuais de uso. |
| **RNF06** | Segurança | Conteúdo fornecido pelo usuário deve ser renderizado como texto, não como HTML executável. A aplicação não deve incorporar segredos, credenciais ou dados pessoais desnecessários. |
| **RNF07** | Manutenibilidade / qualidade | A lógica de domínio deve ser separada da interface e da persistência. As regras centrais devem ter testes automatizados executáveis com `npm test`, sem biblioteca de teste de terceiros. |
| **RNF08** | Instalação / operação | A aplicação deve executar localmente por servidor HTTP estático, sem `npm install`; Node.js 18+ é necessário somente para rodar os testes. |
| **RNF09** | Robustez | JSON malformado ou conteúdo que não represente uma lista de tarefas deve ser tratado sem erro fatal, apresentando a aplicação vazia e utilizável. |

## Regras de negócio e validação

- Um título composto apenas por espaços é inválido; espaços no início/fim são removidos antes de salvar.
- Prioridades aceitas pelo modelo são `low`, `medium` e `high`, com rótulos em português na interface.
- O prazo, se informado, usa o formato ISO de data `AAAA-MM-DD`.
- Reabrir uma tarefa remove sua data/hora de conclusão; concluir novamente grava um novo instante.
- Busca e filtros são combinados: a busca restringe o subconjunto definido pelo filtro.
- A tarefa não é sincronizada entre navegadores/dispositivos.

## Matriz resumida de rastreabilidade

| Requisito | História | Caso de uso | Teste/Issue inicial |
|---|---|---|---|
| RF01 | US01 | UC01 | I-05 |
| RF02, RF06, RF07 | US02, US05 | UC02 | I-05, I-09 |
| RF03 | US02 | UC03 | I-06 |
| RF04 | US03 | UC04 | I-07 |
| RF05 | US04 | UC05 | I-08 |
| RF08 | US06 | UC06 | I-10 |
| RF09 | US06 | UC02 | I-10 |
| RF10 | US01–US06 | UC01–UC06 | I-11 |
| RNF01–RNF09 | US01–US06 | UC01–UC06 | I-01, I-11–I-15 |
