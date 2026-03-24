// async function bootstrap() {
//   const app = await NestFactory.create(
//     AppModule,
//     { logger: WinstonModule.createLogger(winstonConfig) },
//     // {
//     // bufferLogs: true
//     // }
//   );

//   // Start listening for incoming messages
//   await app.listen(process.env.PORT ?? 3002);

//   // app.connectMicroservice({
//   //   transport: Transport.TCP,
//   //   options: {
//   //     host: process.env.MEDIA_SERVICE_HOST || 'localhost',
//   //     port: process.env.MEDIA_SERVICE_PORT
//   //       ? parseInt(process.env.MEDIA_SERVICE_PORT, 10)
//   //       : 3002,
//   //   },
//   // });

//   // await app.startAllMicroservices();

//   console.log('Media Service is listening on port 3002');
// }
