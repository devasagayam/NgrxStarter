import { Component, inject, OnInit } from '@angular/core';
import { UserFacade } from '../../../services/user.facade';
import { Observable } from 'rxjs';
import { User } from '../../../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  private userFacadeService = inject(UserFacade);
  private fb = inject(FormBuilder);

  users$: Observable<User[]> = this.userFacadeService.users$;
  loading$: Observable<boolean> = this.userFacadeService.loading$;
  error$: Observable<string> = this.userFacadeService.error$;
  editingUserId$: Observable<number | null> = this.userFacadeService.editingUserId$;
  addingUser$: Observable<boolean> = this.userFacadeService.addingUser$;

  userForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  ngOnInit(): void {
    this.userFacadeService.loadUsers();
  }

  editUser(user: User): void {
    this.userForm.patchValue(user);
    this.userFacadeService.setEditingUser(user.id);
  }

  saveUser(userId: number): void {
    if (this.userForm.valid) {
      const updatedUser: User = { id: userId, ...this.userForm.value };
      this.userFacadeService.updateUser(updatedUser);
      this.cancelEdit(); 
    }
  }

  cancelEdit(): void {
    this.userFacadeService.setEditingUser(null);
    this.userForm.reset(); 
  }

  showAddUserForm(): void {
    this.userFacadeService.setAddingUser(true);
  }

  cancelAddUser(): void {
    this.userFacadeService.setAddingUser(false);
    this.userForm.reset();
  }

  addUser(user: User): void {
    this.userFacadeService.addUser(user);
  }

  trackByUserId(index: number, user: User): number {
    return user.id;
  }
}
