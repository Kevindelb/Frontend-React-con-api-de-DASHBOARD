class Categorias {
  constructor() {
    this.urlAPI = 'http://localhost/Dashboard/apibotiga/apiCategorias.php';
  }

  async getCategorias() {
    try {
      const response = await fetch(this.urlAPI);
      if (!response.ok) {
        const errorObject = await response.json();
        console.log(errorObject.error);
        return [];
      }

      const categorias = await response.json();
      return Array.isArray(categorias) ? categorias : [];
    } catch (error) {
      console.log('Error al obtener categorias', error);
      return [];
    }
  }

  async getCategoriaPorId(id) {
    try {
      const response = await fetch(this.urlAPI + '?id=' + id);
      if (!response.ok) {
        const errorObject = await response.json();
        console.log(errorObject.error);
        return null;
      }

      const categoria = await response.json();
      if (Array.isArray(categoria)) return categoria[0] || null;
      return categoria || null;
    } catch (error) {
      console.log('Error al obtener categoria por ID', error);
      return null;
    }
  }
}

export default Categorias;
