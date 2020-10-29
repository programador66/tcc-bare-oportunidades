export const separarArray = (array: Array<any>, qtd: any) => {
    return array.reduce((acc, item,index) => {

      const grupo = Math.floor(index / qtd );
      acc[grupo] = [...(acc[grupo] || []), item]
      return acc;
    }, [])
  }