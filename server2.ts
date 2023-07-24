import Fastify from 'fastify';

interface IUser {
  id: number;
  name: string;
  email: string;
}

const db: Array<IUser> = [
	{ id: 1, name: 'example1', email: 'example1@mail.com' },
	{ id: 2, name: 'example2', email: 'example2@mail.com' },
];

const dataServer = Fastify();


dataServer.get<{
   Querystring: {id: number},
   Reply: IUser | { error: string }
}>('/getUser',
  {
    preValidation: (req, _, done) => {
      const { id } = req.query;
      done(!id ? new Error('Id not sent') : undefined);
    },
  },
  async function (request, reply) {
    try {
      const user = db.filter(u => u.id == request.query.id)[0];
      if (!user)
        return reply.code(404).send();
      return reply.code(201).send(user)
    } catch (error) {
      reply.code(500).send({ error: 'Internal Server Error' });
    }
  }
);

dataServer.listen({ port: 3002 }, (err, address) => {
	if (err) {
		console.error(err)
		process.exit(1)
	}
	console.log(`Server listening at ${address}`);
})