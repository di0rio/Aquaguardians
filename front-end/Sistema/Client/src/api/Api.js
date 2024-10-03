const apiUrl =
  "https://apiaquaguardians.somee.com/swagger/v1/swagger.json?authuser=0"; // Substitua pela sua URL da API

function fetchPosts() {
  return fetch(`${apiUrl}/posts`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao obter posts");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erro na requisição:", error);
      throw error;
    });
}

function fetchPostById(postId) {
  return fetch(`${apiUrl}/posts/${postId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao obter post");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erro na requisição:", error);
      throw error;
    });
}

// Exporta as funções
export { fetchPosts, fetchPostById };
