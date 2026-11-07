# Termo de Abertura do Projeto — Feito

**Projeto:** Mini-gerenciador de tarefas (Feito)  
**Versão documental:** 0.1.0  
**Tipo:** Projeto acadêmico individual de Engenharia de Software  
**Patrocinador:** atividade acadêmica  
**Responsável:** estudante desenvolvedor

## Justificativa e visão do produto

A dificuldade de manter pequenas tarefas na memória aumenta a carga mental e favorece esquecimentos. O **Feito** é uma aplicação web pequena, direta e executada no navegador que permite registrar tarefas, definir prioridade e prazo, acompanhar o progresso e localizar itens rapidamente. A proposta privilegia um fluxo curto e a privacidade: não há conta, servidor ou envio das tarefas para terceiros.

**Visão:** oferecer um espaço pessoal, leve e confiável para transformar pendências em próximos passos visíveis, sem exigir instalação de dependências de aplicação ou cadastro.

## Objetivos SMART

1. **Específico:** entregar uma aplicação de página única para cadastrar, consultar, editar, excluir e concluir tarefas, além de pesquisar e filtrar a lista.
2. **Mensurável:** cobrir os fluxos centrais por nove testes automatizados nativos do Node.js; manter rastreabilidade entre RF, histórias, documentação e 15 itens de backlog preparados para o GitHub.
3. **Atingível:** implementar a interface com HTML5, CSS3 e JavaScript ES6+, sem frameworks ou dependências de runtime.
4. **Relevante:** demonstrar especificação, casos de uso, histórias com aceite, arquitetura simples, testes, Git Flow, Conventional Commits e versionamento SemVer em uma entrega acadêmica individual.
5. **Temporal:** concluir a versão inicial e seus artefatos dentro do período de uma semana letiva previsto na atividade, com o repositório preparado para submissão antecipada.

## Escopo preliminar

### Dentro do escopo desta versão

- Aplicação estática responsiva, em português brasileiro, sem conta e sem backend.
- Cadastro com título obrigatório, descrição opcional, prioridade baixa/média/alta e prazo opcional.
- Listagem, edição, exclusão com confirmação, conclusão e reabertura de tarefas.
- Busca por título/descrição, filtros por situação e resumo de totais/progresso.
- Persistência no `localStorage` do navegador e tratamento de dados ausentes/corrompidos.
- Acessibilidade básica: HTML semântico, rótulos, estados acessíveis, feedback anunciado e suporte a teclado.
- Documentação, testes automatizados do domínio e backlog inicial pronto para cadastro no GitHub.

### Expressamente fora do escopo desta semana

- Autenticação, múltiplos usuários, compartilhamento, colaboração e sincronização entre dispositivos.
- API, banco de dados remoto, notificações por e-mail/push, calendário externo ou integração com terceiros.
- Aplicativos nativos, modo offline instalável/PWA, anexos, subtarefas, recorrências e relatórios avançados.
- Garantia de backup: limpar dados do navegador ou trocar de dispositivo pode apagar/indisponibilizar tarefas.
- Publicação do repositório ou abertura de Issues em uma conta GitHub específica sem URL e autorização de destino.

## Stakeholders e público-alvo

| Stakeholder | Interesse / responsabilidade |
|---|---|
| Estudante desenvolvedor | Planejar, implementar, testar e manter a rastreabilidade da solução. |
| Docente / avaliador | Avaliar requisitos, documentação, organização de backlog e fluxo profissional de engenharia. |
| Usuário individual | Registrar e acompanhar suas tarefas no navegador que utiliza. |
| GitHub (plataforma) | Hospedar o repositório, Issues, Pull Requests, branches e tags após configuração pelo responsável. |

**Público-alvo primário:** pessoa que deseja organizar um conjunto pequeno de tarefas pessoais em um navegador moderno.

## Premissas e restrições

- O navegador oferece suporte a módulos ES6, `localStorage`, `<dialog>` e HTML5.
- O armazenamento é local à origem e ao perfil do navegador; não é sincronizado nem criptografado pela aplicação.
- A aplicação deve funcionar servida por HTTP local (por exemplo, Python `http.server`); abrir `index.html` diretamente pode bloquear módulos ES.
- Os testes automatizados usam apenas o módulo `node:test`, incluído no Node.js 18 ou superior.
- O projeto não inclui dependências de execução e não coleta telemetria.

## Critérios de sucesso e riscos

**Sucesso:** fluxos previstos em RF01–RF10 funcionam no navegador; `npm test` passa; requisitos e histórias são rastreáveis; documentação explica execução e limites; os 15 tickets estão prontos para cadastro e relacionamento com PRs.

**Riscos principais:** perda do `localStorage` pelo usuário; incompatibilidade com navegadores antigos; crescimento de escopo; divergência entre a lista local de Issues e os tickets efetivamente cadastrados. Mitigações: deixar limites explícitos, manter escopo mínimo, validar em navegador atual e sincronizar os identificadores após criar as Issues.
