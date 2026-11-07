# Backlog inicial do GitHub — 15 Issues prontas para cadastro

Os itens abaixo foram escritos para copiar para **GitHub → Issues → New issue**. Os códigos `I-01`–`I-15` são chaves locais de rastreabilidade; o GitHub atribuirá os números (`#1`, `#2`…) somente após cadastro. A lista é um backlog proposto, não prova de que Issues já foram abertas.

Para cada item: copie o título e o corpo, crie/associe os labels indicados e, depois de cadastrar, registre o número real na tabela de rastreabilidade. Não use `Closes #...` até saber o número atribuído.

## I-01 — Estruturar o projeto e configurar validação básica

**Labels sugeridas:** `chore`, `enhancement`  
**Rastreabilidade:** RNF01, RNF07, RNF08.

**Descrição:** Como equipe do projeto (mesmo em trabalho individual), queremos uma estrutura simples e executável para reduzir atrito de configuração e manter fonte e testes organizados.

**Critérios de aceite:**
- [ ] **Dado** um clone limpo do repositório, **quando** listar os arquivos, **então** encontro `index.html`, `src/`, `tests/`, `docs/`, `README.md`, `.gitignore` e `package.json`.
- [ ] **Dado** Node.js 18 ou superior, **quando** executar `npm test`, **então** os testes rodam sem instalar dependências de terceiros.
- [ ] **Dado** a aplicação, **quando** verificar dependências de execução, **então** ela usa HTML, CSS e JavaScript nativos.

## I-02 — Escrever o Termo de Abertura (Project Charter)

**Labels sugeridas:** `documentation`  
**Rastreabilidade:** objetivos acadêmicos, escopo e stakeholders.

**Descrição:** Como avaliador, quero entender a razão, visão, limites e resultados esperados do produto antes da implementação.

**Critérios de aceite:**
- [ ] **Dado** `docs/project-charter.md`, **quando** revisar o documento, **então** encontro justificativa, visão, objetivos SMART, escopo incluído/excluído, stakeholders, premissas, restrições e critérios de sucesso.
- [ ] **Dado** os limites do produto, **quando** ler o escopo fora, **então** está explícito que autenticação, sincronização e backend não fazem parte desta versão.

## I-03 — Formalizar RFs, RNFs e rastreabilidade

**Labels sugeridas:** `documentation`  
**Rastreabilidade:** RF01–RF10, RNF01–RNF09.

**Descrição:** Como equipe, quero requisitos numerados e verificáveis para orientar implementação, revisão e evolução do backlog.

**Critérios de aceite:**
- [ ] **Dado** `docs/requisitos.md`, **quando** revisar os RFs, **então** cada um tem identificador estável, descrição testável e ligação com casos/histórias/Issues.
- [ ] **Dado** os RNFs, **quando** validar o documento, **então** desempenho, persistência, usabilidade/acessibilidade, segurança, portabilidade, manutenibilidade e robustez estão especificados.
- [ ] **Dado** a matriz de rastreabilidade, **quando** seguir um requisito, **então** consigo localizar história, caso de uso e item de backlog relacionado.

## I-04 — Especificar casos de uso e histórias de usuário

**Labels sugeridas:** `documentation`  
**Rastreabilidade:** UC01–UC06, US01–US06.

**Descrição:** Como avaliador e desenvolvedor, quero fluxos e critérios de aceite explícitos para saber o comportamento esperado e os caminhos de exceção.

**Critérios de aceite:**
- [ ] **Dado** `docs/casos-de-uso.md`, **quando** revisar os fluxos centrais, **então** há atores, pré/pós-condições e fluxos principais, alternativos e de exceção.
- [ ] **Dado** `docs/user-stories.md`, **quando** revisar as histórias, **então** seguem o padrão “Como [ator], quero [ação] para que [valor]”.
- [ ] **Dado** cada história, **quando** executar mentalmente seus critérios, **então** há cenários em formato Dado/Quando/Então e ligação a requisitos.

## I-05 — Cadastrar e listar tarefas

**Labels sugeridas:** `feature`  
**Rastreabilidade:** RF01, RF02, RF10; US01, US02; UC01, UC02.

**Descrição:** Como pessoa que organiza pendências, quero criar e visualizar tarefas para transformar intenções em ações claras.

**Critérios de aceite:**
- [ ] **Dado** título não vazio, **quando** adiciono tarefa, **então** ela aparece como pendente na lista.
- [ ] **Dado** campos opcionais omitidos, **quando** crio uma tarefa, **então** prioridade fica média e descrição/prazo ficam vazios.
- [ ] **Dado** título vazio ou acima de 120 caracteres, **quando** tento salvar, **então** a tarefa não é criada e recebo feedback de validação.
- [ ] **Dado** descrição acima de 500 caracteres, **quando** submeto, **então** a entrada é recusada.

