import { AppError } from './app-error';
import { ValidationError } from './validation-error';

export function handleRouteError(error: unknown): Response {
  if (error instanceof AppError) {
    return Response.json(
      {
        error: {
          code: error.code,
          message: error.expose ? error.message : 'Something went wrong',
        },
      },
      { status: error.status }
    );
  }

  if (error instanceof ValidationError) {
    return Response.json(
      {
        error: {
          code: error.code,
          message: error.message,
          fields: error.flattened,
        },
      },
      { status: error.status }
    );
  }

  // unknown errors
  console.error(error);

  return Response.json(
    {
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Something went wrong',
      },
    },
    { status: 500 }
  );
}
