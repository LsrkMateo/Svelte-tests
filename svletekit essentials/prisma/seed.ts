import { PrismaClient } from '@prisma/client';

// Creamos una instancia de Prisma Client
const db = new PrismaClient();

// Creamos un tipo Post que define la estructura del objeto que se recibe de la API
type Post = {
	tilte: string;
	body: string;
};

// Función que consume una API externa para obtener los posts
async function getPosts() {
	// Hacemos una solicitud GET a la API externa
	const response = await fetch('https://dummyjson.com/posts');

	// Extraemos únicamente el array de posts del objeto JSON que regresa la API
	const { posts } = await response.json();

	// Devolvemos los posts como un array de objetos con la estructura definida en el tipo Post
	return posts as Post[];
}

// Función que toma un string y retorna su versión slugificada
function slugify(text: string | undefined | null): string {
	if (!text) {
		return '';
	}
	return text
		.replace(/\s/g, '-')
		.replace(/[^a-zA-Z0-9-]/g, '')
		.toLocaleLowerCase();
}

// Función principal que interactúa con la base de datos
async function main() {
	// Obtenemos los posts de la API
	const posts = await getPosts();

	// Insertamos los posts en la base de datos
	for (const { tilte, body } of posts) {
		await db.post.create({
			// Mapeamos los campos de la estructura Post a los campos correspondientes en la base de datos
			data: {
				tilte: tilte,
				content: body,
				slug: slugify(tilte)
			}
		});
	}
}

// Invocamos la función principal
main();
