# Casos de Uso — Feito

## Atores

- **Usuário individual:** pessoa que utiliza a aplicação no navegador para gerir suas próprias tarefas.
- **Armazenamento local do navegador:** recurso externo de persistência (`localStorage`) acessado pelo sistema; não é ator humano e não sincroniza dados.

## UC01 — Cadastrar tarefa

**Ator principal:** Usuário individual.  
**Pré-condição:** aplicação carregada; formulário de nova tarefa disponível.  
**Pós-condição:** tarefa validada aparece na lista e fica persistida localmente (se o navegador permitir).

### Fluxo principal
1. O usuário informa o título.
2. Opcionalmente, informa descrição, prioridade e prazo.
3. Aciona **Adicionar tarefa**.
4. O sistema remove espaços excedentes do título e valida os limites.
5. O sistema cria a tarefa como pendente, atualiza a lista/resumo e salva no `localStorage`.
6. O sistema limpa o formulário, devolve o foco ao campo de título e anuncia o sucesso.

### Fluxos alternativos e exceções
- **A1 — Campos opcionais omitidos:** sistema usa prioridade média e deixa descrição/prazo vazios.
- **E1 — Título vazio ou inválido:** sistema não cria a tarefa, apresenta mensagem compreensível e mantém o formulário para correção.
- **E2 — Armazenamento indisponível/cheio:** a sessão continua com a alteração em memória e informa que a persistência falhou; ao recarregar, a alteração pode ser perdida.

## UC02 — Consultar, filtrar e pesquisar tarefas

**Ator principal:** Usuário individual.  
**Pré-condição:** aplicação carregada.

### Fluxo principal
1. O sistema recupera tarefas locais e apresenta a lista, o resumo e o percentual concluído.
2. O usuário escolhe **Todas**, **A fazer** ou **Concluídas**, e/ou digita um termo de busca.
3. O sistema combina o estado selecionado com busca em título e descrição, sem diferenciar capitalização.
4. O sistema atualiza lista e contagem visível.

### Fluxos alternativos e exceções
- **A1 — Nenhuma tarefa cadastrada:** o sistema apresenta uma orientação para criar a primeira tarefa.
- **A2 — Nenhum resultado para filtro/busca:** o sistema informa que não encontrou tarefas e sugere mudar o termo ou filtro.
- **E1 — Dados locais corrompidos:** o sistema ignora o conteúdo inválido, inicializa lista vazia e continua utilizável.

## UC03 — Concluir ou reabrir tarefa

**Ator principal:** Usuário individual.  
**Pré-condição:** existe uma tarefa visível.

### Fluxo principal
1. O usuário marca ou desmarca a caixa de seleção da tarefa.
2. O sistema alterna o estado, atualiza `updatedAt` e ajusta `completedAt`.
3. O sistema atualiza a lista, totais, percentual e armazenamento local.
4. O sistema anuncia se a tarefa foi concluída ou reaberta.

### Exceção
- **E1 — Tarefa não localizada (estado da interface desatualizado):** nenhuma alteração é aplicada; a renderização seguinte sincroniza a interface com o estado atual.

## UC04 — Editar tarefa

**Ator principal:** Usuário individual.  
**Pré-condição:** existe uma tarefa na lista.

### Fluxo principal
1. O usuário aciona **Editar**.
2. O sistema abre o diálogo com os valores atuais e posiciona o foco no título.
3. O usuário altera um ou mais campos e salva.
4. O sistema valida os campos, preserva identificador, data de criação e estado de conclusão, atualiza o instante de modificação e persiste.
5. O diálogo fecha e o sistema exibe feedback.

### Fluxos alternativos e exceções
- **A1 — Cancelamento:** o usuário cancela/fecha; nenhuma alteração é aplicada.
- **E1 — Título ou outro campo inválido:** o diálogo permanece aberto e exibe erro para correção.

## UC05 — Excluir tarefa

**Ator principal:** Usuário individual.  
**Pré-condição:** existe uma tarefa na lista.

### Fluxo principal
1. O usuário aciona **Excluir**.
2. O sistema solicita confirmação, identificando a tarefa e avisando que a ação não pode ser desfeita.
3. O usuário confirma.
4. O sistema remove a tarefa, persiste a lista restante e atualiza interface e resumo.

### Fluxo alternativo
- **A1 — Usuário cancela:** a tarefa permanece sem alterações.

## UC06 — Recuperar e persistir tarefas locais

**Atores:** Usuário individual e armazenamento local do navegador.  
**Gatilhos:** carregamento da aplicação e qualquer alteração de tarefa.

### Fluxo principal
1. Ao iniciar, o sistema lê a chave `mini-task-manager.tasks.v1`.
2. Se o conteúdo for JSON válido e uma lista de tarefas, o sistema valida os registros e monta a interface.
3. Após uma alteração, o sistema serializa a coleção e grava no armazenamento local.

### Fluxos alternativos e exceções
- **A1 — Chave ausente:** o sistema inicializa coleção vazia.
- **E1 — JSON inválido ou estrutura inesperada:** o sistema inicia com coleção vazia e continua; não tenta executar conteúdo salvo.
- **E2 — Acesso negado ou quota excedida:** o sistema mantém o estado em memória e comunica falha ao persistir.

## Relacionamento com requisitos

UC01 → RF01, RF10; UC02 → RF02, RF06, RF07, RF09, RF10; UC03 → RF03; UC04 → RF04, RF10; UC05 → RF05; UC06 → RF08, RNF02 e RNF09.
