import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../task.model';

@Component({
  selector: 'app-tasks-cards-view',
  templateUrl: './tasks-cards-view.component.html',
  styleUrls: ['./tasks-cards-view.component.css']
})
export class TasksCardsViewComponent {
  @Input() tasks: Task[] = [];
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<string | number>();
  @Output() statusChange = new EventEmitter<Task>();

  toggleStatus(task: Task) {
    const updatedTask: Task = {
      ...task,
      status: task.status === 'pendente' ? 'concluída' : 'pendente'
    };
    this.statusChange.emit(updatedTask);
  }

}
