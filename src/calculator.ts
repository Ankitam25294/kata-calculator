export let calculator = {
    add : function(expression: any) {
        let expNumbArr;
        if(expression.includes(',') || expression.includes('\n')) {
            expNumbArr = this.getPieceValues(expression);
            this.checkValidity(expNumbArr);
            return this.sum(expNumbArr);
        }
        else {
            return parseInt(expression || 0)
        }
    },
    getPieceValues : function(expression: any) {
        let delimiters = [",", "\n"]
        if(this.hasCustomDelimiter(expression)) {
            delimiters = delimiters.concat(this.getCustomDelimiter(expression));
            expression = this.stripFirstLine(expression);
        }
        let pieces = this.getSubPieces([expression], delimiters);
        let piecesValues = [];
        for(let i=0;i<pieces.length;i++) {
            piecesValues.push(parseInt(pieces[i]))
        }
        return piecesValues;
    },
    hasCustomDelimiter: function(expression: any) {
        return /^\/\//.test(expression);
    },
    getCustomDelimiter: function(expression: any) {
       let delimiterSpec =  expression.split('\n')[0].substring(2);
       if(/^\[.+\]/.test(delimiterSpec)) {
        return delimiterSpec.substring(1, delimiterSpec.length - 1).split("][");
       }else {
        return [delimiterSpec];
       }
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
    checkValidity: function(piecesValues: any) {
        let negatives : number[];
        for(let i=0;i<piecesValues.length;i++) {
            if(parseInt(piecesValues[i]) < 0 ) {
                negatives.push(piecesValues[i]);
            }
        }
        if(negatives?.length)
            throw "negative numbers not allowed" + negatives.join(', ')
    },
    sum: function(numbArr: any[]) {
        let sum = 0;
        try {
            for (let i = 0; i < numbArr.length; i++ ) {
                let curNum = parseInt(numbArr[i]);
                if(curNum > 0 && curNum <=1000) {
                    sum += curNum;
                }else {
                    throw new Error('negative numbers or number greater than 1000 not allowed');
                }
              } 
            return sum;
        }
        catch (e){
            return e;
        }
        
    }
}