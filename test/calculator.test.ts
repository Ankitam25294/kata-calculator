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

    describe('negative numbers', ()=> {
        let expression = "1,2,3,-4";

        it(`add function should throw an exception for negative numbers like ${expression}`, ()=>{
            let expNumbArr = calculator.resolveExpression(expression);
            expect(calculator.sum(expNumbArr)).toStrictEqual(new Error('negative numbers not allowed'));
        })
    })

    function checkResult(expression: string, result: number) {
        it(`should evaluate add function ${expression} to ${result}`, ()=>{
            expect(calculator.add(expression)).toBe(result);
        })
    }
})