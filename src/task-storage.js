export const STORAGE_KEY = 'mini-task-manager.tasks.v1';

function isStoredTask(value) {
  return value !== null
    && typeof value === 'object'
    && typeof value.id === 'string'
    && typeof value.title === 'string'
    && value.title.trim().length > 0
    && typeof value.description === 'string'
    && ['low', 'medium', 'high'].includes(value.priority)
    && typeof value.completed === 'boolean'
    && typeof value.createdAt === 'string'
    && typeof value.updatedAt === 'string';
}

/** Lê tarefas do armazenamento informado; dados ausentes ou inválidos resultam em lista vazia. */
export function loadTasks(storage = globalThis.localStorage) {
  if (!storage) return [];
  try {
    const serialized = storage.getItem(STORAGE_KEY);
    if (!serialized) return [];
    const parsed = JSON.parse(serialized);
    return Array.isArray(parsed) ? parsed.filter(isStoredTask) : [];
  } catch {
    return [];
  }
}

/** Persiste a coleção inteira. Erros do navegador são propagados para a interface informar o usuário. */
export function saveTasks(tasks, storage = globalThis.localStorage) {
  if (!storage) throw new Error('O armazenamento local não está disponível neste navegador.');
  storage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
