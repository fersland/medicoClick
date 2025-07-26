import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyLetters]'
})
export class OnlyLettersDirective {

  @HostListener('keypress', ['$event']) onKeyPress(event: KeyboardEvent) {
    const inputChar = String.fromCharCode(event.charCode);
    const regex =  /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/;

    if(!regex.test(inputChar)) {
      event.preventDefault();
    }
  }

}
