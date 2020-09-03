import { readFileSync } from 'fs';
import { container } from 'tsyringe';
import { get } from 'config';
import { Probe } from '@map-colonies/mc-probe';
import {
  MCLogger,
  ILoggerConfig,
  IServiceConfig,
} from '@map-colonies/mc-logger';

function registerExternalValues(): void {
  const loggerConfig = get<ILoggerConfig>('logger');
  const packageContent = readFileSync('./package.json', 'utf8');
  const service = JSON.parse(packageContent) as IServiceConfig;
  const logger = new MCLogger(loggerConfig, service);

  container.register<MCLogger>(MCLogger, { useValue: logger });
  container.register<Probe>(Probe, { useValue: new Probe(logger, {}) });
}

export { registerExternalValues };
