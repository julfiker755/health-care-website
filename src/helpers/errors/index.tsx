type ApiResponseProps = {
    success: boolean;
    message:string,
    errors?: { field: string; code?:string; message: string }[];
  };
  
  export const ResponseApiErrors = (res:ApiResponseProps, form: any) => {
    if (!res?.success && res?.errors) {
      res.errors.forEach((error) => {
        form.setError(error.field, {
          type: 'manual',
          message: error.message || 'Invalid value',
        });
      });
    }
  };
  

 