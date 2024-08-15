export let calculator = {
    add : function(expression: any) {
        let expNumbArr;
        if(expression.includes(',')) {
            expNumbArr = this.resolveExpression(expression);
            return this.sum(expNumbArr);
        }
        else {
            return parseInt(expression || 0)
        }
    },
    resolveExpression : function(expression: any) {
        let expNumbArr =  expression.split(',');
        return expNumbArr;
    },
    sum: function(numbArr: string[]) {
        let sum = 0;
        try {
            for (let i = 0; i < numbArr.length; i++ ) {
                let curNum = parseInt(numbArr[i]);
                if(curNum > 0) {
                    sum += curNum;
                }else {
                    throw new Error('negative numbers not allowed');
                }
              } 
            return sum;
        }
        catch (e){
            return e;
        }
        
    }
}