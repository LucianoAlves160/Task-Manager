# Feito — Mini-gerenciador de Tarefas

[![Versão](https://img.shields.io/badge/vers%C3%A3o-0.1.0-blue)](package.json)
[![Licença](https://img.shields.io/badge/licen%C3%A7a-MIT-green)](LICENSE)
[![Testes](https://img.shields.io/badge/testes-9%20passando-brightgreen)](tests/task-manager.test.js)
[![Build](https://img.shields.io/badge/build-CI%20n%C3%A3o%20configurada-lightgrey)](docs/github-issues.md)

**Feito** é um mini-gerenciador de tarefas pessoal, leve e sem cadastro. Permite registrar pendências, definir prioridade e prazo, acompanhar o que já foi concluído e localizar tarefas por busca e filtros. A aplicação usa HTML5, CSS3 e JavaScript ES6+ puro; os dados ficam no `localStorage` do navegador.

> **Privacidade e limite importante:** esta versão não envia tarefas a um servidor. Os dados existem apenas na origem e no perfil de navegador utilizados; limpar o armazenamento do navegador ou trocar de dispositivo pode torná-los indisponíveis. Não há sincronização nem backup.

## Funcionalidades

### Implementadas nesta versão local

- Cadastro de tarefa com título obrigatório (até 120 caracteres), descrição opcional (até 500), prioridade baixa/média/alta e prazo opcional.
- Listagem, edição e exclusão com confirmação.
- Marcação como concluída e reabertura de tarefa.
- Busca por título e descrição, combinada com filtros Todas / A fazer / Concluídas.
- Persistência no `localStorage`, totais e percentual de conclusão.
- Estados vazios, validação, mensagens acessíveis, foco visível, suporte a telas menores e respeito a `prefers-reduced-motion`.
- Nove testes de domínio e armazenamento executáveis com `node:test`.

### Planejadas / ainda não integradas

- Pipeline de integração contínua com GitHub Actions (Issue I-15).
- Repositório GitHub, branches remotas, Pull Requests e cadastro real das 15 Issues: dependem de selecionar o repositório de destino e realizar o push/cadastro. Os itens prontos para copiar estão em [`docs/github-issues.md`](docs/github-issues.md).
- Recursos fora do escopo desta versão: login, backend, sincronização, colaboração, notificações e aplicativo móvel.

## Requisitos de ambiente

- Navegador moderno com suporte a módulos JavaScript ES, `localStorage` e `<dialog>`.
- Python 3 para servir os arquivos localmente (ou outro servidor HTTP estático).
- Node.js 18+ apenas para executar os testes.
- **Não é necessário `npm install`**: não há dependências de aplicação.

## Configuração e execução local

1. Clone ou baixe o repositório e abra a pasta `mini-gerenciador-tarefas` em um terminal.
2. Inicie um servidor HTTP estático na raiz do projeto:
   ```bash
   python3 -m http.server 8000
   ```
   No Windows, se `python3` não estiver disponível, tente `python -m http.server 8000`.
3. Abra [http://localhost:8000](http://localhost:8000) no navegador.
4. Para encerrar o servidor, volte ao terminal e pressione `Ctrl+C`.

> Não abra `index.html` diretamente com `file://`: navegadores podem bloquear módulos ES nessa origem. Use sempre o servidor HTTP local.

## Executar testes

Com Node.js 18 ou superior instalado, na raiz do projeto:

```bash
npm test
```

Os testes cobrem criação e validação, edição, alternância de conclusão, busca/filtros, estatísticas, persistência e dados corrompidos.

## Estrutura do projeto

```text
mini-gerenciador-tarefas/
├── .github/
│   ├── ISSUE_TEMPLATE/           # Modelos de defeito e melhoria
│   └── PULL_REQUEST_TEMPLATE.md  # Checklist de PR e rastreabilidade
├── docs/
│   ├── project-charter.md        # Termo de Abertura
│   ├── requisitos.md             # RFs, RNFs e matriz de rastreabilidade
│   ├── casos-de-uso.md           # Atores e fluxos de uso
│   ├── user-stories.md           # Histórias e critérios BDD
│   ├── arquitetura.md            # Componentes, dados e wireframe textual
│   ├── workflow-git.md           # Git Flow, commits e SemVer
│   └── github-issues.md          # 15 Issues preparadas para cadastro
├── src/
│   ├── app.js                    # Interface e eventos
│   ├── task-manager.js           # Regras de domínio
│   ├── task-storage.js           # Persistência local
│   └── style.css                 # Estilos responsivos
├── tests/task-manager.test.js
├── index.html
├── package.json
├── .gitignore
└── LICENSE
```

## Documentação de engenharia

- [Termo de Abertura / Project Charter](docs/project-charter.md)
- [Requisitos Funcionais e Não Funcionais](docs/requisitos.md)
- [Casos de Uso](docs/casos-de-uso.md)
- [Histórias de Usuário e critérios de aceite](docs/user-stories.md)
- [Arquitetura, modelo de dados e wireframe](docs/arquitetura.md)
- [Git Flow, Conventional Commits e SemVer](docs/workflow-git.md)
- [Backlog: 15 Issues prontas para cadastro no GitHub](docs/github-issues.md)

## Fluxo de branches

```text
main (produção / releases estáveis)
  ▲ Pull Request de release/<major>.<minor>.<patch>
  │
develop (integração)
  ▲ Pull Request de feature/issue-<n>-<slug>, fix/issue-<n>-<slug> ou docs/issue-<n>-<slug>
```

**Regras:** não fazer commit direto em `main`; criar branch temática a partir de `develop`; manter commits pequenos no padrão Conventional Commits; associar cada Pull Request a uma Issue real usando `Closes #<número>`; criar tags git anotadas em marcos estáveis com SemVer. Os números devem ser preenchidos apenas depois que o GitHub cadastrar as Issues. Consulte [`docs/workflow-git.md`](docs/workflow-git.md) para comandos e exemplos.

## Estado da submissão GitHub

Este diretório contém a documentação, o código e o backlog preparados; **não há URL de repositório GitHub nesta entrega**, então nenhum repositório remoto ou Issue foi criado e nenhum número GitHub é presumido. Para completar a etapa de submissão, escolha/crie o repositório, envie estes arquivos, abra as 15 Issues de [`docs/github-issues.md`](docs/github-issues.md) e atualize a tabela local com os números atribuídos.

## Resumo para submissão acadêmica

O Feito é um mini-gerenciador de tarefas individual, desenvolvido para organizar pendências sem exigir conta, instalação de bibliotecas ou backend. Permite criar, editar, excluir, concluir e pesquisar tarefas, além de filtrar por situação, acompanhar o progresso e persistir dados localmente no mesmo navegador.

A stack selecionada é HTML5, CSS3 e JavaScript ES6+ sem frameworks pesados; a lógica de domínio é testada com Node.js nativo. O repositório inclui Termo de Abertura, requisitos rastreáveis, casos de uso, histórias de usuário com aceite BDD, arquitetura, orientações de Git Flow/SemVer e um backlog de 15 Issues pronto para cadastrar no GitHub.
