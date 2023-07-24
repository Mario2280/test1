import Fastify from 'fastify'


const db2 = [
	{
		email: 'example1@mail.com',
		payload: "When you didn't understand the meaning of the test task",
	},
	{
		email: 'example2@mail.com',
		payload: "When you didn't understand the meaning of the test task",
	},
]

const apiServer = Fastify()

apiServer.get<{
	Querystring: { id: number }
}>(
	'/getUser',
	{
		preValidation: (req, _, done) => {
			const { id } = req.query;
			done(!id ? new Error('Id not sent') : undefined )
		}
	},
	async function (request, reply) {
		try {
      const res = await(await fetch(`http://localhost:3002/getUser?id=${request.query.id}`)).text();
			if (!res) 
			 reply.code(404).send({ error: 'Not Found' })
			const userObj = JSON.parse(res)
			const { payload } = db2.filter(record => record.email == userObj.email)[0];
			reply.code(201).send(payload)
		} catch (error) {
			reply.code(500).send({ error: 'Internal Server Error' })
		}
	}
);

apiServer.listen({ port: 3001 }, (err, address) => {
	if (err) {
		console.error(err)
		process.exit(1)
	}
	console.log(`Server listening at ${address}`)
})