import winston, {Logger} from 'winston'
import {ElasticsearchTransformer, ElasticsearchTransport, LogData, TransformedData} from 'winston-elasticsearch'


const exTransformer = (logData: LogData): TransformedData => {
  return ElasticsearchTransformer(logData)
};


export const winstonLogger = (elasticsearchNode: string, name: string, level: string): Logger => {
  const options = {
    console: {
      level,
      handleExceptions: true,
      json: true,
      colorize: true,
    },
    elasticsearch: {
      level,
      transformer: exTransformer,
      clientOpts: {
        node: elasticsearchNode,
        log: level,
        maxRetries: 2,
        requestTimeout: 10000,
        sniffOnStart: false
      }
    }
  };

  const exTransport: ElasticsearchTransport = new ElasticsearchTransport(options.elasticsearch);
  const logger: Logger = winston.createLogger({
    exitOnError: false,
    defaultMeta: {service: name},
    transports: [new winston.transports.Console(options.console), exTransport]

  })

  return logger
}
