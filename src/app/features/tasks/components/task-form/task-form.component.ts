import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../task.model';
import { TasksService } from '../../services/tasks.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { dataNaoAnteriorHojeValidator } from '../../validators/date.validator';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private tasksService: TasksService,
    private dialogRef: MatDialogRef<TaskFormComponent>,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data?: Task
  ) {}

  ngOnInit() {
    this.isEditMode = !!this.data;

    this.taskForm = this.fb.group({
      title: [this.data?.title || '', [Validators.required, Validators.minLength(3)]],
      description: [this.data?.description || '', [Validators.required, Validators.minLength(5)]],
      status: [this.data?.status || 'pendente', Validators.required],
      dueDate: ['', [Validators.required, dataNaoAnteriorHojeValidator]],
    });

    if (this.isEditMode) {
      setTimeout(() => {
        this.taskForm.patchValue({
          title: this.data!.title,
          description: this.data!.description,
          status: this.data!.status,
          dueDate: this.data!.dueDate ? new Date(this.data!.dueDate) : '',
        });
        this.cdr.detectChanges();
      });
    }
  }

  get f() {
    return this.taskForm.controls;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const taskData = this.taskForm.value as Task;

    if (this.isEditMode && this.data) {
      const updatedTask: Task = { ...this.data, ...taskData };
      this.tasksService.updateTask(updatedTask).subscribe({
        next: (task) => this.dialogRef.close(task),
        error: (err) => console.error(err),
      });
    } else {
      this.tasksService.createTask(taskData).subscribe({
        next: (task) => this.dialogRef.close(task),
        error: (err) => console.error(err),
      });
    }
  }
}
