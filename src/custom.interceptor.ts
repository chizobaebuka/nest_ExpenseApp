import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';


export class CustomInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, handler: CallHandler) {
        console.log('This is intercepting the request');
        console.log({context})

        const now = Date.now();

        return handler.handle().pipe(map((data) => {
                // hnadling the outgoing response
                const response = {
                    ...data,
                    createdAt: data.createdAt.toDateString(),
                }
                delete response.updatedAt;
                delete response.created_at;
                console.log('This is intercepting the response')
                console.log(data)
                return data
            }));
    }
}