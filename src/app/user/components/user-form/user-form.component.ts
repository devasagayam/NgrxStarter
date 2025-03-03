import { Component, inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user.model';
import { UserFacade } from '../../../services/user.facade';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'] 
})
export class UserFormComponent {
  userFacade = inject(UserFacade);
  fb = inject(FormBuilder);

  newUserForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });


  onSubmit(): void {
    if (this.newUserForm.invalid) {
      this.newUserForm.markAllAsTouched(); 
      return;
    }

    const newUser: Omit<User, 'id'> = { ...this.newUserForm.value };
    this.userFacade.addUser(newUser);
    this.newUserForm.reset(); 
  }

  onCancel(): void {
    this.userFacade.setAddingUser(false);
  }
}
