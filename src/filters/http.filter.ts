import { ExceptionFilter, Catch, HttpException, ArgumentsHost } from "@nestjs/common";


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    catch(exception: HttpException, host: ArgumentsHost) {
        console.log('Inside Filter Excepeption', JSON.stringify(exception, null, 2));
        const ctx = host.switchToHttp();
        const request = ctx.getRequest()
        const response = ctx.getResponse();
        const statusCode = exception.getStatus();

        return response.status(statusCode).json({
            statusCode: statusCode,
            createdBy: "HttpExceptionFilter",
            errorMessage: exception.message
        })
    }
}