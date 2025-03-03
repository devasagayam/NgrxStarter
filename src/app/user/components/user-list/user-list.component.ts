import { Component, inject, OnInit } from '@angular/core';
import { UserFacade } from '../../../services/user.facade';
import { Observable } from 'rxjs';
import { User } from '../../../models/user.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  private userFacade = inject(UserFacade);
  private fb = inject(FormBuilder);

  users$: Observable<User[]> = this.userFacade.users$;
  loading$: Observable<boolean> = this.userFacade.loading$;
  error$: Observable<string> = this.userFacade.error$;
  editingUserId$: Observable<number | null> = this.userFacade.editingUserId$;
  addingUser$: Observable<boolean> = this.userFacade.addingUser$;

  userForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  ngOnInit(): void {
    this.userFacade.loadUsers();
  }

  editUser(user: User): void {
    this.userForm.patchValue(user);
    this.userFacade.setEditingUser(user.id);
  }

  saveUser(userId: number): void {
    if (this.userForm.valid) {
      const updatedUser: User = { id: userId, ...this.userForm.value };
      this.userFacade.updateUser(updatedUser);
      this.cancelEdit(); 
    }
  }

  cancelEdit(): void {
    this.userFacade.setEditingUser(null);
    this.userForm.reset(); 
  }

  showAddUserForm(): void {
    this.userFacade.setAddingUser(true);
  }

  cancelAddUser(): void {
    this.userFacade.setAddingUser(false);
    this.userForm.reset();
  }

  addUser(user: User): void {
    this.userFacade.addUser(user);
  }

  trackByUserId(index: number, user: User): number {
    return user.id;
  }
}
