import {RenderInstruction, ValidateResult} from "aurelia-validation";
export class ApplicantValidationRenderer{
  render(instruction: RenderInstruction) {
    for (let { result, elements } of instruction.unrender) {
      for (let element of elements) {
        this.remove(element, result);
      }
    }

    for (let { result, elements } of instruction.render) {
      for (let element of elements) {
        this.add(element, result);
      }
    }
  }

  add(element: Element, result: ValidateResult) {
    const formGroup = element.closest('.form-group');
    if (!formGroup) {
      return;
    }

    if (result.valid) {
      if (!formGroup.classList.contains('has-error')) {
        formGroup.classList.add('has-success');
      }
    } else {
      // add the has-error class to the enclosing form-group div
      formGroup.classList.remove('has-success');
      formGroup.classList.add('has-error');
      formGroup.querySelector('input').style.borderColor = 'red';
      // add help-block
      const message = document.createElement('span');
      const small = document.createElement('small');
      message.appendChild(small);
      small.className = 'text-danger text-sm-left';
      small.textContent = result.message;
      message.id = `validation-message-${result.id}`;
      formGroup.appendChild(message);
    }
  }

  remove(element: Element, result: ValidateResult) {
    const formGroup = element.closest('.form-group');
    if (!formGroup) {
      return;
    }

    if (result.valid) {
      if (formGroup.classList.contains('has-success')) {
        formGroup.classList.remove('has-success');
      }
    } else {
      // remove help-block
      const message = formGroup.querySelector(`#validation-message-${result.id}`);
      if (message) {
        formGroup.removeChild(message);
        formGroup.querySelector('input').style.borderColor = '';

        // remove the has-error class from the enclosing form-group div
        if (formGroup.querySelectorAll('.help-block.validation-message').length === 0) {
          formGroup.classList.remove('has-error');
        }
      }
    }
  }
}
