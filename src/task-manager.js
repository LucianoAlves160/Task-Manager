const VALID_PRIORITIES = new Set(['low', 'medium', 'high']);
const VALID_STATUSES = new Set(['all', 'pending', 'completed']);

function createId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `task-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function asText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function validateTaskInput(input) {
  const title = asText(input.title);
  if (!title) throw new Error('O título da tarefa é obrigatório.');
  if (title.length > 120) throw new Error('O título deve ter no máximo 120 caracteres.');

  const description = asText(input.description);
  if (description.length > 500) throw new Error('A descrição deve ter no máximo 500 caracteres.');

  const priority = input.priority ?? 'medium';
  if (!VALID_PRIORITIES.has(priority)) throw new Error('A prioridade selecionada é inválida.');

  const dueDate = asText(input.dueDate);
  if (dueDate && !/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) {
    throw new Error('O prazo deve estar no formato AAAA-MM-DD.');
  }

  return { title, description, priority, dueDate };
}

/** Cria uma tarefa validada. `now` e `id` podem ser injetados para testes determinísticos. */
export function createTask(input, { id = createId(), now = new Date().toISOString() } = {}) {
  const values = validateTaskInput(input ?? {});
  return {
    id,
    ...values,
    completed: false,
    createdAt: now,
    updatedAt: now,
    completedAt: null,
  };
}

/** Atualiza somente os campos editáveis e preserva identidade, criação e estado de conclusão. */
export function updateTask(task, updates, { now = new Date().toISOString() } = {}) {
  const values = validateTaskInput({ ...task, ...updates });
  return {
    ...task,
    ...values,
    updatedAt: now,
  };
}

/** Alterna o estado de conclusão e registra ou remove a data de conclusão. */
export function toggleTask(task, now = new Date().toISOString()) {
  const completed = !task.completed;
  return {
    ...task,
    completed,
    completedAt: completed ? now : null,
    updatedAt: now,
  };
}

/** Filtra por estado e por texto em título ou descrição, sem alterar a coleção original. */
export function filterTasks(tasks, { status = 'all', query = '' } = {}) {
  const selectedStatus = VALID_STATUSES.has(status) ? status : 'all';
  const normalizedQuery = asText(query).toLocaleLowerCase('pt-BR');

  return tasks.filter((task) => {
    const matchesStatus = selectedStatus === 'all'
      || (selectedStatus === 'pending' && !task.completed)
      || (selectedStatus === 'completed' && task.completed);
    const searchableText = `${task.title} ${task.description}`.toLocaleLowerCase('pt-BR');
    return matchesStatus && (!normalizedQuery || searchableText.includes(normalizedQuery));
  });
}

/** Retorna os totais usados no resumo lateral e na barra de progresso. */
export function getTaskStats(tasks) {
  const completed = tasks.filter((task) => task.completed).length;
  const total = tasks.length;
  return { total, completed, pending: total - completed };
}
