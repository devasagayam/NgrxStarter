import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user.model';
import { UserFacade } from '../../../services/user.facade';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  cancel = output();
  userFacade = inject(UserFacade)
  fb = inject(FormBuilder);

  newUserForm: FormGroup =this.fb.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  onSubmit(): void {
    if (this.newUserForm.valid) {
      const newUser: User = {
        id: Date.now(),
        ...this.newUserForm.value,
      };
      this.userFacade.addUser(newUser);
    }
  }
}
