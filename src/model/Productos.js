class Productos{

    constructor() {
        this.urlAPI = 'http://localhost/Dashboard/apibotiga/apiProductos.php';
    }

    async getProductosPorCategoria(id) {
    
        try{
    
            const response = await fetch(this.urlAPI + '?grupid=' + id)
    
          if(!response.ok)  {
            const errorObject = await response.json();
            console.log(errorObject.error);
            return;
          }
    
          const productos = await response.json();
          console.log("Estos son los productos que entran:");
          console.log(productos);
          return productos
    
        }catch(error){
          console.log('Error al obtener productos' , error);
          return null;
        }
      };
    
}

export default Productos;