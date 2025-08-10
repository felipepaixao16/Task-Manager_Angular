import { Component, Input, Output, EventEmitter, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Task } from '../../task.model';
import { TasksService } from 'src/app/features/tasks/services/tasks.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {
  @Input() tasks: Task[] = [];
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<string>();
  @Output() statusChange = new EventEmitter<Task>();

  constructor(
      private tasksService: TasksService,
      private snackBar: MatSnackBar,
    ) {}

  displayedColumns: string[] = ['title', 'description', 'status', 'dueDate', 'actions'];
  dataSource = new MatTableDataSource<Task>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.dataSource.data = this.tasks;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(): void {
    this.dataSource.data = this.tasks;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEdit(task: Task) {
    this.edit.emit(task);
  }

  onDelete(id: string) {
    this.delete.emit(id);
  }

  toggleStatus(task: Task) {
  const updatedTask: Task = { ...task, status: task.status === 'pendente' ? 'concluída' : 'pendente' };
  this.statusChange.emit(updatedTask); 
  }

}
