export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pendente' | 'concluída';
  dueDate: string; // formato ISO: 'YYYY-MM-DD'
}
