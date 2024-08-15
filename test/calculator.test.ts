import { calculator } from '../src/calculator';
describe('calculator',()=>{

    describe('Basic functionality', ()=> {
        checkResult("", 0);
        checkResult("42", 42);
    })

    describe('comma-seperator', ()=> {
        checkResult("1,2", 3);
        checkResult("4,5", 9);
        checkResult("13,21,20", 54);
        checkResult("150,250,500,1000", 1900);
    })

    describe('newline-seperator', ()=> {
        checkResult("1\n2", 3);
        checkResult("1\n2\n3\n4\n5", 15);
    })

    describe('mixed-seperator', ()=> {
        checkResult("1\n2,3\n4,5", 15);
    })

    describe('custom-seperator', ()=> {
        checkResult("//;\n1;2", 3);
        describe('..can be any length', ()=> {
            checkResult("//foo\n1foo2foo3", 6);
        })
    })
    
    function checkResult(expression: string, result: number) {
        it(`should evaluate add function ${expression} to ${result}`, ()=>{
            expect(calculator.add(expression)).toBe(result);
        })
    }

    describe('negative numbers are not allowed', ()=> {
        let expression = "1,2,3,-4";
        it(`add function should throw an exception for negative numbers like ${expression}`, ()=>{
            let expNumbArr = calculator.getPieceValues(expression);
            expect(calculator.sum(expNumbArr)).toStrictEqual(new Error('negative numbers or number greater than 1000 not allowed'));
        })
    })

    describe('numbers greater than 1000 are not allowed', ()=> {
        let expression = "1001,2";
        it('add function should throw an exception', ()=>{
            let expNumbArr = calculator.getPieceValues(expression);
            expect(calculator.sum(expNumbArr)).toStrictEqual(new Error('negative numbers or number greater than 1000 not allowed'));
        })
    })

})