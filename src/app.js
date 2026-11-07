import { createTask, filterTasks, getTaskStats, toggleTask, updateTask } from './task-manager.js';
import { loadTasks, saveTasks } from './task-storage.js';

const byId = (id) => document.getElementById(id);
const taskForm = byId('task-form');
const taskList = byId('task-list');
const emptyState = byId('empty-state');
const editDialog = byId('edit-dialog');
const editForm = byId('edit-form');
const formError = byId('form-error');
const editError = byId('edit-error');
const statusMessage = byId('status-message');

let tasks = loadTasks();
let activeFilter = 'all';
let searchQuery = '';

const priorityLabels = { low: 'Prioridade baixa', medium: 'Prioridade média', high: 'Prioridade alta' };

function announce(message) {
  statusMessage.textContent = message;
}

function persist() {
  try {
    saveTasks(tasks);
    return true;
  } catch (error) {
    announce(error.message || 'Não foi possível salvar as alterações neste navegador.');
    return false;
  }
}

function localDateLabel(dateString) {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-').map(Number);
  const localDate = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short' }).format(localDate);
}

function localTodayIso() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function makeMetaChip(text, className = '') {
  const chip = document.createElement('span');
  chip.className = `meta-chip ${className}`.trim();
  chip.textContent = text;
  return chip;
}

function createTaskElement(task) {
  const item = document.createElement('li');
  item.className = `task-card${task.completed ? ' is-completed' : ''}`;
  item.dataset.taskId = task.id;

  const checkbox = document.createElement('input');
  checkbox.className = 'task-check';
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.dataset.action = 'toggle';
  checkbox.dataset.taskId = task.id;
  checkbox.setAttribute('aria-label', `${task.completed ? 'Reabrir' : 'Concluir'} tarefa: ${task.title}`);
  item.append(checkbox);

  const content = document.createElement('div');
  content.className = 'task-content';
  const title = document.createElement('h3');
  title.className = 'task-title';
  title.textContent = task.title;
  content.append(title);

  if (task.description) {
    const description = document.createElement('p');
    description.className = 'task-description';
    description.textContent = task.description;
    content.append(description);
  }

  const meta = document.createElement('div');
  meta.className = 'task-meta';
  const priorityChip = makeMetaChip(priorityLabels[task.priority], `priority-${task.priority}`);
  meta.append(priorityChip);
  if (task.dueDate) {
    const isOverdue = !task.completed && task.dueDate < localTodayIso();
    meta.append(makeMetaChip(`Prazo ${localDateLabel(task.dueDate)}`, isOverdue ? 'due-overdue' : ''));
  }
  if (task.completed && task.completedAt) meta.append(makeMetaChip('Concluída'));
  content.append(meta);
  item.append(content);

  const actions = document.createElement('div');
  actions.className = 'task-actions';
  const editButton = document.createElement('button');
  editButton.className = 'text-button';
  editButton.type = 'button';
  editButton.dataset.action = 'edit';
  editButton.dataset.taskId = task.id;
  editButton.textContent = 'Editar';
  editButton.setAttribute('aria-label', `Editar tarefa: ${task.title}`);
  const deleteButton = document.createElement('button');
  deleteButton.className = 'text-button delete-button';
  deleteButton.type = 'button';
  deleteButton.dataset.action = 'delete';
  deleteButton.dataset.taskId = task.id;
  deleteButton.textContent = 'Excluir';
  deleteButton.setAttribute('aria-label', `Excluir tarefa: ${task.title}`);
  actions.append(editButton, deleteButton);
  item.append(actions);
  return item;
}

function updateSummary() {
  const stats = getTaskStats(tasks);
  byId('pending-count').textContent = String(stats.pending);
  byId('completed-count').textContent = String(stats.completed);
  byId('total-count').textContent = String(stats.total);
  const percentage = stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100);
  byId('progress-fill').style.width = `${percentage}%`;
  byId('progress-bar').setAttribute('aria-valuenow', String(percentage));
  byId('progress-caption').textContent = stats.total === 0
    ? 'Seu progresso aparece aqui.'
    : `${percentage}% concluído${stats.total === 1 ? '' : 's'} — siga no seu ritmo.`;
}

