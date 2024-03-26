class Matrix { 
    constructor(array){
        this.matrix = array;
        this.rows = array.length;
        this.columns = array[0].length;
    }

    applyMatrixTo(vector){
        const transformedVector = {};

        transformedVector.x = this.matrix[0][0]*vector.x + this.matrix[0][1]*vector.y;
        transformedVector.y = this.matrix[1][0]*vector.x + this.matrix[1][1]*vector.y;

        return transformedVector;
    }

    determinant(){
        if(this.matrix.length === 2 & this.matrix[0].length === 2){
            return this.matrix[0][0]*this.matrix[1][1] - this.matrix[0][1]*this.matrix[1][0];
        }
        else{
            console.error('Only 2x2 matrices for now');
        }
    }  
    
    inverse(){
        if(this.matrix.length === 2 & this.matrix[0].length === 2){
            const inverse = Array.from({length: this.matrix.length}, () => []);

            inverse[0][0] =  this.matrix[1][1]/this.determinant();
            inverse[0][1] = -this.matrix[0][1]/this.determinant();
            inverse[1][0] = -this.matrix[1][0]/this.determinant();
            inverse[1][1] =  this.matrix[0][0]/this.determinant();

            return new Matrix(inverse);
        }
        else{
            console.error('Only 2x2 matrices for now');
        }
    }

    scaleBy(scalar){
        const result = Array.from({length: this.matrix.length}, () => []);

        for(let i = 0; i < this.matrix.length; i++){
            for(let j = 0; j < this.matrix[0].length; j++){
                result[i][j] = scalar*this.matrix[i][j];
            }
        }
    
        return new Matrix(result);
    }
}

function matrixSum(matrixA, matrixB){
    const result = Array.from({ length: matrixA.matrix.length}, () => []);

    if(
        matrixA.matrix.length === matrixB.matrix.length & 
        matrixA.matrix[0].length === matrixB.matrix[0].length
        ){
        for(let i = 0; i < matrixA.matrix.length; i++){
            for(let j = 0; j < matrixB.matrix[0].length; j++){
                result[i][j] = matrixA.matrix[i][j] + matrixB.matrix[i][j];
            }
        }
    }

    return new Matrix(result);
}


function matrixProduct(matrixA, matrixB){ 
    const result = Array.from({ length: matrixA.matrix.length}, () => []);

    if(matrixA.matrix[0].length === matrixB.matrix.length){
        for(let i = 0; i < matrixA.matrix.length; i++){
            for(let j = 0; j < matrixB.matrix[0].length; j++){
                var sum = 0; 
                for(let k = 0; k < matrixA.matrix[0].length; k++){
                    sum += matrixA.matrix[i][k]*matrixB.matrix[k][j];
                }
                result[i][j] = sum;
            }
        }        
    }
    else{ 
        console.error('Wrong matrix dimensions')
    }
    
    return new Matrix(result);
}

// const myMatrix = new Matrix([
//     [3, -1], 
//     [-1, 2]
// ])
// const indentity = new Matrix