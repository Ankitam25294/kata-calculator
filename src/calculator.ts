export let calculator = {
    add : function(expression: any) {
        let expNumbArr;
        if(expression.includes(',') || expression.includes('\n')) {
            expNumbArr = this.resolveExpression(expression);
            return this.sum(expNumbArr);
        }
        else {
            return parseInt(expression || 0)
        }
    },
    resolveExpression : function(expression: any) {
        let delimiters = [",", "\n"]
        if(this.hasCustomDelimiter(expression)) {
            delimiters.push(this.getCustomDelimiter(expression));
            expression = this.stripFirstLine(expression);
        }
        return this.getSubPieces([expression], delimiters);
    },
    hasCustomDelimiter: function(expression: any) {
        return /^\/\//.test(expression);
    },
    getCustomDelimiter: function(expression: any) {
        return expression.charAt(2);
    },
    stripFirstLine: function(expression: any) {
        return expression.substring(expression.indexOf('\n') + 1)
    },
    getSubPieces : function(piecesSoFar: any, delimiters: any) {
        if(delimiters.length===0) {
            return piecesSoFar;
        }
        let subPieces: any = [];
        let delimiter = delimiters.pop();
        for(let i=0;i<piecesSoFar.length;i++) {
            subPieces = subPieces.concat(piecesSoFar[i].split(delimiter));
        }

        return this.getSubPieces(subPieces, delimiters);

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