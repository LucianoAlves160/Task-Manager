# Fluxo de Engenharia com Git e GitHub

Este documento define o fluxo recomendado quando o projeto for publicado no repositório GitHub escolhido pelo estudante. As Issues remotas recebem numeração do GitHub; os códigos `I-01` a `I-15` em `docs/github-issues.md` são identificadores locais provisórios e **não** substituem os números reais.

## Branches

| Branch / padrão | Uso | Destino |
|---|---|---|
| `main` | Histórico de produção estável; protegida contra commits diretos. | Recebe releases estáveis via Pull Request. |
| `develop` | Integração das funcionalidades concluídas para a próxima versão. | Base das branches temáticas e origem de release. |
| `feature/issue-<n>-<slug>` | Nova funcionalidade associada a uma Issue. | Pull Request para `develop`. |
| `fix/issue-<n>-<slug>` | Correção de defeito associada a uma Issue. | Pull Request para `develop`. |
| `docs/issue-<n>-<slug>` | Alteração exclusivamente documental associada a uma Issue. | Pull Request para `develop`. |
| `release/<major>.<minor>.<patch>` | Preparação, revisão final e atualização de versão. | Pull Request para `main`; integrar a versão final de volta em `develop`. |

```text
main ───────────────●────────────────●────────── (releases estáveis: v0.1.0, v0.2.0…)
                     ▲                ▲
                     │ PR             │ PR
 develop ───●───●────┴───●────────────┴───────●── (integração)
              ▲           ▲                    ▲
              │ PR        │ PR                 │ PR
 feature/issue-5   docs/issue-2          release/0.1.0
```

## Ciclo para cada Issue

1. Criar/selecionar a Issue, revisar seus critérios de aceite e confirmar os requisitos relacionados.
2. Atualizar branches e iniciar branch temática a partir de `develop`:
   ```bash
   git switch develop
   git pull --ff-only origin develop
   git switch -c feature/issue-<n>-cadastro-tarefas
   ```
3. Fazer mudanças pequenas e coesas; executar `npm test` e revisar o diff.
4. Registrar commits atômicos no padrão Conventional Commits; usar `Closes #<número-real>` na descrição do PR.
5. Abrir Pull Request para `develop`, incluir Issue relacionada, resumo, critérios atendidos e evidência de testes.
6. Solicitar revisão, corrigir apontamentos e fazer merge. Não fazer commit direto em `main`.
7. Após o merge, conferir o fechamento automático da Issue e remover a branch temática.

> Substitua `<n>` pelo número que o GitHub atribuir. Não invente números antes de as Issues existirem.

## Conventional Commits

Formato: `tipo(escopo): verbo no infinitivo/descrição curta (#n)`.

Exemplos:

```text
feat(tasks): permitir cadastro de tarefas (#5)
fix(storage): tratar JSON local corrompido (#10)
docs(requirements): detalhar RNFs e rastreabilidade (#3)
test(tasks): cobrir filtros por estado (#12)
refactor(ui): separar renderização da lógica de domínio (#11)
```

Tipos esperados: `feat`, `fix`, `docs`, `test`, `refactor`, `chore`, `build`.

## Versionamento Semântico (SemVer)

Formato `MAJOR.MINOR.PATCH`:

- **MAJOR:** incompatibilidade de formato, contrato ou comportamento público.
- **MINOR:** funcionalidade compatível adicionada.
- **PATCH:** correção compatível de defeito.

Marcos sugeridos: `v0.1.0` — primeira versão acadêmica funcional; `v0.2.0` — melhorias compatíveis previstas; `v1.0.0` — escopo e estabilidade acordados. Criar tags anotadas somente após validar e integrar uma versão estável:

```bash
git switch main
git pull --ff-only origin main
git tag -a v0.1.0 -m "Versão inicial funcional"
git push origin v0.1.0
```

## Pull Requests e rastreabilidade

- Branch de trabalho deve estar vinculada a uma Issue existente.
- O corpo do PR deve conter `Closes #<número-real>` para fechar a Issue no merge.
- O PR deve mencionar os RFs/USs afetados, critérios de aceite atendidos e resultado de `npm test`.
- PRs para `main` são reservados às releases e exigem revisão/validação; nunca se trabalha diretamente em `main`.
- Issues preparadas localmente só passam a existir no GitHub após criação manual/automatizada no repositório de destino.
