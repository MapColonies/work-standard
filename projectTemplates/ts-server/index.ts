import { get } from 'config';
import { Probe } from '@map-colonies/mc-probe';
//this import must be called before the first import of tsyringe
import './src/containerConfig';
import { container } from 'tsyringe';
import { ServerBuilder } from './src/serverBuilder';

async function main() {
  const port = get('serverPort') as number;
  const server = await container.resolve(ServerBuilder).build();
  const prob = container.resolve(Probe);
  prob.start(server, port);
}

main();
