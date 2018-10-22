import { AuthLoginFormComponent } from './auth-login-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@dilta/client-shared';
import { sandboxOf } from 'angular-playground';


export default sandboxOf(AuthLoginFormComponent, {
  imports: [ ReactiveFormsModule, MaterialModule,  ]
 })
  .add('login authentication basic form component', {
    template: `<auth-login-form></auth-login-form>`
  });
