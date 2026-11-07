# Histórias de Usuário — Feito

## US01 — Registrar uma tarefa

**Como** pessoa que organiza suas próprias pendências, **quero** cadastrar uma tarefa com título, detalhes opcionais, prioridade e prazo **para que** eu transforme uma intenção em um próximo passo claro.

### Critérios de aceite

```gherkin
Cenário: cadastrar tarefa válida com campos opcionais
  Dado que estou na tela principal
  Quando informo um título válido, escolho prioridade alta, informo uma descrição e um prazo
  E aciono "Adicionar tarefa"
  Então a tarefa aparece como pendente na lista
  E o formulário é limpo
  E a alteração é persistida localmente

Cenário: usar valores padrão para campos opcionais
  Dado que estou na tela principal
  Quando informo somente um título válido e adiciono a tarefa
  Então a tarefa recebe prioridade média
  E descrição e prazo ficam vazios

Cenário: impedir título vazio
  Dado que estou preenchendo uma nova tarefa
  Quando envio um título em branco ou composto apenas por espaços
  Então o sistema não cria a tarefa
  E apresenta uma mensagem de validação
```

**Rastreabilidade:** RF01, RF10; UC01; Issue I-05.

## US02 — Acompanhar e concluir tarefas

**Como** usuário do gerenciador, **quero** consultar minha lista e marcar itens como concluídos ou reabri-los **para que** eu acompanhe o que falta e o que já avancei.

### Critérios de aceite

```gherkin
Cenário: concluir tarefa
  Dado que existe uma tarefa pendente
  Quando marco a caixa de seleção correspondente
  Então a tarefa passa ao estado concluído
  E o total concluído e o percentual são atualizados
  E a conclusão é persistida localmente

Cenário: reabrir tarefa concluída
  Dado que existe uma tarefa concluída
  Quando desmarco sua caixa de seleção
  Então a tarefa volta ao estado pendente
  E sua data de conclusão é removida

Cenário: lista sem tarefas
  Dado que não existem tarefas cadastradas
  Quando abro a aplicação
  Então vejo uma mensagem convidando a adicionar a primeira tarefa
```

**Rastreabilidade:** RF02, RF03, RF09, RF10; UC02, UC03; Issues I-05, I-06 e I-10.

## US03 — Editar tarefa

**Como** usuário do gerenciador, **quero** corrigir ou atualizar os campos de uma tarefa **para que** minha lista continue refletindo o plano atual.

### Critérios de aceite

```gherkin
Cenário: salvar alterações válidas
  Dado que existe uma tarefa cadastrada
  Quando abro "Editar", altero título ou outros campos e salvo
  Então a lista apresenta os valores atualizados
  E o identificador e a data de criação permanecem iguais
  E a alteração é persistida localmente

Cenário: cancelar edição
  Dado que abri o diálogo de edição
  Quando cancelo ou fecho o diálogo sem salvar
  Então os dados originais permanecem inalterados

Cenário: tentar salvar título inválido
  Dado que estou editando uma tarefa
  Quando apago o título e salvo
  Então o diálogo permanece aberto e informa o erro
```

**Rastreabilidade:** RF04, RF10; UC04; Issue I-07.

## US04 — Excluir tarefa com segurança

**Como** usuário do gerenciador, **quero** excluir uma tarefa que não é mais necessária **para que** minha lista permaneça relevante.

### Critérios de aceite

```gherkin
Cenário: confirmar exclusão
  Dado que existe uma tarefa cadastrada
  Quando aciono "Excluir" e confirmo a ação
  Então a tarefa deixa de aparecer na lista
  E a lista atualizada é persistida localmente

Cenário: cancelar exclusão
  Dado que existe uma tarefa cadastrada
  Quando aciono "Excluir" e cancelo a confirmação
  Então a tarefa permanece na lista
```

**Rastreabilidade:** RF05; UC05; Issue I-08.

## US05 — Localizar tarefas

**Como** usuário com várias tarefas, **quero** filtrar por situação e pesquisar por palavras **para que** eu encontre rapidamente o que preciso.

### Critérios de aceite

```gherkin
Cenário: filtrar tarefas pendentes ou concluídas
  Dado que existem tarefas abertas e concluídas
  Quando seleciono "A fazer" ou "Concluídas"
  Então vejo somente tarefas que correspondem ao filtro

Cenário: buscar sem diferenciar maiúsculas
  Dado que existe uma tarefa cujo título ou descrição contém "Relatório"
  Quando pesquiso "relatório"
  Então a tarefa aparece nos resultados

Cenário: busca e filtro sem resultados
  Dado que nenhum item corresponde à busca e ao filtro atuais
  Quando a lista é atualizada
  Então vejo uma mensagem informando que nada foi encontrado
```

**Rastreabilidade:** RF06, RF07, RF10; UC02; Issue I-09.

## US06 — Preservar e entender meu progresso

**Como** usuário do gerenciador, **quero** reabrir a aplicação e ver meus totais **para que** eu mantenha continuidade no mesmo navegador.

### Critérios de aceite

```gherkin
Cenário: recuperar tarefas válidas
  Dado que há tarefas válidas salvas neste navegador
  Quando reabro a aplicação na mesma origem e perfil
  Então as tarefas e seus estados são recuperados

Cenário: tratar dados corrompidos
  Dado que o conteúdo salvo não é JSON válido ou não é uma lista
  Quando abro a aplicação
  Então a aplicação inicia com lista vazia e continua utilizável

Cenário: mostrar totais e percentual
  Dado que há tarefas pendentes e concluídas
  Quando consulto o resumo
  Então vejo os totais em aberto, concluídos e gerais
  E vejo o percentual correspondente de conclusão
```

**Rastreabilidade:** RF08, RF09, RNF02, RNF09; UC02, UC06; Issue I-10.
