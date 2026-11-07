import test from 'node:test';
import assert from 'node:assert/strict';
import { createTask, filterTasks, getTaskStats, toggleTask, updateTask } from '../src/task-manager.js';
import { loadTasks, saveTasks, STORAGE_KEY } from '../src/task-storage.js';

const fixedNow = '2026-11-06T12:00:00.000Z';

function sampleTasks() {
  return [
    createTask({ title: 'Revisar relatório', description: 'Enviar para a equipe', priority: 'high' }, { id: 'a', now: fixedNow }),
    createTask({ title: 'Comprar café', description: 'Mercado', priority: 'low' }, { id: 'b', now: fixedNow }),
    toggleTask(createTask({ title: 'Ler documentação', priority: 'medium' }, { id: 'c', now: fixedNow }), fixedNow),
  ];
}

test('cria tarefa normalizando espaços e preenchendo valores padrão', () => {
  const task = createTask({ title: '  Planejar semana  ' }, { id: 'task-1', now: fixedNow });
  assert.equal(task.title, 'Planejar semana');
  assert.equal(task.description, '');
  assert.equal(task.priority, 'medium');
  assert.equal(task.completed, false);
  assert.equal(task.createdAt, fixedNow);
  assert.equal(task.id, 'task-1');
});

test('recusa título vazio e limites de tamanho inválidos', () => {
  assert.throws(() => createTask({ title: '   ' }), /título.*obrigatório/i);
  assert.throws(() => createTask({ title: 'x'.repeat(121) }), /120 caracteres/i);
  assert.throws(() => createTask({ title: 'Tarefa', description: 'x'.repeat(501) }), /500 caracteres/i);
});

test('recusa prioridade ou formato de prazo inválidos', () => {
  assert.throws(() => createTask({ title: 'Tarefa', priority: 'urgente' }), /prioridade.*inválida/i);
  assert.throws(() => createTask({ title: 'Tarefa', dueDate: '06/11/2026' }), /AAAA-MM-DD/i);
});

test('edita campos sem alterar identidade, criação ou estado de conclusão', () => {
  const original = toggleTask(createTask({ title: 'Rascunho' }, { id: 'editável', now: fixedNow }), fixedNow);
  const edited = updateTask(original, { title: 'Versão final', priority: 'high' }, { now: '2026-11-07T12:00:00.000Z' });
  assert.equal(edited.title, 'Versão final');
  assert.equal(edited.priority, 'high');
  assert.equal(edited.id, original.id);
  assert.equal(edited.createdAt, original.createdAt);
  assert.equal(edited.completed, true);
  assert.equal(edited.updatedAt, '2026-11-07T12:00:00.000Z');
});

test('alterna conclusão e mantém timestamp coerente', () => {
  const pending = createTask({ title: 'Concluir' }, { id: 'toggle', now: fixedNow });
  const completed = toggleTask(pending, '2026-11-07T09:00:00.000Z');
  const reopened = toggleTask(completed, '2026-11-08T09:00:00.000Z');
  assert.equal(completed.completed, true);
  assert.equal(completed.completedAt, '2026-11-07T09:00:00.000Z');
  assert.equal(reopened.completed, false);
  assert.equal(reopened.completedAt, null);
});

test('filtra por estado e texto sem diferenciar maiúsculas/minúsculas', () => {
  const tasks = sampleTasks();
  assert.deepEqual(filterTasks(tasks, { status: 'pending' }).map((task) => task.id), ['a', 'b']);
  assert.deepEqual(filterTasks(tasks, { status: 'completed' }).map((task) => task.id), ['c']);
  assert.deepEqual(filterTasks(tasks, { query: 'EQUIPE' }).map((task) => task.id), ['a']);
  assert.deepEqual(filterTasks(tasks, { status: 'pending', query: 'café' }).map((task) => task.id), ['b']);
  assert.equal(filterTasks(tasks, { status: 'desconhecido' }).length, 3);
});

test('calcula totais de tarefas abertas, concluídas e gerais', () => {
  assert.deepEqual(getTaskStats(sampleTasks()), { total: 3, completed: 1, pending: 2 });
  assert.deepEqual(getTaskStats([]), { total: 0, completed: 0, pending: 0 });
});

test('salva e recupera tarefas do armazenamento informado', () => {
  const values = new Map();
  const fakeStorage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
  const tasks = sampleTasks();
  saveTasks(tasks, fakeStorage);
  assert.equal(values.has(STORAGE_KEY), true);
  assert.deepEqual(loadTasks(fakeStorage), tasks);
});

test('retorna lista vazia se os dados salvos estiverem ausentes ou corrompidos', () => {
  const fakeStorage = { getItem: () => '{json inválido' };
  assert.deepEqual(loadTasks(fakeStorage), []);
  assert.deepEqual(loadTasks({ getItem: () => null }), []);
  assert.deepEqual(loadTasks({ getItem: () => JSON.stringify({ title: 'não é lista' }) }), []);
});
