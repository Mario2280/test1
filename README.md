## Dependencies

- Typescript
- Curl(for test)

## Ports
- 3001
- 3002

## Installation and running
```bash
$ npm install

$ tsc

$ npm run dev
```
## Test

```bash
curl -X GET  http://localhost:3001/getUser?id=1
curl -X GET  http://localhost:3001/getUser?id=3
```