## I-06 — Concluir e reabrir tarefas

**Labels sugeridas:** `feature`  
**Rastreabilidade:** RF03; US02; UC03.

**Descrição:** Como usuário, quero marcar tarefas como concluídas ou reabri-las para acompanhar meu avanço real.

**Critérios de aceite:**
- [ ] **Dado** tarefa pendente, **quando** marco sua caixa, **então** passa a concluída e o horário de conclusão é registrado.
- [ ] **Dado** tarefa concluída, **quando** desmarco sua caixa, **então** retorna a pendente e `completedAt` fica vazio.
- [ ] **Dado** qualquer transição, **quando** a interface atualiza, **então** totais e progresso refletem o estado novo.

## I-07 — Editar tarefas existentes

**Labels sugeridas:** `feature`  
**Rastreabilidade:** RF04, RF10; US03; UC04.

**Descrição:** Como usuário, quero corrigir título, descrição, prioridade ou prazo sem recriar a tarefa.

**Critérios de aceite:**
- [ ] **Dado** tarefa cadastrada, **quando** salvo alterações válidas, **então** a lista exibe os novos valores.
- [ ] **Dado** tarefa editada, **quando** a atualização é salva, **então** ID e `createdAt` são preservados.
- [ ] **Dado** título inválido, **quando** tento salvar, **então** o diálogo permanece aberto com mensagem de erro.
- [ ] **Dado** que cancelo a edição, **quando** fecho o diálogo sem salvar, **então** nenhum campo é alterado.

## I-08 — Excluir tarefa com confirmação

**Labels sugeridas:** `feature`  
**Rastreabilidade:** RF05; US04; UC05.

**Descrição:** Como usuário, quero remover tarefas obsoletas e evitar exclusão acidental por meio de confirmação.

**Critérios de aceite:**
- [ ] **Dado** tarefa existente, **quando** seleciono excluir, **então** o sistema solicita confirmação identificando o item.
- [ ] **Dado** que confirmo, **quando** a ação termina, **então** a tarefa não consta mais na lista.
- [ ] **Dado** que cancelo, **quando** retorno à lista, **então** a tarefa permanece sem alteração.

## I-09 — Filtrar e pesquisar tarefas

**Labels sugeridas:** `feature`, `enhancement`  
**Rastreabilidade:** RF06, RF07, RF10; US05; UC02.

**Descrição:** Como usuário com múltiplas tarefas, quero localizar itens por estado e texto para encontrar rapidamente uma pendência.

**Critérios de aceite:**
- [ ] **Dado** tarefas em estados diferentes, **quando** seleciono Todas, A fazer ou Concluídas, **então** vejo somente os estados correspondentes.
- [ ] **Dado** um termo no título ou descrição, **quando** pesquiso esse termo em caixa diferente, **então** a tarefa correspondente aparece.
- [ ] **Dado** busca e filtro combinados, **quando** nenhum item corresponde, **então** a interface informa ausência de resultados.

## I-10 — Persistir tarefas e mostrar progresso

**Labels sugeridas:** `feature`, `enhancement`  
**Rastreabilidade:** RF08, RF09; US06; UC02, UC06; RNF02, RNF09.

**Descrição:** Como usuário, quero manter tarefas no mesmo navegador e visualizar totais para retomar o trabalho sem perder contexto.

**Critérios de aceite:**
- [ ] **Dado** tarefas válidas persistidas, **quando** reabro a mesma origem e perfil de navegador, **então** são recuperadas.
- [ ] **Dado** JSON inválido ou estrutura incorreta, **quando** a aplicação carrega, **então** ela inicia com lista vazia sem falha fatal.
- [ ] **Dado** tarefas abertas e concluídas, **quando** olho o resumo, **então** vejo contagens abertas, concluídas, totais e percentual.
- [ ] **Dado** armazenamento indisponível, **quando** salvo uma alteração, **então** recebo uma mensagem de que a persistência falhou.

## I-11 — Tornar interface responsiva, acessível e segura

**Labels sugeridas:** `enhancement`, `accessibility`  
**Rastreabilidade:** RF10, RNF03, RNF04, RNF06.

**Descrição:** Como usuário em diferentes dispositivos e modos de interação, quero operar a aplicação com clareza por toque, teclado e tecnologias assistivas.

