import { ExceptionFilter, Catch, HttpException, ArgumentsHost } from "@nestjs/common";

@Catch()
export class FallbackExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        console.log('Inside Fallback Filter Excepeption', JSON.stringify(exception, null, 2));
        const ctx = host.switchToHttp();
        const request = ctx.getRequest()
        const response = ctx.getResponse();

        // internal Error doesnt necessary have statuscode on it.
        const statusCode = 500;

        return response.status(statusCode).json({
            statusCode: statusCode,
            createdBy: "FallbackExceptionFilter",
            errorMessage: exception.message
        });
    }
}