function updateEmptyState(visibleTasks) {
  const noTasksAtAll = tasks.length === 0;
  const noMatches = !noTasksAtAll && visibleTasks.length === 0;
  emptyState.hidden = visibleTasks.length > 0;
  taskList.hidden = visibleTasks.length === 0;
  byId('empty-title').textContent = noTasksAtAll
    ? 'Tudo começa com uma tarefa.'
    : noMatches ? 'Nenhuma tarefa encontrada.' : 'Sua lista está vazia.';
  byId('empty-copy').textContent = noTasksAtAll
    ? 'Adicione a primeira tarefa acima e libere espaço na cabeça.'
    : noMatches ? 'Tente outro termo ou altere o filtro selecionado.' : 'Adicione uma tarefa para começar.';
}

function render() {
  const visibleTasks = filterTasks(tasks, { status: activeFilter, query: searchQuery });
  taskList.replaceChildren(...visibleTasks.map(createTaskElement));
  updateEmptyState(visibleTasks);
  byId('visible-count').textContent = `${visibleTasks.length} ${visibleTasks.length === 1 ? 'tarefa' : 'tarefas'}`;
  updateSummary();
}

function showError(element, message) {
  element.textContent = message;
  element.hidden = false;
}

function clearError(element) {
  element.textContent = '';
  element.hidden = true;
}

taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  clearError(formError);
  const data = new FormData(taskForm);
  try {
    const task = createTask({
      title: data.get('title'),
      description: data.get('description'),
      priority: data.get('priority'),
      dueDate: data.get('dueDate'),
    });
    tasks = [task, ...tasks];
    const persisted = persist();
    taskForm.reset();
    byId('task-priority').value = 'medium';
    byId('task-title').focus();
    render();
    announce(persisted
      ? 'Tarefa adicionada.'
      : 'Tarefa adicionada nesta sessão, mas não foi salva no navegador.');
  } catch (error) {
    showError(formError, error.message);
    byId('task-title').focus();
  }
});

taskList.addEventListener('change', (event) => {
  const checkbox = event.target.closest('[data-action="toggle"]');
  if (!checkbox) return;
  const task = tasks.find((item) => item.id === checkbox.dataset.taskId);
  if (!task) return;
  tasks = tasks.map((item) => item.id === task.id ? toggleTask(item) : item);
  const persisted = persist();
  render();
  const updatedTask = tasks.find((item) => item.id === task.id);
  const changeLabel = updatedTask.completed ? 'Tarefa concluída.' : 'Tarefa reaberta.';
  announce(persisted ? changeLabel : `${changeLabel} A alteração não foi salva no navegador.`);
});

taskList.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const task = tasks.find((item) => item.id === button.dataset.taskId);
  if (!task) return;

  if (button.dataset.action === 'edit') {
    byId('edit-task-id').value = task.id;
    byId('edit-title').value = task.title;
    byId('edit-description').value = task.description;
    byId('edit-priority').value = task.priority;
    byId('edit-due-date').value = task.dueDate;
    clearError(editError);
    editDialog.showModal();
    byId('edit-title').focus();
  }

  if (button.dataset.action === 'delete') {
    const confirmed = window.confirm(`Excluir a tarefa “${task.title}”? Esta ação não pode ser desfeita.`);
    if (!confirmed) return;
    tasks = tasks.filter((item) => item.id !== task.id);
    const persisted = persist();
    render();
    announce(persisted ? 'Tarefa excluída.' : 'Tarefa excluída nesta sessão, mas a alteração não foi salva no navegador.');
  }
});

editForm.addEventListener('submit', (event) => {
  event.preventDefault();
  clearError(editError);
  const data = new FormData(editForm);
  const id = data.get('id');
  try {
    tasks = tasks.map((task) => task.id === id
      ? updateTask(task, {
          title: data.get('title'),
          description: data.get('description'),
          priority: data.get('priority'),
          dueDate: data.get('dueDate'),
        })
      : task);
    const persisted = persist();
    editDialog.close();
    render();
    announce(persisted ? 'Tarefa atualizada.' : 'Tarefa atualizada nesta sessão, mas não foi salva no navegador.');
  } catch (error) {
    showError(editError, error.message);
  }
});

for (const button of document.querySelectorAll('[data-filter]')) {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    for (const filterButton of document.querySelectorAll('[data-filter]')) {
      const isActive = filterButton === button;
      filterButton.classList.toggle('is-active', isActive);
      filterButton.setAttribute('aria-pressed', String(isActive));
    }
    render();
  });
}

byId('task-search').addEventListener('input', (event) => {
  searchQuery = event.target.value;
  render();
});

byId('close-edit').addEventListener('click', () => editDialog.close());
byId('cancel-edit').addEventListener('click', () => editDialog.close());
editDialog.addEventListener('click', (event) => {
  if (event.target === editDialog) editDialog.close();
});

render();
