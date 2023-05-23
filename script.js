'use strict'

window.addEventListener('DOMContentLoaded', function () {
    const result = document.getElementById('result')
    const save = document.getElementById('save')
    const buttons = document.getElementsByClassName('button')

    let sign, numberA, numberB

    function handleNumber(nb) {
        result.innerHTML += nb
    }

    function handleDecimal() {
        if (result.innerHTML === '') {
            result.innerHTML = '0.'
        }
        else if (!result.innerHTML.includes('.')) {
            result.innerHTML += '.'
        }
    }

    function handleCancel() {
        result.innerHTML = ''
        save.innerHTML = ''
        sign = numberA = numberB = null
    }

    function handleSign() {
        save.innerHTML = result.innerHTML;
        numberA = parseFloat(result.innerHTML)
        console.log(numberA)
        result.innerHTML = ''
        save.innerHTML += ' ' + sign
    }

    function roundingResult(result) {
        let roundedResult = String(result)
        if (String(result).length > 6) {
            const lastNumber = parseInt(String(result).charAt(7))
            roundedResult = String(result).slice(0, 6)

            if (lastNumber >= 5) {
                roundedResult = String(parseFloat(roundedResult) + 0.0001)
            }
        }
        return parseFloat(roundedResult)
    }

    function handleOperation() {
        numberB = parseFloat(result.innerHTML)
        switch (sign) {
            case '+':
                result.innerHTML = roundingResult(numberA + numberB)
                break;

            case '-':
                result.innerHTML = roundingResult(numberA - numberB)
                break;

            case 'x':
                result.innerHTML = roundingResult(numberA * numberB)
                break;

            case '/':
                if (numberB !== 0) {
                    result.innerHTML = roundingResult(numberA / numberB)
                }
                else {
                    result.innerHTML = 'error'
                }
                break;

            default:
                break;
        }
        sign = numberA = numberB = null
        save.innerHTML = ''
    }

    function handleButtonClick(btn) {
        let btnAttr = btn.getAttribute('class')
        switch (btnAttr) {
            case 'button':
                handleNumber(btn.innerHTML)
                break;

            case 'button decimal-button':
                handleDecimal()
                break;

            case 'button cancel-button':
                handleCancel()
                break;

            case 'button sign-button':
                if (result.innerHTML !== ''
                    && result.innerHTML.charAt(result.innerHTML.length - 1) !== '.'
                    && (sign === undefined || sign === null)) {
                    sign = btn.innerHTML;
                    handleSign()
                }
                break;

            case 'button equal-button':
                if ((sign !== undefined && sign !== null)
                    && (numberA !== undefined && numberA !== null)
                    && result.innerHTML !== ''
                    && result.innerHTML.charAt(result.innerHTML.length - 1) !== '.') {
                    handleOperation()
                }
                break;

            default:
                break;
        }
    }

    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i]
        button.addEventListener('click', function (e) {
            handleButtonClick(e.target)
        })
    }
})