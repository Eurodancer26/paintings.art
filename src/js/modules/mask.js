const mask = (selector) => {
    let setCursorPosition =(position, element) => {
        element.focus();

        if (element.setSelectionRange) {
            element.setSelectionRange(position, position, 'forward');
        } else if (element.createTextRange) {
            let range = element.value.createTextRange();

            range.collapse(false);
            range.selectionStart('character', position);
            range.selectionEnd('character', position);
            range.selectionDirection('forward');
            range.select();
        }
    };

    function createMask(event) {

        let matrix = '+7 (___) ___ __ __',
            i = 0,
            def = matrix.replace(/\D/g, ''), //статичное, работает на основе матрицы
            val = this.value.replace(/\D/g, '');//динамичное

        if (def.length >= val.length) {
            val = def;
        }

        this.value = matrix.replace(/./g, (a) => {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        });
        console.log(this.value.length);

        if (event.type === 'blur') {
            if (this.value.length == 2) {
                this.value = '';
            }
        } else {
            setCursorPosition(this.value.length, this);
        }
    }

    let inputs = document.querySelectorAll(selector);

    inputs.forEach(input => {
        input.addEventListener('input', createMask);
        input.addEventListener('focus', createMask);
        input.addEventListener('blur', createMask);
    });
};

export default mask;