**Critérios de aceite:**
- [ ] **Dado** viewport de 320 px ou mais, **quando** uso a interface, **então** não há rolagem horizontal da página e os controles permanecem utilizáveis.
- [ ] **Dado** navegação por teclado, **quando** percorro os controles, **então** o foco é visível e consigo acionar funções principais.
- [ ] **Dado** leitores de tela, **quando** interajo, **então** os controles têm rótulos e mensagens de estado são anunciadas.
- [ ] **Dado** texto de usuário com marcação HTML, **quando** a tarefa é renderizada, **então** é exibido como texto e não executado como HTML.

## I-12 — Cobrir regras de domínio com testes

**Labels sugeridas:** `test`, `quality`  
**Rastreabilidade:** RNF07, RNF09; Issue I-01.

**Descrição:** Como responsável por manutenção, quero testes de regressão para validar as regras centrais sem exigir frameworks externos.

**Critérios de aceite:**
- [ ] **Dado** Node.js 18+, **quando** executo `npm test`, **então** testes de criação, validação, edição, conclusão, busca/filtros, estatísticas e armazenamento são executados.
- [ ] **Dado** uma validação de entrada inválida, **quando** a regra é exercitada, **então** o teste confirma erro compreensível e ausência de tarefa inválida.
- [ ] **Dado** resultado de testes, **quando** o PR é aberto, **então** o resultado é registrado na descrição.

## I-13 — Completar guia de instalação e uso

**Labels sugeridas:** `documentation`  
**Rastreabilidade:** RNF08; artefato README.

**Descrição:** Como avaliador ou novo colaborador, quero clonar, executar e testar o projeto com passos reproduzíveis.

**Critérios de aceite:**
- [ ] **Dado** um clone limpo, **quando** sigo o README, **então** consigo iniciar por servidor HTTP estático sem `npm install`.
- [ ] **Dado** Node.js 18+, **quando** sigo o guia, **então** consigo executar `npm test`.
- [ ] **Dado** documentação de planejamento, **quando** leio o README, **então** há links diretos válidos para cada documento em `docs/`.
- [ ] **Dado** o workflow adotado, **quando** leio o README, **então** entendo branches, commits, tags e fechamento de Issues.

## I-14 — Adotar Git Flow, Conventional Commits e SemVer

**Labels sugeridas:** `chore`, `documentation`  
**Rastreabilidade:** requisitos de processo da atividade; `docs/workflow-git.md`.

**Descrição:** Como estudante, quero um processo de branch e versionamento rastreável para demonstrar práticas profissionais sem trabalhar diretamente na branch de produção.

**Critérios de aceite:**
- [ ] **Dado** uma tarefa ligada a Issue, **quando** inicio trabalho, **então** crio branch temática a partir de `develop` e não comito diretamente em `main`.
- [ ] **Dado** commits, **quando** os registro, **então** uso o padrão Conventional Commits e mantenho cada commit coeso.
- [ ] **Dado** um marco estável, **quando** aprovo release, **então** crio tag git anotada compatível com SemVer.
- [ ] **Dado** um PR de Issue, **quando** o descrevo, **então** incluo `Closes #<número-real>` e critérios/testes pertinentes.

## I-15 — Automatizar testes em integração contínua

**Labels sugeridas:** `enhancement`, `automation`  
**Status inicial:** planejado; não há pipeline configurado nesta entrega.  
**Rastreabilidade:** RNF07; próxima etapa de qualidade.

**Descrição:** Como responsável pelo repositório, quero executar testes automaticamente em PRs e pushes para `develop`/`main`, detectando regressões antes do merge.

**Critérios de aceite:**
- [ ] **Dado** um PR direcionado a `develop` ou `main`, **quando** o workflow GitHub Actions inicia, **então** instala a versão compatível do Node.js e executa `npm test`.
- [ ] **Dado** que um teste falha, **quando** o workflow termina, **então** o check fica vermelho e bloqueia a aprovação conforme proteção configurada.
- [ ] **Dado** que todos os testes passam, **quando** o workflow termina, **então** o check reporta sucesso.
- [ ] **Dado** o README, **quando** o pipeline for integrado, **então** o badge deve refletir o status real do workflow.

## Sincronização após cadastrar

| Código local | Número GitHub | Estado / PR |
|---|---|---|
| I-01–I-15 | preencher ao cadastrar | preencher após merge do PR correspondente |

Cada Issues exige labels no repositório. Se algum label não existir (por exemplo `accessibility`, `quality` ou `automation`), crie-o ou use o mais próximo sem remover o significado registrado aqui.
