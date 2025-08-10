import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../task.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'description', 'status', 'dueDate', 'actions'];
  tasks: Task[] = [];

  viewMode: 'table' | 'cards' = 'table';

  constructor(
    private tasksService: TasksService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  updateTaskStatus(task: Task) {
  this.tasksService.updateTask(task).subscribe(() => {
    this.loadTasks(); 
  });
}

  loadTasks() {
    this.tasksService.getTasks().subscribe(data => {
      this.tasks = data;
    });
  }

  toggleStatus(task: Task) {
    this.tasksService.updateTask(task).subscribe(() => {
      this.snackBar.open(`Status da tarefa "${task.title}" atualizado para "${task.status}"`, 'Fechar', { duration: 2000 });
      this.loadTasks();  // Recarrega a lista para refletir as mudanças
    }, error => {
      this.snackBar.open('Erro ao atualizar status da tarefa', 'Fechar', { duration: 2000 });
      console.error(error);
    });
  }



  deleteTask(id: string | number) {
    const idStr = id.toString();
    this.tasksService.deleteTask(idStr).subscribe(() => {
      this.snackBar.open('Tarefa excluída', 'Fechar', { duration: 2000 });
      this.loadTasks();
    });
  }

  openCreateTaskModal() {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '400px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result: Task | undefined) => {
      if (result) {
        this.snackBar.open('Tarefa criada com sucesso!', 'Fechar', { duration: 2000 });
        this.loadTasks(); 
      }
    });
  }

  editTask(task: Task) {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '400px',
      disableClose: true,
      data: task, 
    });
    dialogRef.afterClosed().subscribe((result: Task | undefined) => {
      if (result) {
        this.snackBar.open('Tarefa atualizada com sucesso!', 'Fechar', { duration: 2000 });
        this.loadTasks();
      }
    });
  }

}
