# Arquitetura e Modelo de Dados — Feito

## Visão arquitetural

Aplicação web estática de página única, executada no navegador. Não há servidor de aplicação, API, autenticação ou banco remoto. O código separa regras de domínio, persistência e interface para facilitar manutenção e testes.

```text
┌────────────────────────────── Navegador ──────────────────────────────┐
│  index.html + src/style.css                                           │
│          │                                                            │
│          ▼                                                            │
│  src/app.js ──────────► src/task-manager.js                           │
│      │                  regras puras: validar, criar, editar, filtrar │
│      │                                                                │
│      └────────────────► src/task-storage.js ──► localStorage         │
│                                                                  │    │
│  tests/task-manager.test.js ──► Node.js node:test (somente desenvolvimento) │
└───────────────────────────────────────────────────────────────────────┘
```

## Componentes e responsabilidades

| Componente | Responsabilidade |
|---|---|
| `index.html` | Estrutura semântica, formulários, lista, resumo, mensagens e diálogo de edição. |
| `src/style.css` | Identidade visual, estados, foco visível, responsividade e movimento reduzido. |
| `src/app.js` | Eventos DOM, renderização segura por `textContent`, feedback acessível e coordenação dos módulos. |
| `src/task-manager.js` | Regras puras: validação e criação, edição, conclusão, busca, filtros e estatísticas. |
| `src/task-storage.js` | Leitura tolerante e gravação da chave versionada no `localStorage`. |
| `tests/task-manager.test.js` | Testes de domínio e persistência com dependências nativas do Node.js. |

## Modelo de dados (entidade Tarefa)

| Campo | Tipo | Obrigatório | Regra |
|---|---|---:|---|
| `id` | string | Sim | Identificador único; imutável após criação. |
| `title` | string | Sim | 1–120 caracteres após `trim`. |
| `description` | string | Não | Até 500 caracteres; valor padrão vazio. |
| `priority` | enum | Sim | `low`, `medium` ou `high`; padrão `medium`. |
| `dueDate` | string | Não | Data ISO `AAAA-MM-DD` ou string vazia. |
| `completed` | boolean | Sim | Estado inicial `false`. |
| `createdAt` | string ISO | Sim | Instante de criação; imutável. |
| `updatedAt` | string ISO | Sim | Atualizado a cada mudança de estado ou edição. |
| `completedAt` | string ISO / null | Sim | Preenchido ao concluir; limpo ao reabrir. |

**Armazenamento:** chave `mini-task-manager.tasks.v1`; o valor é um array JSON de tarefas. Alterações futuras incompatíveis devem introduzir uma chave/versionamento e uma estratégia de migração explícita.

## Fluxos de dados

1. **Inicialização:** `app.js` chama `loadTasks()`; `task-storage.js` lê, decodifica e filtra registros inválidos; a interface é renderizada.
2. **Comando:** evento do usuário solicita ao módulo de domínio criar/atualizar/alternar ou filtrar tarefas.
3. **Persistência:** após uma alteração, o estado inteiro é serializado por `saveTasks()`; falha de armazenamento é comunicada sem derrubar a interface.
4. **Renderização:** campos dinâmicos são inseridos com `textContent` e elementos DOM, reduzindo risco de injeção de HTML.

## Wireframe textual

```text
┌──────────────────────────────────────────────────────────────┐
│ Feito.                                      Um passo de cada vez│
├───────────────────────────────────────────┬──────────────────┤
│ Título e breve descrição                    │ Seu ritmo        │
│ ┌ Nova tarefa ───────────────────────────┐ │ Em aberto / total│
│ │ título, detalhes, prioridade, prazo     │ │ barra de avanço  │
│ │ [Adicionar tarefa]                     │ │ privacidade      │
│ └────────────────────────────────────────┘ └──────────────────┘
│ Suas tarefas                  [Todas][A fazer][Concluídas]     │
│ [Buscar tarefa…]                                               │
│ □ Título / descrição / prioridade / prazo       Editar Excluir │
└──────────────────────────────────────────────────────────────┘
```

## Decisões e limites

- **Sem framework/build step:** simplifica execução e demonstra JavaScript ES6+ diretamente.
- **Persistência local:** adequada ao escopo individual e sem backend, mas não equivale a backup nem oferece sincronização.
- **Sem conteúdo HTML dinâmico:** valores fornecidos pelo usuário são colocados como texto.
- **Compatibilidade:** navegadores muito antigos sem `<dialog>` ou módulos ES não são alvo desta versão.
